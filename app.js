//Requiring express and body parser and initializing the constant "app"
const express = require("express");
const bodyParser = require("body-parser");
//Requiring mailchimp's module
const client = require("@mailchimp/mailchimp_marketing");
const https = require("https");

const app = express();
//The public folder which holds the CSS
app.use(express.static("public"));
// Using body-parser
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
})

//Setting up MailChimp
client.setConfig({
    //*************ENTER YOUR API KEY HERE******************************
     apiKey: "e515ea7e20468cc7d759f77ba9d32c7a-us20",
    //*********ENTER YOUR API KEY PREFIX HERE i.e.THE SERVER************
     server: "us20"
    });

    // as soon the button is clicked
app.post("/", function(req, res){

    const firstName = req.body.firstName;
    const lastName = req.body.secondName;
    const email = req.body.email;

    //*********ENTER YOU LIST ID HERE**************************
const listId = "1ee4fb7d36";
//Creating an object with the users data
    const subscribingUser = {
        firstName : firstName,
        lastName : lastName,
        email : email
    }

    // Uploading data to the server // Based on MailChimp's API document
  async function run() {
    const response = await client.lists.addListMember("1ee4fb7d36", {
      email_address: subscribingUser.email,
      status: "subscribed",
      merge_fields: {
          FNAME: subscribingUser.firstName,
          LNAME: subscribingUser.lastName
      }
    });

    //If all goes well logging the contact's id
 res.sendFile(__dirname + "/success.html")
 console.log(
       `Successfully added contact as an audience member. The contact's id is ${
        response.id
       }.`);
};


    //Running the function and catching the errors (if any)
    // ************************THIS IS THE CODE THAT NEEDS TO BE ADDED FOR THE NEXT LESSON*************************
    // So the catch statement is executed when there is an error so if anything goes wrong the code in the catch code is executed. In the catch block we're sending back the failure page. This means if anything goes wrong send the faliure page
    run().catch(e => res.sendFile(__dirname + "/failure.html"));

    app.post("/failure", function(req, res){
        res.redirect("/");
    })

})










app.listen(process.env.PORT||3000, function(){
    console.log("Server is running on port 3000.");
})



// api key
// e515ea7e20468cc7d759f77ba9d32c7a-us20

// List ID
// 1ee4fb7d36.
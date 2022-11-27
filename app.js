const express=require("express");
const bodyParser=require('body-parser');
const https=require("https");
const { appendFile } = require("fs");
const { json } = require("express");
const { request } = require("http");

const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'))

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html")    
})

app.post("/", function(req,res){
 let fname=req.body.name;
 let lname=req.body.lname;
 let email=req.body.email;

 var data={
    members:[
        {
            email_address:email+"",
            status:"subscribed",
            merge_fields:{
                FNAME:fname+"",
                LNAME:lname+""
            }
        }
    ]
 }
 const options={
    method:"POST",
    auth:"nischay:566a534747c501436bfafbe2367505aa-us10"
 }
 const jsondata=JSON.stringify(data);
const url="https://us10.api.mailchimp.com/3.0/lists/54013afcf4"
 const request=https.request(url,options,function(response){
        let sc=response.statusCode;
        console.log(typeof(sc));
        if(sc===200)
        {
            res.sendFile(__dirname+"/suc.html")
        }
        else res.sendFile(__dirname+"/failure.html");
 })
 request.write(jsondata);
 request.end();

})
app.listen(3000,function(){
    console.log("Server is running on port 3000");  
})

// 566a534747c501436bfafbe2367505aa-us10
// 54013afcf4
const { IgApiClient } = require('instagram-private-api');
const { readFile } = require('fs').promises;
const cron = require("node-cron");
const express= require("express");
const app = express();

require("dotenv").config();
var day = 2;
async function postToInstagram() {
  const ig = new IgApiClient();
  const username = process.env.IG_USERNAME;
  const password = process.env.IG_PASSWORD;

  // Initialize the client
  ig.state.generateDevice(username);
  await ig.account.login(username, password);
 
  console.log('Logged in successfully!');

  const photoBuffer = await readFile('rizz.mp4');
  
  const photo = await readFile("download.jpg");
  
  console.log(photoBuffer.byteLength)
 

  const upload = await ig.publish.video({
    video: photoBuffer,
    caption: `Day ${day}`,
    coverImage:photo
  }).then(res=>{console.log(day+" done")});

  

app.get("/rizz/run",(req,res)=>{
  day++;
  
  postToInstagram().then((resp)=>{console.log("done");res.send("done");});
})

app.listen(3000,res=>console.log("server on"));

const { IgApiClient } = require('instagram-private-api');
const { readFile } = require('fs').promises;
const cron = require("node-cron")
require("dotenv").config();
var day = 1;
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

  
}



cron.schedule('30 7 * * *', () => {
  day++;
 postToInstagram()
},{
  scheduled: true,
  timezone:"Asia/Kolkata"
});
postToInstagram();

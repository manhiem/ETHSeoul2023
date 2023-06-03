const message= require("./src/message.js")
const nft= require("./src/nft.js")
const wallet= require("./src/wallet.js")
const user= require("./src/user.js")
const inrer= require("./src/inter.js")

const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const app = express();
const { parse } = require("dotenv");
const MessagingResponse = require('twilio').twiml.MessagingResponse;
require('dotenv').config();

const client = require('twilio')(process.env.ACCOUNTSID,process.env.AUTHTOKEN,{lazyLoading:true});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/",router);

const PORT = process.env.PORT || 5000

//user onboarding 
router.post("/getprivatekey",async (req,res)=>{

  res.send(await wallet.getprivatekey(req.body.walletaddress));
});// working 
router.post("/checkuser",async (req,res)=>{
  user.addkeys
});//working 
router.post("/password",async (req,res)=>{
  console.log(req.body);
});
router.post("/createwallet",async (req,res)=>{
  res.send(await user.createwallet("polygon"));
});
router.post("/importwallet",async (req,res)=>{
  console.log(req.body);
});



//collection 
router.post("/createcollection", (req,res)=>{
  res.send(nft.createcollection(req.body.collectionname,req.body.uri,req.body.walletaddress));
});
router.post("/getcollections", async (req,res)=>{ 
  res.send( await nft.getcollections( req.body.walletaddress));
});
router.post("/viewcollection", async (req,res)=>{ 
  res.send( await nft.getcollection( req.body.collectionid));
});





//nft
router.post("/mintnft",async (req,res)=>{
  const aa= user.findjson("./src/collections.json",req.body.walletaddress);
  res.send(await nft.mintnft(req.body.asseturl,req.body.name,req.body.tokenId,req.body.description,req.body.metadata,aa,req.body.walletaddress));
 
});
router.post("/mintdynamicnft",async (req,res)=>{
  const aa= user.findjson(req.body.walletaddress);
  res.send(await nft.mintnft(req.body.asseturl,req.body.name,req.body.tokenId,req.body.description,req.body.metadata,aa,res.body.api,res.body.propertytype,res.body.propertyvalue));
 
});
router.post("/revisenft",async (req,res)=>{
  res.send(nft.revisenft(req.body.nftid,req.body.property,req.body.value));
 
});
router.post("/viewnft", async (req,res)=>{
  console.log("abc")  
  res.send(await nft.viewnft(req.body.nftid));
});





//wallet
router.post("/transactpolygon", async (req,res)=>{
  res.send(
  await wallet.sendmoneysamenetwork('polygon',req.body.receiveid,req.body.senderid,req.body.value));
});
router.get("/abcd", async (req,res)=>{
  res.send(
  "achieved");
});
router.post("/transact", async (req,res)=>{
  res.send(
  await wallet.sendmoneysamenetwork('polygon',req.body.receiveid,req.body.senderid,req.body.value));
});

router.post("/getwalletbalance",async (req,res)=>{
  console.log(req.body.walletaddress);

  res.send(await wallet.getwalletbalance(req.body.walletaddress,req.body.chain));
 
});


    


app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
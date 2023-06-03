const MessagingResponse = require('twilio').twiml.MessagingResponse;
require('dotenv').config();

const client = require('twilio')(process.env.ACCOUNTSID,process.env.AUTHTOKEN,{lazyLoading:true});
const response = new MessagingResponse();
const sendMessage = async function (senderID,message) {
    try {
        await client.messages.create({
            to: senderID,
            body: message,
            from: `whatsapp:+14155238886`
        });
    } catch (error) {
        console.log(`Error at sendMessage --> ${error}`);
    }
};
const createcollection = async function (id) {
    await client.messages 
    .create({ 
       body: 'enter your password', 
       from: 'whatsapp:+14155238886',       
       to: id
     }) 
    .then((message)=>client.messages 
    .create({ 
       body: 'enter your password', 
       from: 'whatsapp:+14155238886',       
       to: id
     }) 
    .then((message)=>console.log(message.body)));
    
};
const ReadMessage = async function (message) {
    var senderID=''
    
    return senderID;
    
};
const checkpassword =async function(msg,id){
    if(msg=="hello"){
        client.messages 
      .create({ 
         body: 'please select opr 1 or 2', 
         from: 'whatsapp:+14155238886',       
         to: id
       }) 
      .then(message => message.checkpassword(message.sid))

    }
    else{
        client.messages 
      .create({ 
         body: 'Do you want to create a wallet?', 
         from: 'whatsapp:+14155238886',       
         to: id
       }) 
      .then(message => message.checkpassword(message.sid))

    }
}
const fun =async function(id){
    await client.messages 
.create({ 
   body: 'password', 
   from: 'whatsapp:+14155238886',       
   to:   id
 }) 
.then(messa => checkpassword(messa.Body,id));
};

module.exports = {
    sendMessage,checkpassword,fun,createcollection
}
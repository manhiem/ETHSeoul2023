
const user= require("./user.js")
const app= require("../app.js")
require('dotenv').config();

const createcollection = async function (id) {
    client.messages 
    .create({ 
       body: 'enter your password', 
       from: 'whatsapp:+14155238886',       
       to: id
     }) 
    .then((message)=>password(id))
};
const password =async function(id){
    client.messages 
    .create({ 
       body: 'Welcome user', 
       body:"sds",
       from: 'whatsapp:+14155238886',       
       to: id
     }) 
    .then((message)=>{console.log(message);})

}
const new_user =async function(id){
    client.messages 
    .create({ 
       body: 'New User,wana create a wallet or import', 
       from: 'whatsapp:+14155238886',       
       to: id
     }) 
    .then(message => wallet(id))
}


const nft =async function(id){
    client.messages 
    .create({ 
       body:'', 
       from: 'whatsapp:+14155238886',       
       to: id
     }) 
    .then(message => wallet(id))
}

const wallet=async function(id){
    client.messages 
    .create({ 
       body: 'Wallet details', 
       from: 'whatsapp:+14155238886',       
       to: id
    })
    if (client.messages=="check balance"){
        client.messages
        .create({ 
            body: 'Your balance : ', 
            from:'whatsapp:+14155238886',
            to:id,
        }) 
        .then(message => check_balance(id))
    }
    
module.exports = {
    password,createcollection
}}



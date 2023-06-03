
require('dotenv').config();
const {RouterProtocol}  =require("@routerprotocol/router-js-sdk"); 
const {ethers}  =require( "ethers");

const user= require("./user.js")
let SDK_ID = 24 // get your unique sdk id by contacting us on Telegram
let chainId = 137
const provider = new ethers.providers.JsonRpcProvider("https://polygon-rpc.com", chainId)
const rout = new RouterProtocol(SDK_ID, chainId, provider);


const routerprotocol = new RouterProtocol(process.env.SDK_ID_HERE, chainId, provider)


const fetch = require("node-fetch");
const getwalletbalance = async function (walletaddress,chain) {
const resp = await fetch(
  `https://api.tatum.io/v3/${chain}/account/balance/${walletaddress}`,
  {
    method: 'GET',
    headers: {
      'x-api-key':process.env.TATUM_KEY
    }
  }
);

const data = await resp.json();
console.log(data);
return data.balance;

   
    
};


const getprivatekey = async function (address) {
  var result=user.findjson("./src/wallet.json",address);  
  console.log(result);
    return result
    
};
const sendmoneysamenetwork = async function (chain,receiverAccountId,walletaddress,value) {
  const aa=await user.findjson("./src/wallet.json",walletaddress);
  try{
    const resp =  await fetch(
      `https://api.tatum.io/v3/${chain}/transaction`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.TATUM_KEY
        },
        body: JSON.stringify({
          to: receiverAccountId,
          currency: 'MATIC',
          amount: String(value),
          fromPrivateKey: aa
        })
      }
    );
    
    
    console.log(resp);
    return resp;
  }
  catch(e){
    return "fail";

  }
  }
// const sendmoney = async function () {
//     await routerprotocol.initialize();
//     let args = {
//         amount: (ethers.utils.parseUnits("10.0", 6)).toString(), // 10 USDC
//         dest_chain_id: 250, // Fantom
//         src_token_address: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174", // USDC on Polygon
//         dest_token_address: "0x04068DA6C83AFCFA0e13ba15A6696662335D5B75", // USDC on Fantom
//         user_address: "0x6C021dec11a2A32a194232BC461b10Ac619dCCa6",
//         fee_token_address: "0x16ECCfDbb4eE1A85A33f3A9B21175Cd7Ae753dB4", // ROUTE on Polygon
//         slippage_tolerance: 1.0
//     }
    
//     const quote = await routerprotocol.getQuote(args.amount, args.dest_chain_id, args.src_token_address, args.dest_token_address, args.user_address, args.fee_token_address, args.slippage_tolerance)
    
//     // get allowance and give the relevant approvals
//     const wallet = new ethers.Wallet("0x12150ca1c1e216b9759b07b3a1ea6fa9b8674859d22d3d498806c301d17bbab5", provider) // provider was set up while initializing an instance of RouterProtocol
    
//     let src_token_allowance = await routerprotocol.getSourceTokenAllowance(args.src_token_address, args.dest_chain_id, args.user_address)
//     if(src_token_allowance.lt(ethers.constants.MaxUint256)){
//             await routerprotocol.approveSourceToken(args.src_token_address, args.user_address, ethers.constants.MaxUint256, args.dest_chain_id, wallet)
//     }
//     if(ethers.utils.getAddress(args.src_token_address) !== ether.utils.getAddress(args.fee_token_address)){
//         let fee_token_allowance = await routerprotocol.getFeeTokenAllowance(args.fee_token_address, args.dest_chain_id, args.user_address)
//         if(fee_token_allowance.lt(ethers.constants.MaxUint256)){
//             await routerprotocol.approveFeeToken(args.fee_token_address, args.user_address, ethers.constants.MaxUint256, args.dest_chain_id, wallet)
//         }
//     }
    
//     // execute the transaction
//     let tx;
//     try{
//         tx = await routerprotocol.swap(quote,wallet)
//         console.log(`Transaction successfully completed. Tx hash: ${tx.hash}`)
//     }
//     catch(e){
//         console.log(`Transaction failed with error ${e}`)
//         return
//     }
    
    


   
   
// };
// setTimeout(async function() {
//     let status = await routerprotocol.getTransactionStatus(tx.hash) 
//     console.log(status)
//     if (status.tx_status_code === 1) {
//         console.log("Transaction completed")
//       // handle the case where the transaction is complete 
//     }
//     else if (status.tx_status_code === 0) {
//         console.log("Transaction still pending")
//     // handle the case where the transaction is still pending
//     }
//   }, 180000); // waiting for sometime before fetching the status of the transaction because it may take some time for the transaction to get indexed





module.exports = {
   getwalletbalance,sendmoneysamenetwork,getprivatekey
}
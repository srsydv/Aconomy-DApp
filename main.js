// 0x1C15Cb1cbf18ff3e4C89691F4B887ad9Df4Eb647

const Web3 = require("web3");
var moment = require('moment');
// const piNFT = '0x4689ea1F8b7e433fE64959CB94b444f8E1580FC7'
const piMarket = '0xbb351E564f95aC64942521B2e586554F8EB4BA64'
const piNFT = '0x96624AbD9B2F369285Cfbab1eA82257986D60717'
// const piMarket = '0x2BC997DaF93625A574463Ae9fCbdEB400fbFe3A7'
const piNFTabi = require('./piNFTabi.json');
const piMarketAbi = require('./piMarketAbi.json');
const MTK = '0x08268C6A177Cd529DEAB226829C739C93f463994'
const ERC20ABI = require('./ERC20.json')
const poolContractAddress = document.getElementById("pool");
// const poolAddressAbi = require('./poolAddressAbi.json')
// const ERC20Address = document.getElementById("ERC20Address");

const poolRegistryAdd = "0xC9ffB7A773bfa3F8384F8E971603B25B9fE86438"
const poolAddress = '0x3aa56659b286ed4b4646e7C0cE9068Cb10938fb9'
const erc20Address = '0x8A09AF6795f048A7973fcB1AA03e3C999CF6201b'

const poolRegistryAbi = require('./poolRegistry.json')
const poolAddressAbi = require('./poolAddressAbi.json')
const deployPool = require('./deployPool.json')

let poolRegistry, poolAddressInstance;
// const expirationTime = Web3.utils.toBN(moment.now()).add(
//   moment.duration(30, 'days').seconds())
// const pndcabi = require('./Contract.json');
// const pndcabi = require('./PNDC_ERC721.json');
// const pndcabi = require('./TokenERC721.json');
// const pndc = '0xf4D06B6aa9670ad1f912dd2199D4B10A059D30Ea'
// const pndc = '0x1C15Cb1cbf18ff3e4C89691F4B887ad9Df4Eb647'
// const pndc = '0xBB2bCe0d19918aB3CD55de1DE7770688B8ff00F7'
init = async () => {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    await window.ethereum.enable();
    console.log("Connected");
  } else {
    alert("Metamask not found");
  }
  // piNFTmethods = new web3.eth.Contract(
  //   piNFTabi,
  //   piNFT
  // );
  // console.log("mmm",piNFTmethods.methods);
  // piMarketmethods = new web3.eth.Contract(
  //   piMarketAbi,
  //   piMarket
  // );
  // pnccmtd = new web3.eth.Contract(
  //   pndcabi,
  //   pndc
  // );

  poolRegistry = new web3.eth.Contract(poolRegistryAbi.abi, poolRegistryAdd)

  poolAddressInstance =  new web3.eth.Contract(poolAddressAbi.abi, poolAddress)


  accounts = await web3.eth.getAccounts();
  console.log("Account", accounts[0]);
};



// Create Pool

let createPoolss = async () => {
  await poolRegistry.methods
    .createPool(poolOwner.value, paymentCycleDuration.value, loanDefaultDuration.value, loanExpireDuration.value, poolFee.value, true, true )
    .send({
      from: accounts[0]
    })
    .once("receipt", (reciept) => {
      console.log("Pool Created ✅",reciept);
      let data = JSON.stringify(reciept.events.poolCreated.returnValues.poolAddress);
      document.getElementById('PA').innerHTML = "Pool Address:"+data+" "+"Pool ID: "+ reciept.events.poolCreated.returnValues.poolId;
    });
}
const poolOwner = document.getElementById("poolOwner");
const paymentCycleDuration = document.getElementById("paymentCycleDuration");
const loanDefaultDuration = document.getElementById("loanDefaultDuration");
const loanExpireDuration = document.getElementById("loanExpireDuration");
const poolFee = document.getElementById("poolFee");
// const rePayStartDate = document.getElementById("rePayStartDate");
// const totalRepayDeadLine = document.getElementById("totalRepayDeadLine");
const createPools = document.getElementById("createPool");
createPools.onclick = createPoolss;


// Attest Lender/Borrower

const AttestLenderFunc = async () => {
  await poolRegistry.methods
    .addLender(poolId.value, toAttestAddress.value, 2222222222222)
    .send({
      from: accounts[0]
    })
    .once("receipt", (reciept) => {
      console.log("Attested Lender ✅",reciept);
      console.log(reciept.events.LenderAttestation.returnValues.lender)
      // let data = JSON.stringify(reciept.events.poolAddressDetail.returnValues.pooladdress);
      // document.getElementById('PA').innerHTML = data;
    });    
}

const AttestBorrowerFunc = async () => {
  await poolRegistry.methods
    .addBorrower(poolId.value, toAttestAddress.value, 22222222222222)
    .send({
      from: accounts[0]
    })
    .once("receipt", (reciept) => {
      console.log("Attested Borrower ✅",reciept);
      // let data = JSON.stringify(reciept.events.poolAddressDetail.returnValues.pooladdress);
      // document.getElementById('PA').innerHTML = data;
    });    
}

const poolId = document.getElementById("_poolIdToAttest");
const toAttestAddress = document.getElementById("addressToAttest");

const AttestLender = document.getElementById('_btnAttestLender');
AttestLender.onclick = AttestLenderFunc;

const AttestBorrower = document.getElementById('_btnAttestBorrower')
AttestBorrower.onclick = AttestBorrowerFunc



const LoanRequestFunc = async () => {

  await poolAddressInstance.methods
  .loanRequest( 
    erc20Address,
    poolId2.value,
    web3.utils.toWei(loanAmount.value),
    loanDefaultDuration2.value,
    Apr.value*100,
    loanReceiverAddress.value
    )
  .send({
    from: accounts[0]
  })
  .once("receipt", (reciept) => {
    console.log("Request Loan Successful ✅",reciept);
    console.log(reciept.events.SubmittedLoan.returnValues.loanId)
    document.getElementById('loanIdSpan').innerHTML = 'Loan ID: '+reciept.events.SubmittedLoan.returnValues.loanId
  });    

}

const poolId2 = document.getElementById('rqPoolId');
const loanAmount = document.getElementById('PriAmount')
const loanDefaultDuration2 = document.getElementById('loanDefaultDuration2')
const Apr = document.getElementById('APR')
const loanReceiverAddress = document.getElementById('loanReceiverAddress')

const loanRequestBtn  = document.getElementById('loanRequestBtn');
loanRequestBtn.onclick = LoanRequestFunc;

//AcceptLoan for lender

const AcceptLoanFunc = async () => {
 let contractERC20 = new web3.eth.Contract(
        ERC20ABI.abi,
        erc20Address
      );

      
      await contractERC20.methods
        .approve(poolAddress, web3.utils.toWei(loanAmount2.value))
        .send({ from: accounts[0] });
      console.log("approved");

  await poolAddressInstance.methods
  .AcceptLoan( 
    loanId.value
    )
  .send({
    from: accounts[0]
  })
  .once("receipt", (reciept) => {
    console.log("Accept Loan Successful ✅",reciept);
  });    

}

const loanAmount2 = document.getElementById('loanAmount2')
const loanId = document.getElementById('loanId')

const acceptLoanAmount = document.getElementById('acceptLoanAmount')
acceptLoanAmount.onclick = AcceptLoanFunc


const RepayLoanFunc = async () => {
  contractERC20 = new web3.eth.Contract(
        ERC20ABI.abi,
        erc20Address
      );
      
      await contractERC20.methods
        .approve(poolAddress, web3.utils.toWei(amount3.value))
        .send({ from: accounts[0] });
      console.log("approved");

  await poolAddressInstance.methods
  .repayYourLoan( 
    loanId2.value
    )
  .send({
    from: accounts[0]
  })
  .once("receipt", (reciept) => {
    console.log("Accept Loan Successful ✅",reciept);
  });    

}

const amount3 = document.getElementById('amount3')
const loanId2 = document.getElementById('loanId2')

const repayLoanBtn = document.getElementById('repayLoanBtn');
repayLoanBtn.onclick = RepayLoanFunc;

//Repay Full Loan

const RepayLoanFullFunc = async () => {
  contractERC20 = new web3.eth.Contract(
        ERC20ABI.abi,
        erc20Address
      );
      
      await contractERC20.methods
        .approve(poolAddress, web3.utils.toWei(amountrlf.value))
        .send({ from: accounts[0] });
      console.log("approved");

  await poolAddressInstance.methods
  .repayFullLoan( 
    loanId3.value
    )
  .send({
    from: accounts[0]
  })
  .once("receipt", (reciept) => {
    console.log("Accept Loan Successful ✅",reciept);
  });    

}

const amountrlf = document.getElementById('amountrlf')
const loanId3 = document.getElementById('loanId3')

const repayFullLoanBtn = document.getElementById('repayFullLoanBtn');
repayFullLoanBtn.onclick = RepayLoanFullFunc;

//Supply To Pool

const SupplyPoolFunc = async () => {

  contractERC20 = new web3.eth.Contract(
    ERC20ABI.abi,
    erc20Address
  );

  let deployPoolInstance = new web3.eth.Contract(
    deployPool.abi,
    dPoolAddress1.value,
  );
  
  await contractERC20.methods
    .approve(dPoolAddress1.value, web3.utils.toWei(amount2.value))
    .send({ from: accounts[0] });
  console.log("approved");

  

  await deployPoolInstance.methods
  .supplyToPool( 
    poolId3.value,
    erc20Address,
    web3.utils.toWei(amount2.value),
    maxLoanDuration.value,
    apr2.value,
    2222222222222
    )
  .send({
    from: accounts[0]
  })
  .once("receipt", (reciept) => {
    console.log("Request Loan Successful ✅",reciept);
    let d = reciept.events.SupplyToPool.returnValues.BidId
    console.log("bidId;", d)
    console.log('sk')
    document.getElementById('_bid').innerHTML = "Bid Id :"+d;
    
  });    
}

const dPoolAddress1 = document.getElementById('dPoolAddress1')

const poolId3 = document.getElementById('poolId3')
const amount2 = document.getElementById('amount2')
const apr2 = document.getElementById('apr2')
const maxLoanDuration = document.getElementById('maxLoanDuration')

const supplyPoolBtn = document.getElementById('supplyPoolBtn')
supplyPoolBtn.onclick = SupplyPoolFunc;


// Accept Bid


const AcceptLoanBidFunc = async () => {
  // contractERC20 = new web3.eth.Contract(
  //       ERC20ABI,
  //       erc20Address
  //     );
      
  //     await contractERC20.methods
  //       .approve(poolAddress, loanAmount2.value)
  //       .send({ from: accounts[0] });
  //     console.log("approved");
  let deployPoolInstance = new web3.eth.Contract(
    deployPool.abi,
    dPoolAddress2.value,
  );

  await deployPoolInstance.methods
  .AcceptBid( 
    poolId4.value,
    erc20Address,
    bidId.value,
    lender.value,
    receiver.value
    )
  .send({
    from: accounts[0]
  })
  .once("receipt", (reciept) => {
    console.log("Accept Loan Successful ✅",reciept);
  });    

}

const dPoolAddress2 = document.getElementById('dPoolAddress2')
const poolId4 = document.getElementById('poolId4')
const bidId = document.getElementById('bidId');
const lender = document.getElementById('lender');
const receiver = document.getElementById('receiver');

const acceptSupplyBidBtn = document.getElementById('acceptSupplyBidBtn');
acceptSupplyBidBtn.onclick = AcceptLoanBidFunc;

// function RepayInstallment(
//   uint256 _poolId,
//   address _ERC20Address,
//   uint256 _bidId,
//   address _lender

const RepayBidInstallmentFunc = async () => {

  contractERC20 = new web3.eth.Contract(
    ERC20ABI.abi,
    erc20Address
  );
  
  await contractERC20.methods
    .approve(dPoolAddress3.value, web3.utils.toWei(riblAmount.value))
    .send({ from: accounts[0] });
  console.log("approved");


  let deployPoolInstance = new web3.eth.Contract(
    deployPool.abi,
    dPoolAddress3.value,
  );

  

  await deployPoolInstance.methods
  .RepayInstallment( 
    poolId5.value,
    erc20Address,
    bidId2.value,
    lender2.value
    )
  .send({
    from: accounts[0]
  })
  .once("receipt", (reciept) => {
    console.log("Request Loan Successful ✅",reciept);
    
  });    

}

const dPoolAddress3 = document.getElementById('dPoolAddress3')
const poolId5 = document.getElementById('poolId5')
const bidId2 = document.getElementById('bidId2');
const lender2 = document.getElementById('lender2');
const riblAmount = document.getElementById('riblAmount')

const repayBidBtn = document.getElementById('repayBidBtn')
repayBidBtn.onclick = RepayBidInstallmentFunc


//Repay Full Bid Loan

const RepayBidFullFunc = async () => {

  contractERC20 = new web3.eth.Contract(
    ERC20ABI.abi,
    erc20Address
  );
  
  await contractERC20.methods
    .approve(dPoolAddress4.value, web3.utils.toWei(rfablAmount.value))
    .send({ from: accounts[0] });
  console.log("approved");


  let deployPoolInstance = new web3.eth.Contract(
    deployPool.abi,
    dPoolAddress4.value,
  );

  

  await deployPoolInstance.methods
  .RepayFullAmount( 
    poolId6.value,
    erc20Address,
    bidId3.value,
    lender3.value
    )
  .send({
    from: accounts[0]
  })
  .once("receipt", (reciept) => {
    console.log("Request Loan Successful ✅",reciept);
    
  });    

}

const dPoolAddress4 = document.getElementById('dPoolAddress4')
const poolId6 = document.getElementById('poolId6')
const bidId3 = document.getElementById('bidId3');
const lender3 = document.getElementById('lender3');
const rfablAmount = document.getElementById('rfablAmount')

const repayBidFullBtn = document.getElementById('repayBidFullBtn')
repayBidFullBtn.onclick = RepayBidFullFunc


//Withdraw Bid

const WithdrawBidFunc = async () => {


  let deployPoolInstance = new web3.eth.Contract(
    deployPool.abi,
    dPoolAddress5.value,
  );

  

  await deployPoolInstance.methods
  .Withdraw( 
    poolId7.value,
    erc20Address,
    bidId4.value,
    lender4.value
    )
  .send({
    from: accounts[0]
  })
  .once("receipt", (reciept) => {
    console.log("Request Loan Successful ✅",reciept);
    
  });    

}
const dPoolAddress5 = document.getElementById('dPoolAddress5')
const poolId7 = document.getElementById('poolId7')
const bidId4 = document.getElementById('bidId4');
const lender4 = document.getElementById('lender4');

const withdrawBtn = document.getElementById('withdrawBtn')
withdrawBtn.onclick = WithdrawBidFunc


//Mint Lending Tokens


const MintTokenFunc = async() => {
  let contractERC20 = new web3.eth.Contract(
    ERC20ABI.abi,
    erc20Address
  );
  
  await contractERC20.methods
    .mint(recepAddress.value, web3.utils.toWei(mintAmount.value))
    .send({ from: accounts[0] })
    .once("receipt", (reciept) => {
      console.log(reciept);
      if(reciept.status){
        mintSpan.innerHTML = '✅ Transferred: '+mintAmount.value+' to: '+recepAddress.value;
      }else {
        console.log('transfer Unsuccesful')
      }
      
    })

}

const recepAddress = document.getElementById('recepAddress');
const mintAmount = document.getElementById('mintAmount')

const mintTokenBtn = document.getElementById('mintTokenBtn')
const mintSpan = document.getElementById('mintSpan')

mintTokenBtn.onclick = MintTokenFunc;


//Check Loan Amount

const CheckLoanFunc = async () => {

  let res = await poolAddressInstance.methods
  .loans(
    cLoanId.value
    ).call()
  
console.log(web3.utils.fromWei(res.loanDetails.principal))
console.log(web3.utils.fromWei(res.terms.paymentCycleAmount))
document.getElementById('checkLoanSpan').innerHTML = 'Principal Amount: '+web3.utils.fromWei(res.loanDetails.principal)
}

const cLoanId = document.getElementById('cLoanId')

const checkLoanBtn  = document.getElementById('checkLoanBtn')

checkLoanBtn.onclick = CheckLoanFunc

//Check Payment Cycle Amount

const CheckPcaFunc = async () => {

  let res = await poolAddressInstance.methods
  .loans(
    pcaLoanId.value
    ).call()
  
// console.log(web3.utils.fromWei(res.loanDetails.principal))
// console.log(web3.utils.fromWei(res.terms.paymentCycleAmount))
document.getElementById('checkPcaSpan').innerHTML = 'Payment Cycle Amount: '+web3.utils.fromWei(res.terms.paymentCycleAmount)
}

const pcaLoanId = document.getElementById('pcaLoanId')

const checkPcaBtn  = document.getElementById('checkPcaBtn')

checkPcaBtn.onclick = CheckPcaFunc

//Check DPool amount to pay by the pool owner

const CheckViapFunc = async () => {

  let deployPoolInstance = new web3.eth.Contract(
    deployPool.abi,
    viapDPool.value,
  );

  

  let res = await deployPoolInstance.methods
  .viewFullRepayAmount( 
    viapPoolId.value,
    erc20Address,
    viapBidId.value,
    viaplender.value
    ).call()   
  
// console.log(web3.utils.fromWei(res.loanDetails.principal))
// console.log(web3.utils.fromWei(res.terms.paymentCycleAmount))
document.getElementById('checkViapSpan').innerHTML = ' Amount to Pay: '+web3.utils.fromWei(res)
}

const viapPoolId = document.getElementById('viapPoolId')
const viapBidId = document.getElementById('viapBidId')
const viaperc20 = document.getElementById('viaperc20')
const viaplender = document.getElementById('viaplender')
const viapDPool = document.getElementById('viapDPool')
const checkViapBtn  = document.getElementById('checkViapBtn')

checkViapBtn.onclick = CheckViapFunc

init();

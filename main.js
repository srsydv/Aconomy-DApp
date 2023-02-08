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

const poolRegistryAdd = "0x837bD61CE00E657Ed53a998b5E3e77A5a3bb608a"
const poolAddress = '0x796555293F780F34125F0D8a0e4dcB50418AF9Bf'
const erc20Address = '0x66b7768CAd0bf95372Fd8a474E916df0179538F6'

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
    loanAmount.value,
    loanDefaultDuration2.value,
    Apr.value*100,
    loanReceiverAddress.value
    )
  .send({
    from: accounts[0]
  })
  .once("receipt", (reciept) => {
    console.log("Request Loan Successful ✅",reciept);
    console.log(reciept.logs[0].args.loanId.toNumber())
    
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
  contractERC20 = new web3.eth.Contract(
        ERC20ABI,
        erc20Address
      );
      
      await contractERC20.methods
        .approve(poolAddress, loanAmount2.value)
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
        ERC20ABI,
        erc20Address
      );
      
      await contractERC20.methods
        .approve(poolAddress, amount3.value)
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

//Supply To Pool

const SupplyPoolFunc = async () => {

  contractERC20 = new web3.eth.Contract(
    ERC20ABI,
    erc20Address
  );

  let deployPoolInstance = new web3.eth.Contract(
    deployPool.abi,
    dPoolAddress1.value,
  );
  
  await contractERC20.methods
    .approve(dPoolAddress1.value, amount2.value)
    .send({ from: accounts[0] });
  console.log("approved");

  

  await deployPoolInstance.methods
  .supplyToPool( 
    poolId3.value,
    erc20Address,
    amount2.value,
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
    ERC20ABI,
    erc20Address
  );
  
  await contractERC20.methods
    .approve(dPoolAddress3.value, amount2.value)
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

const repayBidBtn = document.getElementById('repayBidBtn')
repayBidBtn.onclick = RepayBidInstallmentFunc

//Withdraw Bid

const WithdrawBidFunc = async () => {


  let deployPoolInstance = new web3.eth.Contract(
    deployPool.abi,
    dPoolAddress1.value,
  );

  

  await deployPoolInstance.methods
  .Withdraw( 
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

const poolId6 = document.getElementById('poolId6')
const bidId3 = document.getElementById('bidId3');
const lender3 = document.getElementById('lender3');

const withdrawBtn = document.getElementById('withdrawBtn')
withdrawBtn.onclick = WithdrawBidFunc


init();

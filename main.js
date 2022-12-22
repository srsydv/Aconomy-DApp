// 0x1C15Cb1cbf18ff3e4C89691F4B887ad9Df4Eb647

const Web3 = require("web3");
// const piNFT = '0x4689ea1F8b7e433fE64959CB94b444f8E1580FC7'
const piMarket = '0xbb351E564f95aC64942521B2e586554F8EB4BA64'
const piNFT = '0x96624AbD9B2F369285Cfbab1eA82257986D60717'
// const piMarket = '0x2BC997DaF93625A574463Ae9fCbdEB400fbFe3A7'
const piNFTabi = require('./piNFTabi.json');
const piMarketAbi = require('./piMarketAbi.json');
const MTK = '0x08268C6A177Cd529DEAB226829C739C93f463994'
const ERC20ABI = require('./ERC20.json')
const poolContractAddress = document.getElementById("pool");
const poolAddressAbi = require('./poolAddressAbi.json')
const ERC20Address = document.getElementById("ERC20Address");

const pndcabi = require('./Contract.json');
// const pndcabi = require('./PNDC_ERC721.json');
// const pndcabi = require('./TokenERC721.json');
// const pndc = '0xf4D06B6aa9670ad1f912dd2199D4B10A059D30Ea'
// const pndc = '0x1C15Cb1cbf18ff3e4C89691F4B887ad9Df4Eb647'
const pndc = '0xBB2bCe0d19918aB3CD55de1DE7770688B8ff00F7'
init = async () => {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    await window.ethereum.enable();
    console.log("Connected");
  } else {
    alert("Metamask not found");
  }
  piNFTmethods = new web3.eth.Contract(
    piNFTabi,
    piNFT
  );
  console.log("mmm",piNFTmethods.methods);
  piMarketmethods = new web3.eth.Contract(
    piMarketAbi,
    piMarket
  );
  pnccmtd = new web3.eth.Contract(
    pndcabi,
    pndc
  );
  console.log('methods',pnccmtd)

  accounts = await web3.eth.getAccounts();
  console.log("Account", accounts[0]);
};

mintNFT = async () => {
  // document.getElementById('11').innerHTML = '🔜';
  await pnccmtd.methods
    .mint(ownerAddress.value, uri.value,
      [[royaltyReciever.value, royaltyValue.value]])
    .send({ from: accounts[0] })
    .once("receipt", (reciept) => {
      console.log(reciept);
      //   let data = JSON.stringify(reciept.events.Transfer.returnValues.tokenId);
      // document.getElementById('11').innerHTML = data;
    });
  console.log("Minted!!");
};

const ownerAddress = document.getElementById("ownerAddress");
const royaltyReciever = document.getElementById("royaltyReciever");
const royaltyValue = document.getElementById("royaltyValue");
const uri = document.getElementById("uri");
const btnMintNFT = document.getElementById("btnCreateItem");
btnMintNFT.onclick = mintNFT;

// mintNFT = async () => {
//   // document.getElementById('11').innerHTML = '🔜';
//   await piNFTmethods.methods
//     .mintNFT(ownerAddress.value, uri.value,
//       [[royaltyReciever.value, royaltyValue.value]])
//     .send({ from: accounts[0] })
//     .once("receipt", (reciept) => {
//       console.log(reciept);
//       //   let data = JSON.stringify(reciept.events.Transfer.returnValues.tokenId);
//       // document.getElementById('11').innerHTML = data;
//     });
//   console.log("Minted!!");
// };

// const ownerAddress = document.getElementById("ownerAddress");
// const royaltyReciever = document.getElementById("royaltyReciever");
// const royaltyValue = document.getElementById("royaltyValue");
// const uri = document.getElementById("uri");
// const btnMintNFT = document.getElementById("btnCreateItem");
// btnMintNFT.onclick = mintNFT;
// 0xE98Cb60DA91d6b1cA712c430f36a7D2F2dD8fa44
// tt=0xfd6Afdb38cB1eB51A32a544977C826251D8aEEB5
// srs = 0x6E22A7d1773879D3f045706e538ffab573762D7c
// pi=0x1B3ee4aAc1d163ff243D096674eeBA094E46eAaA
// pool=0x43FA5a2fB9F49d8D5071D448F6207AA9c00F7F70
Approve = async () => {
  document.getElementById('123').innerHTML = 'Processing🔜';
  // const p="0x43FA5a2fB9F49d8D5071D448F6207AA9c00F7F70";
  const p="0x8523d873C5637ed2Dd77992680e93b71F57b63fe";
  contractERC20 = new web3.eth.Contract(
    ERC20ABI,
    erc20token.value
  );
  await contractERC20.methods
    .approve(p, tokenamount1.value)
    .send({ from: accounts[0] });
  console.log("approved");
  document.getElementById('123').innerHTML = "Approved👍";
}
const erc20token = document.getElementById("erc20token");
const tokenamount1 = document.getElementById("tokenamount1");
const btnApprove = document.getElementById("btnApprove");
btnApprove.onclick = Approve;

energizeWithERC20 = async () => {
  let flag = 0;
  document.getElementById('1234').innerHTML = 'Processing🔜';

  await piNFTmethods.methods
    .addERC20(
      accounts[0],
      getTokenId.value,
      ERC20Address.value,
      getTokenAmount.value
    )
    .send({ from: accounts[0] }).once("receipt2", (reciept) => {
      console.log(reciept);
    });

  document.getElementById('1234').innerHTML = "Energized!!✅";
  console.log("Energized!!");
};
const getTokenAmount = document.getElementById("getTokenAmount");
const getTokenId = document.getElementById("getTokenId");

const btnGetToken = document.getElementById("btnGetToken");
btnGetToken.onclick = energizeWithERC20;


ReleaseERC20 = async () => {
  document.getElementById('process3').innerHTML = 'Processing🔜';
  const receipt = await piNFTmethods.methods
    .transferERC20(
      TokenIdofNFT.value,
      receverAddressofERC20.value,
      Erc20address1.value,
      sendTokenAmount.value
    )
    .send({ from: accounts[0] });
  document.getElementById('process3').innerHTML = 'Released!!✅';
  console.log(receipt);
  console.log("Released!!");
};
Erc20address1 = document.getElementById("Erc20address1");
const receverAddressofERC20 = document.getElementById("receverAddressofERC20");
const sendTokenAmount = document.getElementById("sendTokenAmount");
const TokenIdofNFT = document.getElementById("TokenIdofNFT");

const btnSendToken = document.getElementById("btnSendToken");
btnSendToken.onclick = ReleaseERC20;


showBalanceOfNFT = async () => {
  const receipt = await piNFTmethods.methods
    .viewBalance(tid.value, enterAddress.value)
    .call();
  document.getElementById('process4').innerHTML = receipt;
  console.log(receipt);
};
const enterAddress = document.getElementById("enterAddress");
const tid = document.getElementById("tid");
const btnAccountBalance = document.getElementById("btnAccountBalance");
btnAccountBalance.onclick = showBalanceOfNFT;




// piNFTmarket Place web3 fn

ApproveNFT = async () => {

  await piNFTmethods.methods
    .approve(piMarket, tokenIdofNFT.value)
    .send({ from: accounts[0] });
  console.log("approved");
  // document.getElementById('123').innerHTML = "Approved👍";
}
const tokenIdofNFT = document.getElementById("tokenIdofNFT");
const btnApproveforNFT = document.getElementById("btnApproveforNFT");
btnApproveforNFT.onclick = ApproveNFT;


ownerOf = async () => {

  const r = await pnccmtd.methods
    .ownerOf(3)
    .call();
  console.log("owner", r);
  // document.getElementById('123').innerHTML = "Approved👍";
}
const ownerNFT = document.getElementById("ownerNFT");
ownerNFT.onclick = ownerOf;


sellNFT = async () => {

  await piMarketmethods.methods
    .sellNFT(piNFT, tokenIdNFT.value, priceValue.value)
    .send({ from: accounts[0] })
    .once("receipt", (reciept) => {
      console.log(reciept);
    });
}
const tokenIdNFT = document.getElementById("tokenIdNFT");
const priceValue = document.getElementById("priceValue");
const btnSellNFT = document.getElementById("btnSellNFT");
btnSellNFT.onclick = sellNFT;

buyNFT = async () => {

  await piMarketmethods.methods
    .BuyNFT(saleId.value)
    .send({
      from: accounts[0],
      value: valueofNFT.value
    })
    .once("receipt", (reciept) => {
      console.log(reciept);
    });
}
const saleId = document.getElementById("saleId");
const valueofNFT = document.getElementById("valueofNFT");
const btnBuyNFT = document.getElementById("btnBuyNFT");
btnBuyNFT.onclick = buyNFT;


cancleSell = async () => {

  await piMarketmethods.methods
    .cancelSale(CancelSale.value)
    .send({ from: accounts[0] })
    .once("receipt", (reciept) => {
      console.log(reciept);
    });
}
const CancelSale = document.getElementById("CancelSale");
const btnCancelSale = document.getElementById("btnCancelSale");
btnCancelSale.onclick = cancleSell;


//Approve ERC721
ApproveTokenId = async () => {
  document.getElementById('123').innerHTML = 'Processing🔜';

  await piNFTmethods.methods
    .approve(piMarket, tokenidforapprove.value)
    .send({ from: accounts[0] });
  console.log("approved");
  document.getElementById('123').innerHTML = "Approved👍";
}
const tokenidforapprove = document.getElementById("tokenidforapprove");
const btnApprovefortokenId = document.getElementById("btnApprovefortokenId");
btnApprovefortokenId.onclick = ApproveTokenId;


//Sell NFT By Bid
SellNFTbyBid = async () => {
  document.getElementById('123').innerHTML = 'Processing🔜';

  await piMarketmethods.methods
    .SellNFT_byBid(piNFT, tokenidforbidsell.value, priceforbidsell.value, bidtime.value)
    .send({ from: accounts[0] })
    .once("receipt", (reciept) => {
      console.log(reciept);
    });
}

const tokenidforbidsell = document.getElementById("tokenidforbidsell");
const priceforbidsell = document.getElementById("priceforbidsell");
const bidtime = document.getElementById("bidtime");
const btnSellNFTByBid = document.getElementById("btnSellNFTByBid");
btnSellNFTByBid.onclick = SellNFTbyBid;

//Bidding
Bidding = async () => {
  document.getElementById('123').innerHTML = 'Processing🔜';

  await piMarketmethods.methods
    .Bid(BidsaleId.value)
    .send({
      from: accounts[0],
      value: Bidvalue.value
    })
    .once("receipt", (reciept) => {
      console.log(reciept);
    });
}

const Bidvalue = document.getElementById("Bidvalue");
const BidsaleId = document.getElementById("BidsaleId");
const btnforBid = document.getElementById("btnforBid");
btnforBid.onclick = Bidding;


executeBidOrderfn = async () => {
  document.getElementById('123').innerHTML = 'Processing🔜';

  await piMarketmethods.methods
    .executeBidOrder(saleIdforececution.value, bidOrderID.value)
    .send({
      from: accounts[0]
    })
    .once("receipt", (reciept) => {
      console.log(reciept);
    });
}

const saleIdforececution = document.getElementById("saleIdforececution");
const bidOrderID = document.getElementById("bidOrderID");
const btnexecuteBid = document.getElementById("btnexecuteBid");
btnexecuteBid.onclick = executeBidOrderfn;


withdrawBidMoneyfn = async () => {
  await piMarketmethods.methods
    .withdrawBidMoney(saleIdforWithdraw.value, bidOrderIDforWithdraw.value)
    .send({
      from: accounts[0]
    })
    .once("receipt", (reciept) => {
      console.log(reciept);
    });
}

const saleIdforWithdraw = document.getElementById("saleIdforWithdraw");
const bidOrderIDforWithdraw = document.getElementById("bidOrderIDforWithdraw");
const btnWithdraw = document.getElementById("btnWithdraw");
btnWithdraw.onclick = withdrawBidMoneyfn;




createPoolss = async () => {
  await piNFTmethods.methods
    .createPool(description.value, target.value, interestRate.value, lateInterestRate.value, lateInterestRateDeadLine.value, rePayStartDate.value, totalRepayDeadLine.value)
    .send({
      from: accounts[0]
    })
    .once("receipt", (reciept) => {
      console.log(reciept);
      let data = JSON.stringify(reciept.events.poolAddressDetail.returnValues.pooladdress);
      document.getElementById('PA').innerHTML = data;
    });
}
const description = document.getElementById("description");
const target = document.getElementById("target");
const interestRate = document.getElementById("interestRate");
const lateInterestRate = document.getElementById("lateInterestRate");
const lateInterestRateDeadLine = document.getElementById("lateInterestRateDeadLine");
const rePayStartDate = document.getElementById("rePayStartDate");
const totalRepayDeadLine = document.getElementById("totalRepayDeadLine");
const createPools = document.getElementById("createPool");
createPools.onclick = createPoolss;


ApproveForPool = async () => {
  document.getElementById('_123').innerHTML = 'Processing🔜';
  const p="0x839A8bcbb3EB280d7a85D9d510eFF9AFD810ee0d";
  contractERC20 = new web3.eth.Contract(
    ERC20ABI,
    _erc20token.value
  );
  await contractERC20.methods
    .approve(_poolAddress.value, _tokenamount1.value)
    .send({ from: accounts[0] });
  console.log("approved");
  document.getElementById('_123').innerHTML = "Approved👍";
}
const _poolAddress = document.getElementById("_poolAddress");
const _erc20token = document.getElementById("_erc20token");
const _tokenamount1 = document.getElementById("_tokenamount1");
const _btnApprove = document.getElementById("_btnApprove");
_btnApprove.onclick = ApproveForPool;


addFunds = async () => {
  document.getElementById('_process2').innerHTML = 'Processing🔜';
  poolAddressmethods = new web3.eth.Contract(
    poolAddressAbi,
    poolContractAddress.value
  );
  const p="0xFfD4F2cb34529f9c90B993cAe5E27201c1E5FeCC";
  
  await poolAddressmethods.methods
    .addFund(_erc20Address.value, _value.value)
    .send({ from: accounts[0] }).once("receipt", (reciept) => {
      console.log(reciept);
      // let data = JSON.stringify(reciept.events.poolAddressDetail.returnValues.pooladdress);
      document.getElementById('_process2').innerHTML = "Fund Added👍";
    });
}
// const _poolAddress = document.getElementById("_poolAddress");
const _erc20Address = document.getElementById("_erc20Address");
const _value = document.getElementById("_value");
const _addFund = document.getElementById("_addFund");
_addFund.onclick = addFunds;


AmountWithInstallement = async () => {
  document.getElementById('_process4').innerHTML = 'Processing🔜';
  poolAddressmethods = new web3.eth.Contract(
    poolAddressAbi,
    poolContractAddress.value
  );
  console.log("m",poolAddressmethods)
  const p="0xFfD4F2cb34529f9c90B993cAe5E27201c1E5FeCC";
  
  const res = await poolAddressmethods.methods
    ._viewRepayAmountWithInstallement(_erc20Address1.value, _repayInstallment.value)
    .call();
    document.getElementById('_process4').innerHTML = res;
    console.log("ff11",res);
}
const _erc20Address1 = document.getElementById("_erc20Address1");
const _repayInstallment = document.getElementById("_repayInstallment");
const RepayAmountWithInstallement = document.getElementById("_viewRepayAmountWithInstallement");
RepayAmountWithInstallement.onclick = AmountWithInstallement;

investorBalance = async () => {
  document.getElementById('_process3').innerHTML = 'Processing🔜';
  poolAddressmethods = new web3.eth.Contract(
    poolAddressAbi,
    poolContractAddress.value
  );
  console.log("m",poolAddressmethods)
  const p="0xFfD4F2cb34529f9c90B993cAe5E27201c1E5FeCC";
  
  const res = await poolAddressmethods.methods
    .investorBalanceDetails(wltaddress.value, _erc20Address2.value)
    .call();
    console.log("ff11",res);
    document.getElementById('_process3').innerHTML = res;
    
}
const _erc20Address2 = document.getElementById("_erc20Address2");
const wltaddress = document.getElementById("wltaddress");
const investorBalanceDetails = document.getElementById("investorBalanceDetails");
investorBalanceDetails.onclick = investorBalance;



payInstallmentfn = async () => {
  document.getElementById('_process5').innerHTML = 'Processing🔜';
  poolAddressmethods = new web3.eth.Contract(
    poolAddressAbi,
    poolContractAddress.value
  );
  console.log("m",poolAddressmethods)
  const p="0xFfD4F2cb34529f9c90B993cAe5E27201c1E5FeCC";
  
  const res = await poolAddressmethods.methods
    .payInstallment(_erc20Address3.value, _repayInstallment2.value)
    .send({ from: accounts[0] }).once("receipt", (reciept) => {
      console.log(reciept);
    });
    document.getElementById('_process5').innerHTML = "Installment Paid👍";
}
const _erc20Address3 = document.getElementById("_erc20Address3");
const _repayInstallment2 = document.getElementById("_repayInstallment2");
const payInstallment = document.getElementById("payInstallment");
payInstallment.onclick = payInstallmentfn;

withdrawFundfn = async () => {
  document.getElementById('_process6').innerHTML = 'Processing🔜';
  poolAddressmethods = new web3.eth.Contract(
    poolAddressAbi,
    poolContractAddress.value
  );
  console.log("m",poolAddressmethods)
  const p="0xFfD4F2cb34529f9c90B993cAe5E27201c1E5FeCC";
  
  const res = await poolAddressmethods.methods
    .withdrawFund(_erc20Address4.value, amount11.value)
    .send({ from: accounts[0] }).once("receipt", (reciept) => {
      console.log(reciept);
    });
    document.getElementById('_process6').innerHTML = "Fund Withdraw👍";
}
const _erc20Address4 = document.getElementById("_erc20Address4");
const amount11 = document.getElementById("amount11");
const withdrawFund = document.getElementById("withdrawFund");
withdrawFund.onclick = withdrawFundfn;



getSmartContractBalancefn = async () => {
  document.getElementById('_process7').innerHTML = 'Processing🔜';
  poolAddressmethods = new web3.eth.Contract(
    poolAddressAbi,
    poolContractAddress.value
  );
  console.log("m",poolAddressmethods)
  const p="0xFfD4F2cb34529f9c90B993cAe5E27201c1E5FeCC";
  
  const res = await poolAddressmethods.methods
    .getSmartContractBalance(_erc20Address5.value)
    .call();
    console.log("ff11",res);
    document.getElementById('_process7').innerHTML = res;
    
}
const _erc20Address5 = document.getElementById("_erc20Address5");
const getSmartContractBalance = document.getElementById("getSmartContractBalance");
getSmartContractBalance.onclick = getSmartContractBalancefn;


withdrawfn = async () => {
  document.getElementById('_process8').innerHTML = 'Processing🔜';
  poolAddressmethods = new web3.eth.Contract(
    poolAddressAbi,
    poolContractAddress.value
  );
  console.log("m",poolAddressmethods)
  const p="0xFfD4F2cb34529f9c90B993cAe5E27201c1E5FeCC";
  
  const res = await poolAddressmethods.methods
    .withdraw(_erc20Address6.value, _repayInstallment3.value)
    .send({ from: accounts[0] }).once("receipt", (reciept) => {
      console.log(reciept);
    });
    document.getElementById('_process8').innerHTML = "Withdraw👍";
}
const _erc20Address6 = document.getElementById("_erc20Address6");
const _repayInstallment3 = document.getElementById("_repayInstallment3");
const withdraw = document.getElementById("withdraw");
withdraw.onclick = withdrawfn;

init();

async function mygetDmtMintWalletHistoricList(btcadrr){

      // I get all the natdiamonds and natjewels of the BTC address
      let url = "https:/fra-01.tap-reader.xyz/getDmtMintWalletHistoricList/"
      url+= btcadrr
      url+= "?offset=0&max=500"

      const response = await fetch(url);
      const data = await response.json();
      //console.log(data);

      // I put inside an array the list of my diamonds inscriptionsId
      var vector = []
      for (var i = 0; i < data.result.length; i++) {
          var ligne = data.result[i];
          vector.push(ligne)
          console.log(ligne);
      }
      console.log("----------------------------------")

      // I get details about each diamond
      await getDiamDetail(vector)
}

async function getDiamDetail(vect){
  console.log("je possede", vect.length , "natstones")

    for (let index=0 ; index < vect.length;index++){
        let inscrId = vect[index]
        //I call the tap-reader website to have some details
        //console.log("vectIndex =", index)
        await mygetDmtMintHolder(inscrId)
    }
}

async function mygetDmtMintHolder(inscriptionId){
  let url = "https://fra-01.tap-reader.xyz/getDmtMintHolder/"
  url+= inscriptionId

  const response = await fetch(url);
  const data = await response.json();

  const result = data.result;
  let theblock = result.dmtblck
  console.log("the ticker is : ", result.tick,theblock);
  if(result.tick == "dmt-natjewels"){
    let karatscore = calckaratscoreJewels(theblock)
    console.log(result.tick, karatscore)
    totalScore += karatscore
  }else if(result.tick == "dmt-natdiamonds") {
    let karatscore = calckaratscoreDiamonds(theblock)
    console.log(result.tick, karatscore)
    totalScore += karatscore
  }
}


function calckaratscoreJewels(blocknumber){
  let nk = 0
  if (blocknumber%1000==0) {
   //pearl
   nk = 5000
  } else if (blocknumber%100==0){
    //gem
    nk = 1000
  } else if (blocknumber%10==0){
    //blackdiamond
    nk = 500
  } else if (blocknumber%10<=3){
    //emerald
    nk = 100
  }  else if (blocknumber%10<=7){
    //ruby
    nk = 100
  }  else if (blocknumber%10<=9){
    //sapphyre
    nk = 100
  }
  let blkNumStr = blocknumber.toString()
  let karatScore = nk
  if (blocknumber%10!=0){
    nk = nk+calcSymKarat(blkNumStr,karatScore)
  }
  return nk
}

function calckaratscoreDiamonds(blocknumber){
  let blkNumStr = blocknumber.toString()
  let karatScore = 10
  karatScore = karatScore+calcSymKarat(blkNumStr,karatScore)
  return karatScore
}

function calcSymKarat(blkNumStr,karatScore){
  let twentyperc = karatScore*0.2
  let howmanysym = 0
  let len = blkNumStr.length
  let len2 = Math.floor(len / 2)

   for (let i = 0; i < len2; i++) {
      let ch1 = blkNumStr.charAt(i)
      let ch2 = blkNumStr.charAt(len-1-i)
      if(ch1 == ch2){
          howmanysym++
      }
  }

  var symetrie = howmanysym/len2*100.0
  let karat = twentyperc*symetrie/100.0
  return karat
}

let totalScore = 0
async function mainFunc(){
  totalScore = 0  
    let theaddr = "bc1qswyw7tw83z3770aset09knmu93p52xwxlman7x"
    await mygetDmtMintWalletHistoricList(theaddr)
    console.log("address total score = ",totalScore)
}

// here begins the program
mainFunc();
async function mygetDmtMintWalletHistoricList(btcadrr){

      // I get all the natdiamonds and natjewels of the BTC address
      let url = "https:/fra-01.tap-reader.xyz/getDmtMintWalletHistoricList/"
      url+= btcadrr
      url+= "?offset=0&max=500"

      const response = await fetch(url);
      const data = await response.json();
      console.log(data);

      // I put inside an array the list of my diamonds inscriptionsId
      var vector = []
      for (var i = 0; i < data.result.length; i++) {
          var ligne = data.result[i];
          vector.push(ligne)
          console.log(ligne);
      }
      console.log("----------------------------------")

      // I get details about each diamond
      getDiamDetail(vector)

}

function getDiamDetail(vect){

  console.log("je possede", vect.length , "natstones")

    for (let index=0 ; index < vect.length;index++){
        let inscrId = vect[index]
        //I call the tap-reader website to have some details
        mygetDmtMintHolder(inscrId)
    }
}


async function mygetDmtMintHolder(inscriptionId){

  let url = "https://fra-01.tap-reader.xyz/getDmtMintHolder/"
  url+= inscriptionId

  const response = await fetch(url);
  const data = await response.json();

  const result = data.result;

  console.log("the ticker is : ", result.tick);
}


function mainFunc(){  
    let theaddr = "PUT YOUR BTC ADDRESS HERE"
    mygetDmtMintWalletHistoricList(theaddr)
}
    
// here begins the program
mainFunc();
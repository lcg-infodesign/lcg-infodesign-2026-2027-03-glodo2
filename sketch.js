// variabili globali
let myTable;

let maxDolPri = 0;


async function setup() {
  createCanvas(windowWidth, windowHeight);
  myTable = await loadTable("assets/datasets/bigmac_3.csv", ",", "header");

  // prova di stampa del dataset
  // console.log("dati: ", myTable)

  for (let rowNum = 0; rowNum < myTable.getRowCount(); rowNum++) {
    
    // prova di stampa delle righe
    console.log("numero riga: ", rowNum)

    // carica il valore del prezzo in dollari
    let dolPri = myTable.getNum(rowNum, "dollar_price")

    // prova di stampa dei prezzi in dollari
    console.log("prezzo in dollari: ", dolPri)

    // trova e sostituisci il valore massimo del prezzo in dollari 
    if (dolPri > maxDolPri) {
      maxDolPri = dolPri
    } 

  }

  // prova di stampa del massimo prezzo in dollari
  console.log("massimo prezzo in dollari: ", maxDolPri)

  frameRate(8);

}

// function hamburger () {
//   push()
//     noStroke();
//     fill('#873b08')
//     rect(xPos+25, windowHeight-200, bigMacWidth/1.45, burgHeight, 10)
//   pop();
// }

function draw() {

  background('#ff6647');

  fill('#ff2a00')
  text("2020 Big Mac Index", 25, 125)
  textSize(150)

  // per riflettere orizzontalmente e non avere Big Mac volanti
  translate(windowWidth, windowHeight)
  rotate(PI)

  let xPos = 0;
  let name = "";
  let bigMacWidth = (windowWidth-30)/myTable.getRowCount()

  console.log("larghezza big mac: ", bigMacWidth)

  for (let rowNum = 0; rowNum < myTable.getRowCount(); rowNum++){

    let dolPri = myTable.getNum(rowNum, "dollar_price")
    let altezza = map(dolPri, 0, maxDolPri, 0, windowHeight-200)

    if (dolPri > maxDolPri) {
      maxDolPri = dolPri
    } 
    
    push();
      noStroke();
      fill('#873b08')
      rect(xPos+25, 50, bigMacWidth/1.5, altezza)

      // lattuga
      if (altezza > 20) {
        fill('#40b800')
        rect(xPos+25, 55, bigMacWidth/1.45, 10)
      }

      
      // pane inferiore
      fill('#ffcc91')
      rect(xPos+25, 45, bigMacWidth/1.45, 15)
      rect(xPos+25, 40, bigMacWidth/1.45, 20, 20)

      // formaggio
      if (altezza > 15) {
      fill('#ffbb00')
      rect(xPos+25, altezza+45, bigMacWidth/1.45, 10)
      }


      // pane superiore
      fill('#ffcc91')
      rect(xPos+25, altezza+50, bigMacWidth/1.45, 10)
      rect(xPos+25, altezza+55, bigMacWidth/1.45, 15, 20)
    pop();

    // aumenta xPos
    xPos = xPos + bigMacWidth

    // carica il nome della nazione
    name = myTable.getString(rowNum, "name")

    // se il cursore passa nella zona assegnata ad una nazione mostra il relativo nome
    if (mouseX > xPos+25 && mouseX < (xPos+25 + bigMacWidth)) {
      push();
        translate(windowWidth, windowHeight)
        rotate(PI)
        text(("", name), mouseX, mouseY)
      pop();
    }

  }
}

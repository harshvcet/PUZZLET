
var rows = 3;
var columns = 3;

var currTile;
var otherTile; //blank tile

var turns = 0;

var imgoriginalOrder = ["11", "12", "13", "14", "15", "16", "17", "19", "18"];
var imgOrder = ["11", "12", "13",  "14", "15", "16", "17","18","19"];

window.onload = function() {
    for (let r=0; r < rows; r++) {
        for (let c=0; c < columns; c++) {

            //<img id="0-0" src="1.jpg">
            let tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString();
            tile.src = imgOrder[r * columns + c] + ".PNG";
            tile.setAttribute("draggable", true);

            //DRAG FUNCTIONALITY
           
            tile.addEventListener("dragstart", dragStart);  //click an image to drag
            tile.addEventListener("dragover", dragOver);    //moving image around while clicked
            tile.addEventListener("dragenter", dragEnter);  //dragging image onto another one
            tile.addEventListener("dragleave", dragLeave);  //dragged image leaving anohter image
            tile.addEventListener("drop", dragDrop);        //drag an image over another image, drop the image
            tile.addEventListener("dragend", dragEnd);      //after drag drop, swap the two tiles
            document.getElementById("board").append(tile);
            
            
        
            

        }
    }

  
 
}



       
        function checkWinner() {
            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < columns; c++) {
                    let tile = document.getElementById(r.toString() + "-" + c.toString());
                    let currentImage = tile.src.substring(tile.src.lastIndexOf("/") + 1);
                    let expectedImage = imgoriginalOrder[r * columns + c] + ".PNG";

                    if (currentImage !== expectedImage) {
                        return false; // At least one tile is not in the correct position, not a winner yet
                    }
                }
            }

            // If all tiles are in the correct positions, declare the player as the winner
            document.getElementById("winMessage").style.display = "block";
            let sound = new Audio("win.mp3");
            sound.play();
            document.getElementById("turns").innerText = turns;
            alert("You Won "+turns+" Turns");
            return true;
        }

    

function dragStart() {
    currTile = this; //this refers to the img tile being dragged
    checkWinner();
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {
   
}

function dragDrop() {
    
    otherTile = this;
   
   
     //this refers to the img tile being dropped on
}


function dragEnd() {
    if (!otherTile.src.includes("18.PNG")) {
        return;
    }
   
    let currCoords = currTile.id.split("-"); //ex) "0-0" -> ["0", "0"]
    let r = parseInt(currCoords[0]);
    let c = parseInt(currCoords[1]);

    let otherCoords = otherTile.id.split("-");
    let r2 = parseInt(otherCoords[0]);
    let c2 = parseInt(otherCoords[1]);

    let moveLeft = r == r2 && c2 == c-1;
    let moveRight = r == r2 && c2 == c+1;

    let moveUp = c == c2 && r2 == r-1;
    let moveDown = c == c2 && r2 == r+1;

    let isAdjacent = moveLeft || moveRight || moveUp || moveDown;
    let mySound = new Audio("sounds.mp3");
    mySound.play();

  
    if (isAdjacent) {
        let currImg = currTile.src;
        let otherImg = otherTile.src;

        currTile.src = otherImg;
        otherTile.src = currImg;

        turns += 1;
        document.getElementById("turns").innerText = turns;
        currTile.src = otherImg;
        otherTile.src = currImg;
        
       
        
      
    }
    

}
function myFunction(){
    document.getElementById("turns").innerText=0;
    
    setTimeout(function(){
        window.location.reload();
       
    
     }, 1500);
     let sound = new Audio("decide.mp3");
     sound.play();

    
  

  }

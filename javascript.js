window.onload = function() {
  //This first gets an array of all the elements tagged "td"
  var boxes = document.getElementsByTagName("td");
  //This sets it so that X starts first
  var turn = "X";
  //This variable tracks the number of turns we've gone through
  var turnTracker = 0;
  //This sets the message that's displayed for the h2 as a default
  var message = "It's X's turn to play!";

  //This function handles the switching back and forth between players
  function switchPlayer(){
    if (turn === "X") {
      turn = "O"
    }
    else {
      turn = "X"
    }
    turnTracker++
    changeMessage();
  }
  
  //This function changes the text displayed by the variable message
  function changeMessage(){
    //tracker selects the html element with the idea "turn-tracker"
    var tracker = document.getElementById("turn-tracker");
    //This variable is set to the winner of the match by the whoWon function
    var victor = whoWon();

    if (victor === "X") {
      message = "X wins!";
      endGame();
    }
    else if (victor === "O") {
      message = "O wins!";
      endGame();
    }
    else if (turnTracker < 9) {
      message = "It's " + turn + "'s turn to play!"
    }
    else {
      message = "Draw!"
    }
    tracker.innerHTML = message;
  }

  //This function sorts out who's won the match
  function whoWon(){
    var v = ""; //v for victory!
    //top row
    if (boxes[0].className === boxes[1].className && boxes[1].className === boxes[2].className){
      v = boxes[0].className
    }
    //middle row
    else if (boxes[3].className === boxes[4].className && boxes[4].className === boxes[5].className){
      v = boxes[3].className;
    }  
    //bottom row
    else if (boxes[6].className === boxes[7].className && boxes[7].className === boxes[8].className){
      v = boxes[6].className;
    }
    //left column
    else if (boxes[0].className === boxes[3].className && boxes[3].className === boxes[6].className){
      v = boxes[0].className;
    }
    //middle column
    else if (boxes[1].className === boxes[4].className && boxes[4].className === boxes[7].className){
      v = boxes[1].className;
    }
    //right column
    else if (boxes[2].className === boxes[5].className && boxes[5].className === boxes[8].className){
      v = boxes[2].className;
    }
    //diagonal bottom to top
    else if (boxes[6].className === boxes[4].className && boxes[4].className === boxes[2].className){
      v = boxes[6].className;
    }
    //diagonal top to bottom
    else if (boxes[0].className === boxes[4].className && boxes[4].className === boxes[8].className){
      v = boxes[0].className;
    }
    else {
      //no winner
    }

    return v;
  }

  //This function removes the ability to make more marks if an end state is 
  //reached i.e., one side wins or there's a draw
  function endGame(){
    for(i = 0; i < boxes.length; i++){
      boxes[i].removeEventListener("click", markBox)
    }
  }
  //This function allows the boxes to be marked with the appropriate player's 
  //mark and then makes it stick
  function markBox(){
    this.innerHTML = turn;
    this.className = turn;

    switchPlayer();

    this.removeEventListener("click", markBox)
  }

  //This puts an event listener on every box in the table
  for(var i = 0; i < boxes.length; i++){
  boxes[i].addEventListener("click", markBox)  
  }
}

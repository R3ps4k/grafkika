var playerLeftPoints =0;
var playerRightPoints =0;

function score(player){ // left || right
    if(player == "right")
        playerRightPoints++;
    else
        playerLeftPoints++;

    updatescores();
}

function updatescores(){
    var left = document.getElementById("leftplayerPints");
    var right = document.getElementById("rightplayerPints");

    left.innerText = playerLeftPoints;
    right.innerText = playerRightPoints;
}
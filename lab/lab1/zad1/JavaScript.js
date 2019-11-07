var canvas;
var ctx;

var canvasheight = 800;
var canvaswidth = 1000;

var turtleX;  // turtle coordinates
var turtleY;
var turtleAngle;

var preventinfiniteloop;

var moves = [];
function Move(type, length, angle) {
    this.type = type; // hop/move
    this.length = length;
    this.angle = angle;
}
function drawMoves() {
    clearcanvas();
    preventinfiniteloop = true;

    for (var i = 0; i < moves.length; i++) {
        var Move = moves[i];
        turtleAngle = Move.angle;
        if (Move.type == 'hop') {
            turtleHop(Move.length);
        }
        else {
            turtleMove(Move.length);
        }
    }
    preventinfiniteloop = false;
    drawTurtle();
}
function clearMoves() { moves = [];}

// przechowuj tylko pozycjie w układzie odniesienia żółwia
// po każdym przesunięciu żółwia rysuj linię do jego współrzędnych

function loaded() {
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");

    turtleX = 500;
    turtleY = 400;
    turtleAngle = 90;
    hideTurtle = false;
    preventinfiniteloop = false;

    drawTurtle();
}

function degreeToRad(degrees) {
    return degrees * Math.PI / 180;
}

function setTurtleCoordinates(x, y) {
    turtleX = x;
    turtleY = y;
}

function turtleHop(length) { //hop turtle to x,y coordinates DO NOT stroke

    var finalx = length * Math.cos(degreeToRad(turtleAngle)) + turtleX;
    var finaly = length * Math.sin(degreeToRad(turtleAngle)) + turtleY;
    setTurtleCoordinates(finalx, finaly);

    ctx.moveTo(turtleX, Math.abs(canvasheight - turtleY)); // move cursor, do not draw

    if (preventinfiniteloop != true) {
        var move = new Move('hop', length, turtleAngle);
        moves.push(move);
    }
    

   // drawTurtle();
}

function turtleMove(length) { // move turtle, stroke line, length - given pixel stroke length
    var finalx = length * Math.cos(degreeToRad(turtleAngle)) + turtleX;
    var finaly = length * Math.sin(degreeToRad(turtleAngle)) + turtleY;
    ctx.moveTo(turtleX, Math.abs(canvasheight - turtleY));
    setTurtleCoordinates(finalx, finaly);

    if (preventinfiniteloop != true) {
        var move = new Move('move', length, turtleAngle);
        moves.push(move);
    }


    drawPath();
}

function drawPath() {

    ctx.lineTo(turtleX, Math.abs(canvasheight - turtleY));
    ctx.lineWidth = 1;
    ctx.stroke();

   // drawTurtle();
}
 
function drawTurtle() {
    
    var img = new Image();
    img.onload = function () {
        ctx.drawImage(img, turtleX - 12, Math.abs(canvasheight - turtleY) - 12);
    };
    img.src = "sea-turtle.png";
}

/////// else

function clearcanvas() {
    turtleX = 500;
    turtleY = 400;
    turtleAngle = 90;

    ctx.beginPath();
    ctx.clearRect(0, 0, canvaswidth, canvasheight);
}

function circle(r) {
    clearcanvas();
    clearMoves();
    for (i = 0; i < 360; i++) {
        turtleMove(1);
        turtleAngle -= r;
    }
    drawTurtle();
}

function square() {
    clearcanvas();
    clearMoves();
    for (i = 0; i < 4; i++) {
        turtleMove(50);
        turtleAngle -= 90;
    }
    drawTurtle();
}

function dottedSquare() {
    clearcanvas();
    clearMoves();
    for (i = 0; i < 4; i++) {
        for (j = 0; j < 5; j++) {
            turtleMove(5);
            turtleHop(5);
        }
        turtleAngle -= 90;
    }
    drawTurtle();
}

function pentagon() {
    clearcanvas();
    clearMoves();

    turtleAngle += 18;
    for (var i = 0; i < 5; i++) {
        turtleMove(150);
        turtleAngle -= 72;
    }
    turtleAngle -= 18;
    drawTurtle();
}

function hexagon() {
    clearcanvas();
    clearMoves();

    turtleAngle += 60;
    for (var i = 0; i < 6; i++) {
        turtleMove(150);
        turtleAngle -= 60;
    }
    turtleAngle -= 60;

    drawTurtle();
}

function btnforeward() {
    turtleMove(20);
    drawMoves();
}

function btnturnright() {
    turtleAngle -= 90;
}
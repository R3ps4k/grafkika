var fpscount = 0;
var colorsqt = 0;
var animate = function (time) {
    var timeDelta = time - data.animation.lastTime;
    data.animation.lastTime = time;

    fpscount += 1;

    //<player_right>
    var px = data.object2.position[0] + data.object2.direction[0] * data.object2.speed * timeDelta;
    var py = data.object2.position[1] + data.object2.direction[1] * data.object2.speed * timeDelta;

    if (py >= 1 - data.object2.height / 2 || py <= -1 + data.object2.height / 2)
        py = data.object2.position[1];

    data.object2.position[0] = px;
    data.object2.position[1] = py;
    //</player_right>

    //<player_left>
    var plx = data.object3.position[0] + data.object3.direction[0] * data.object3.speed * timeDelta;
    var ply = data.object3.position[1] + data.object3.direction[1] * data.object3.speed * timeDelta;

    if (ply >= 1 - data.object3.height / 2 || ply <= -1 + data.object3.height / 2)
        ply = data.object3.position[1];

    data.object3.position[0] = plx;
    data.object3.position[1] = ply;
    //</player_left>


    //<ball>
    calculateBallDirecrion(data.object1, timeDelta)
    //</ball>

    redraw();
    gl.finish();
    data.animation.requestId = window.requestAnimationFrame(animate);
}

var animationStart = function () {
    data.animation.lastTime = window.performance.now();
    data.animation.requestId = window.requestAnimationFrame(animate);
}

var animationStop = function () {
    if (data.animation.requestId)
        window.cancelAnimationFrame(data.animation.requestId);
    data.animation.requestId = 0;
    redraw();
}

function randominitiallballdirection(ball) {
    Math.random() < 0.5 ? ball.direction[0] = -1 : ball.direction[0] = 1;
    ball.direction[1] = Math.random() - 0.5;
}

function calculateBallDirecrion(ball, timeDelta) {

    var x = ball.position[0] + ball.direction[0] * ball.speed * timeDelta;
    var y = ball.position[1] + ball.direction[1] * ball.speed * timeDelta;



    if (fpscount >= 2) {
        calculateExtraBallspositions(x, y, data.extraballs, ball.colorRGB);
        fpscount = 0;
    }


    // collision with border
    if (y >= 0.97 || y <= -0.97) {
        ball.direction = [ball.direction[0], ball.direction[1] * (-1)];
    }

    // hit right player border
    if (x >= 0.98) {
        score("left");
        resetPositions();
        animationStop();
        return;
    }
    //hits left player border
    if (x <= -0.98) {
        score("right");
        resetPositions();
        animationStop();
        return;
    }

    // colision with player_right
    if (x > 0.88 && y < data.object2.position[1] + (data.object2.height / 2) && y > data.object2.position[1] - (data.object2.height / 2)) {
        ball.position[0] = 0.879;
        //ball.direction = [(-1) * ball.direction[0], ball.direction[1]];
        ball.direction = calculateballvector(ball, data.object2);
        ball.position[1] = y;
        return;
    }
    //collision with player2
    if (x < -0.88 && y < data.object3.position[1] + (data.object3.height / 2) && y > data.object3.position[1] - (data.object3.height / 2)) {
        ball.position[0] = -0.879;
        // ball.direction = [(-1) * ball.direction[0], ball.direction[1]];
        ball.direction = calculateballvector(ball, data.object3);
        ball.position[1] = y;
        return;
    }

    ball.position[0] = x;
    ball.position[1] = y;
}

function calculateballvector(ball, player) {
    var vector = [0, 0];
    vector[0] = ball.direction[0] * (-1);

    var hit_pos = player.position[1] + player.height / 2 - ball.position[1];
    if (hit_pos >= 0 && hit_pos < 0.033) {
        vector[1] = 0.7;
    }

    if (hit_pos >= 0.033 && hit_pos < 0.066) {
        vector[1] = 0.525;
    }

    if (hit_pos >= 0.066 && hit_pos < 0.099) {
        vector[1] = 0.350;
    }

    if (hit_pos >= 0.099 && hit_pos < 0.133) {
        vector[1] = 0.175;
    }

    if (hit_pos >= 0.133 && hit_pos < 0.166) {
        vector[1] = 0;
    }

    if (hit_pos >= 0.166 && hit_pos < 0.199) {
        vector[1] = -0.175;
    }

    if (hit_pos >= 0.199 && hit_pos < 0.233) {
        vector[1] = -0.350;
    }

    if (hit_pos >= 0.233 && hit_pos < 0.266) {
        vector[1] = -0.525;
    }

    if (hit_pos >= 0.266 && hit_pos <= 0.3) {
        vector[1] = -0.7;
    }


    return vector;
}

async function resetPositions() {
    restoreballsposition(data.extraballs);
    data.object1.position = [0, 0, 0];
    data.object1.direction = [0, 0];
    data.object2.pos[1] = data.object2.position[1] = 0;
    data.object3.pos[1] = data.object3.position[1] = 0;
    animationStop();
    await sleep(1000);
    randominitiallballdirection(data.object1);

}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


var callbackOnKeyDown = function (e) {
    var code = e.which || e.keyCode;
    switch (code) {
        case 38: // up
            data.object2.direction = [0, 1];
            break;
        case 87: // w
            // data.object1.direction=[0,1];
            //if( data.animation.requestId == 0) animationStart();
            data.object3.direction = [0, 1];
            break;
        case 40: // down
            data.object2.direction = [0, -1];
            break;
        case 83: // s
            //data.object1.direction=[0,-1];
            //if( data.animation.requestId == 0) animationStart();
            data.object3.direction = [0, -1];
            // moznaby zrobic animacje ze zmiana ierunku - plynniejsze dzialanie dla gracza
            break;
        case 37: // left
        case 74:// J
            break;
        case 39:// right
        case 76: // L
            break;
        case 32: // space
            if (data.animation.requestId == 0) {
                animationStart();
            } else {
                animationStop();
            }
            break;
    }
}




var callbackOnKeyUp = function (e) {
    var code = e.which || e.keyCode;
    switch (code) {
        case 38: // up
            data.object2.direction = [0, 0];
            break;
        case 87: // w
            // data.object1.direction=[0,1];
            // if( data.animation.requestId == 0) animationStart();
            data.object3.direction = [0, 0];
            break;
        case 40: // down
            data.object2.direction = [0, 0];
            break;
        case 83: // s
            //data.object1.direction=[0,-1];
            //if( data.animation.requestId == 0) animationStart();
            data.object3.direction = [0, 0];
            // moznaby zrobic animacje ze zmiana ierunku - plynniejsze dzialanie dla gracza
            break;
        case 37: // left
        case 74:// J

            break;
        case 39:// right
        case 76: // L

            break;
        case 32:
            break;
    }
}

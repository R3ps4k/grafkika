var initCircle = function () {
    circle = {};

    /* animated object */
    circle = {};
    circle.speed = 0.0010; // ?

    circle.direction = [1, 0.8, 0];
    // parameters for drawObject
    circle.lineWidth = 1;
    circle.position = [0, 0, 0];
    circle.colorRGB = [1.0, 1.0, 1.0, 1];
    circle.bufferId = gl.createBuffer();
    var vertices = [];
    // generate circle
    for (var i = 0.0; i <= 360; i += 1) {
        var j = i * Math.PI / 180;
        // X Y Z
        var vert1 = [
            Math.sin(j) * 0.02,
            Math.cos(j) * 0.02
        ];
        var vert2 = [
            0,
            0
        ];
        vertices = vertices.concat(vert1);
        vertices = vertices.concat(vert2);
    }
    ///
    gl.bindBuffer(gl.ARRAY_BUFFER, circle.bufferId);


    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW); // load object's shape
    circle.floatsPerVertex = 2;
    circle.NumberOfVertices = vertices.length / 2;
    circle.drawMode = gl.TRIANGLE_STRIP;
    return circle;
}

var initPlayer = function (side) {
    var player = {};
    // parameters for drawObject

    player.speed = 0.0009; // ?
    player.direction = [0, 0, 0];

    player.lineWidth = 1;
    player.position = [0, 0, 0];
    player.pos = [0, 0, 0.0];
    player.colorRGB = [0.0, 0.5, 0.5, 1.0];
    player.bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, player.bufferId);


    player.width = 0.1;
    player.height = 0.3

    var verticlesarr;
    if (side == "right") {
        verticlesarr = setRectangle(0.9, -0.15, player.width, player.height);
    }
    else {
        verticlesarr = setRectangle(-0.9, -0.15, -player.width, player.height);
    }
    player.pos[0] = player.position[0];
    player.pos[1] = player.position[1];



    gl.bufferData(gl.ARRAY_BUFFER,
        new Float32Array(verticlesarr), gl.STATIC_DRAW); // load object's shape
    player.floatsPerVertex = 2;
    player.NumberOfVertices = 6;
    player.drawMode = gl.TRIANGLES;

    return player;
}


var initBorder = function () {
    var border = {};
    // parameters for drawObject

    border.lineWidth = 5;
    border.position = [0, 0, 0.0];
    border.colorRGB = [1.0, 0.0, 0.0,1];
    border.bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, border.bufferId);


    var verticlesarr = ([
        -1, -1,
        1, -1,
        1, 1,
        -1, 1
    ]);

    gl.bufferData(gl.ARRAY_BUFFER,
        new Float32Array(verticlesarr), gl.STATIC_DRAW); // load object's shape
    border.floatsPerVertex = 2;
    border.NumberOfVertices = 4;
    border.drawMode = gl.LINES;

    return border;
}

var initCourtLines = function () {
    var court = {};
    // parameters for drawObject

    court.lineWidth = 2;
    court.position = [0, 0, 0.0];
    court.colorRGB = [1.0, 0.0, 0.0,1];
    court.bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, court.bufferId);


    var verticlesarr = ([
        0, -1,
        0, 1
    ]);

    gl.bufferData(gl.ARRAY_BUFFER,
        new Float32Array(verticlesarr), gl.STATIC_DRAW); // load object's shape
    court.floatsPerVertex = 2;
    court.NumberOfVertices = 2;
    court.drawMode = gl.LINES;

    return court;
}

var initCourtCircle = function () {
    var circle = {};

    circle.lineWidth = 2;
    circle.position = [0, 0, 0];
    circle.colorRGB = [1.0, 0.0, 0,1];
    circle.bufferId = gl.createBuffer();
    var vertices = [];
    // generate circle
    for (var i = 0.0; i <= 360; i += 1) {
        var j = i * Math.PI / 180;
        // X Y Z
        var vert1 = [
            Math.sin(j) * 0.04,
            Math.cos(j) * 0.04
        ];
        var vert2 = [
            Math.sin(j) * 0.038,
            Math.cos(j) * 0.038,
        ];
        vertices = vertices.concat(vert1);
        vertices = vertices.concat(vert2);
    }
    ///
    gl.bindBuffer(gl.ARRAY_BUFFER, circle.bufferId);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW); // load object's shape
    circle.floatsPerVertex = 2;
    circle.NumberOfVertices = vertices.length / 2;
    circle.drawMode = gl.LINE_LOOP;
    return circle;
}


// helper function to draw rectangles
function setRectangle(x, y, width, height) {
    var x1 = x;
    var x2 = x + width;
    var y1 = y;
    var y2 = y + height;

    return ([
        x1, y1,
        x2, y1,
        x1, y2,
        x1, y2,
        x2, y1,
        x2, y2,
    ]);
}
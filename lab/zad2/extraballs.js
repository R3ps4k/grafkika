var colors = [
    [229, 0, 8, 1],
    [229, 0, 8, 1],
    [196, 27, 32, 1],
    [179, 40, 44, 1],
    [163, 54, 56, 1],
    [147, 68, 69, 1],
    [130, 81, 81, 1],
    [114, 95, 93, 1],
    [98, 109, 105, 1],
    [81, 122, 117, 1],
    [65, 136, 130, 1],
    [49, 150, 142, 1],
    [32, 163, 154, 1],
    [14, 177, 166, 1],
    [0, 191, 179, 1]
];

var extraballsqt;

function initextraballs(qt) {
    extraballsqt = qt;
    var balls = new Array(qt);

    var shadestep = 1 / qt;

    for (var i = 1; i <= qt; i++) {
        balls[i - 1] = createExtraBall(i * shadestep, [0, 0, 0]);
    }

    return balls;
}

function createExtraBall(shade, position, size) {
    circle = {};

    /* animated object */
    circle = {};

    // parameters for drawObject
    circle.lineWidth = 1;
    circle.position = position;
    circle.colorRGB = [1.0, 1.0, 1.0, 1 - shade];
    circle.bufferId = gl.createBuffer();
    var vertices = [];
    // generate circle
    for (var i = 0.0; i <= 360; i += 1) {
        var j = i * Math.PI / 180;
        // X Y Z
        var vert1 = [
            Math.sin(j) * (0.02 - shade / 90),
            Math.cos(j) * (0.02 - shade / 90)
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

function calculateExtraBallspositions(x, y, balls, color) {
    //ballspositions[0] = MotherBall.position;

    colorsqt++;
    var c = [colors[colorsqt][0]/255, colors[colorsqt][1]/255,colors[colorsqt][2]/255, 1.0];
       //data.object1.colorRGB = c; 

    balls[0].position = [x , y , 0];
    balls[0].colorRGB = c;

    for (var i = balls.length - 1; i >= 1; i--) {
        balls[i].position = balls[i - 1].position;
        balls[i].colorRGB = balls[i - 1].colorRGB;
    }
    colorsqt++;
    if (colorsqt >= 14)
        colorsqt = 0;
    // debugger;
}

function restoreballsposition(balls) {
    for (var i = balls.length - 1; i >= 0; i--) {
        balls[i].position = [0, 0, 0];
    }
}
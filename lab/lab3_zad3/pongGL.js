/* SHADER PROGRAM */
/* vertex shader source code */
var vertexShaderSrc = "" +
    "attribute vec4 aVertexPosition; \n" +
    "uniform vec3 uMove; \n" +
    
    "void main() { \n" +
    "  gl_PointSize=16.0; \n" +
    "  gl_Position= aVertexPosition + vec4( uMove, 0); \n" +
    "} \n";

/* fragment shader source code */
var fragmentShaderSrc = "" +
    "precision mediump float; \n" +
    "uniform vec4 uColorRGB; \n" +
    "void main() { \n" +
    "  gl_FragColor = vec4( uColorRGB); \n" +
    "} \n";



var gl; // GL context
var glObjects; // references to various GL objects
var html; // HTML objects
var data; // user data

var dataInit = function () {
    data = {};
    data.background = [0, 0, 0, 0.7];

    /* animated object */
    data.object1 = initCircle();

    /* Static background object */
    data.object2 = initPlayer("right");
    data.object3 = initPlayer("left");
    data.border = initBorder();
    data.courtlines = initCourtLines();
    data.courtCircle = initCourtCircle();

    data.extraballs = initextraballs(15);

    randominitiallballdirection(data.object1);

    /* animation */
    data.animation = {};
    data.animation.requestId = 0;

}

var drawObject = function (obj) {
    /* draw object obj */
    
    gl.lineWidth(obj.lineWidth);
    gl.enableVertexAttribArray(glObjects.aVertexPositionLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, obj.bufferId); /* refer to the buffer */
    gl.vertexAttribPointer(glObjects.aVertexPositionLocation, obj.floatsPerVertex, gl.FLOAT, false, 0 /* stride */, 0 /*offset */);
    gl.uniform3fv(glObjects.uMoveLocation, obj.position);
    gl.uniform4fv(glObjects.uColorRGBLocation, obj.colorRGB);
    gl.drawArrays(obj.drawMode, 0 /* offset */, obj.NumberOfVertices);
}

var redraw = function () {
    var bg = data.background;
    /* prepare clean screen */
    gl.clearColor(bg[0], bg[1], bg[2], bg[3]);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    /* draw objects */
    drawObject(data.courtlines);
    drawObject(data.courtCircle);
    drawObject(data.border);
    for(var i=0; i<extraballsqt; i++){
        drawObject(data.extraballs[i]);
    }
    drawObject(data.object1);
    drawObject(data.object2);
    drawObject(data.object3);
    
    
}




var htmlInit = function () {
    html = {};
    html.html = document.querySelector('#htmlId');
    html.canvas = document.querySelector('#glCanvas');
    updatescores();
};

var glInit = function (canvas) {
    gl = canvas.getContext("experimental-webgl");

    gl.viewport(0, 0, canvas.width, canvas.height);
    //gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);





    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.DST_COLOR);

    glObjects = {};

    /* create executable shader program */
    glObjects.shaderProgram = compileAndLinkShaderProgram(gl, vertexShaderSrc, fragmentShaderSrc);
    gl.useProgram(glObjects.shaderProgram);
    /* attributes */
    glObjects.aVertexPositionLocation = gl.getAttribLocation(glObjects.shaderProgram, "aVertexPosition");
    /* uniform variables */
    glObjects.uMoveLocation = gl.getUniformLocation(glObjects.shaderProgram, "uMove");
    glObjects.uColorRGBLocation = gl.getUniformLocation(glObjects.shaderProgram, "uColorRGB");

    glObjects.projectionMatrix = gl.getUniformLocation(glObjects.shaderProgram, 'uProjectionMatrix');
    glObjects.modelViewMatrix = gl.getUniformLocation(glObjects.shaderProgram, 'uModelViewMatrix');

    


};

var compileAndLinkShaderProgram = function (gl, vertexShaderSource, fragmentShaderSource) {
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderSource);
    gl.compileShader(vertexShader);
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
        console.log(gl.getShaderInfoLog(vertexShader));
        console.log(gl);
        return null;
    }

    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderSource);
    gl.compileShader(fragmentShader);
    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
        console.log(gl.getShaderInfoLog(fragmentShader));
        console.log(gl);
        return null;
    }

    var shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        console.log("Could not initialise shaders");
        console.log(gl);
        return null;
    }
    // SUCCESS 
    return shaderProgram;
};


window.onload = function () {
    htmlInit();
    glInit(html.canvas);
    dataInit();


    redraw();
    window.onkeydown = callbackOnKeyDown;
    window.onkeyup = callbackOnKeyUp;
};

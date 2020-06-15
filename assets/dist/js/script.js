
//array of circles
let circles = new Array;
let lines = new Array;
let squares = new Array;
let circleXReset = 0;

//canvas bounds
let bounds;
let stage;

let scaleX = 1;
let scaleY = 1;

const CIRCLE_RADIUS = 10;
const CIRCLE_AMOUNT = 3; // x Clusters
const CLUSTERS = 4;
const DEVIATION = -200;
const NEG = DEVIATION / 2;

const CANVAS_WIDTH = 1000;
const CANVAS_HEIGHT = 600;
const GREEN = '#00FF97';

const STROKE_STYLE = 2;
const STROKE_COLOR = 'black';

//initialize function, called when page loads.
function init() {

    //get a reference to the canvas element
    const canvas = document.getElementById("bg");
 
    //copy the canvas bounds to the bounds instance.
    //Note, if we resize the canvas, we need to reset
    //these bounds.
    bounds = new createjs.Rectangle();
    bounds.width = canvas.width;
    bounds.height = canvas.height;

    stage = new createjs.Stage(canvas);

    //create graphic, for a single dot:
    const g = new createjs.Graphics();
    g.setStrokeStyle( STROKE_STYLE );
    g.beginStroke( STROKE_COLOR );
    g.beginFill( GREEN );
    g.drawCircle(0, 0, CIRCLE_RADIUS);

    for( let i = 1; i <= CLUSTERS; i++ ){
        let gridX = ((CANVAS_WIDTH / CLUSTERS) / 2);
        let _x = i * gridX + ( ( i - 1 ) * gridX ); //halfway on grid
        
        for( let a = 1; a <= CIRCLE_AMOUNT; a++ ){
            let gridY = ((CANVAS_HEIGHT / CIRCLE_AMOUNT) / 2);
            let _y = a * gridY + ( ( a - 1 ) * gridY );
            squares.push([_x, _y]);
        }
        
    }

    for( let i = 0; i < squares.length; i++ ){
        let circle = new createjs.Shape(g);
        circle.x = _x = (Math.random() * (Math.floor(DEVIATION) - NEG )) + squares[i][0];
        circle.y = _y = (Math.random() * (Math.floor(DEVIATION) - NEG )) + squares[i][1];
        circles.push(circle);
    }

    drawEverything();
    

    createjs.Ticker.setFPS(1);

    //Subscribe to the Tick class. This will call the tick
    //method at a set interval (similar to ENTER_FRAME with
    //the Flash Player)
    createjs.Ticker.addEventListener("tick", handleTick);


    //menu:
    var btn = document.querySelector(".toggle-menu");
    btn.onclick = function( e ){
        var menu = document.querySelector(".menu-container")
        menu.classList.toggle('active');
    }
}

function drawEverything(){
    //draw lines:
    drawLines();

    //add circles:
    for (var i = 0; i < circles.length; i++) {
        stage.addChild(circles[i]);
    }

    //re-render the stage
    stage.update();
}

//function called by the Tick instance at a set interval
function handleTick() {


    //check and see if the Shape has gone of the right
    //of the stage.
    for( var i = 0; i < circles.length ; i++){
        stage.removeChild( circles[i]);
        circles[i].x = _x = (Math.random() * (Math.floor(DEVIATION) - NEG)) + squares[i][0];
        circles[i].y = _y = (Math.random() * (Math.floor(DEVIATION) - NEG)) + squares[i][1];
    }

    drawEverything();
}

function drawLines(){

    const max = ( CIRCLE_AMOUNT * CLUSTERS ) - CIRCLE_AMOUNT;

    for( let a = 0; a < lines.length; a++ ){
        if( typeof( lines[a] ) !== 'undefined' ){
            stage.removeChild( lines[a] );
        }
    }

    for( let i = 0; i < circles.length; i++ ){
        let circleNum = i + 1;
        let isBorder = Number.isInteger( ( circleNum / CIRCLE_AMOUNT ) ) || i >= max;
        if( !isBorder ){

            //under:
            let underCircle = circles[(i + 1)];
            drawLineBetween( circles[ i ], underCircle );
            
            //right
            let rightCircle = circles[( i + CIRCLE_AMOUNT )];
            drawLineBetween(circles[i], rightCircle);

            //diagonal;
            let diagonalCircle = circles[( i + CIRCLE_AMOUNT + 1 )];
            drawLineBetween(circles[i], diagonalCircle);

        
        } else if (Number.isInteger((circleNum / CIRCLE_AMOUNT)) && i < max ){

            //only do the right:
            let rightCircle = circles[(i + CIRCLE_AMOUNT)];
            drawLineBetween(circles[i], rightCircle );

        } else if( i !== max ){

            //under:
            let underCircle = circles[(i + 1)];
            drawLineBetween(circles[i], underCircle);
        }

        drawLineBetween(circles[0], {x: -300, y: -50 });
        drawLineBetween(circles[1], { x: -300, y: 150 });
        drawLineBetween(circles[2], { x: -300, y: 250 });
        drawLineBetween(circles[9], { x: 1000, y: 50 });
        drawLineBetween(circles[9],circles[10]);
        drawLineBetween(circles[11], { x: 1000, y: 350 });
    }
}


function drawLineBetween( circleA, circleB ){

    if( typeof( circleB) == 'undefined' ){
        return;
    }

    let line = new createjs.Shape();
    line.graphics.setStrokeStyle( STROKE_STYLE ).beginStroke( STROKE_COLOR );
    line.graphics.moveTo( ( circleA.x ), ( circleA.y ) );
    line.graphics.lineTo( ( circleB.x ), ( circleB.y ) );
    line.graphics.endStroke();

    stage.addChild( line );
    lines.push( line );
}

window.onload = init;
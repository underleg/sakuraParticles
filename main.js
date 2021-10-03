const showBoxes = false;

const xsize = 1920;
const ysize = 1920;

var xwindow = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;

var ywindow = window.innerHeight
    || document.documentElement.clientHeight
    || document.body.clientHeight;


let y1 = ysize * 3 / 10;
let y2 = ysize - ysize * 3 / 10;


// Create the application helper and add its render target to the page
let app = new PIXI.Application({ backgroundColor: 0xffffff, width: xsize, height:ysize });
document.body.appendChild(app.view);

let scale = xwindow / xsize;

app.stage.scale.x = scale;
app.stage.scale.y = scale;

// vars


var lSpawnRect; 
var rSpawnRect;

let lAttractor = null;
let rAttractor = null;


let petals = []; // Petal collection

// create brackground image
function loadBackground() {
    let name = "bg.png";

    let s = PIXI.Sprite.from(name);
    app.stage.addChild(s);
}

// create spawn rectangles (left and right)
function createSpawnRects() {
    let xOffset = xsize / 5;
    let w = xsize / 100;
    let h = ysize / 2;
    let yDelta = ysize / 10;

    lSpawnRect = new SpawnRectangle(-xOffset, y1 - yDelta, w, h, app.stage);
    rSpawnRect = new SpawnRectangle(xsize + xOffset, y2 + yDelta, w,h, app.stage);
}

// create petal attractors (left and right)
function createAttractors() {

    lAttractor = new Attractor(xsize / 3, y1, app.stage);
    rAttractor = new Attractor(xsize - (xsize / 3), y2, app.stage);
}


// return true whne all petals have stopped
function updatePetals(delta) {
    let res = true;

    // particle update loop
    for (i = 0; i < petals.length; ++i) {
        if (!petals[i].update(xsize, delta)) {
            res = false;
        }
    }
    return res;
}

function cleanUpPetals() {

    while (petals.length > 0) {
        petals[0].cleanup(app.stage);
        petals.splice(0, 1);
    }
}


// button response
function buttonAction() {

    let numPetals = document.getElementById("numPetals").value;
    let delay = 0;

    let imageNum = 0;

    cleanUpPetals();
    
    for (let i = 0; i < numPetals; i=i+2) {
        imageNum++;
        delay += 2;
        petals[petals.length] = new Petal(lSpawnRect, lAttractor, (imageNum % 4) + 1, delay, app.stage);
        petals[petals.length] = new Petal(rSpawnRect, rAttractor, (imageNum % 4) + 1, delay, app.stage);
    }
}


////////////////////////////////////////////////////////////////////////////////////////////////
loadBackground();
createSpawnRects();
createAttractors();

// sort
app.stage.children.sort(function (a, b) {
    if (a.distToAttractor != undefined && b.distToAttractor != undefined) {
        return a.distToAttractor > b.distToAttractor;
    } else {
        return true;
    }
});

// Add a ticker callback to move the sprite back and forth
let elapsed = 0.0;
app.ticker.add((delta) => {

    elapsed += delta;
    if (lAttractor) {
        lAttractor.updateAttractor(delta);
    }

    if (rAttractor) {
        rAttractor.updateAttractor(delta);
    }

    if (updatePetals(delta)) {
        cleanUpPetals();
    }
});


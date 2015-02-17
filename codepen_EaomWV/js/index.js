var snow = [];
var img;

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    fullscreen();

    for (var i = 0; i < 200; i++) {
        snow.push(new SnowBall());
    }

}

window.onresize = function () {
    canvas.size(windowWidth, windowHeight);
};

function draw() {
    smooth();
    frameRate(30);
    background(255);
    strokeWeight(.5);

    for (var i = 0; i < snow.length; i++) {
        snow[i].move();
        snow[i].display();
    }
}

// SnowBall class 
function SnowBall() {
    this.x = random(windowWidth);
    this.y = random(windowHeight);
    this.xVel = random(-2, 2);
    this.yVel = random(0, 5);
    this.diameter = random(5, 10);
    this.speed = 1;

    this.move = function () {
        this.x += this.xVel;
        this.y += this.yVel;

        if (this.y > windowHeight) {
            this.y = -20;
        }

        if (this.x > windowWidth || this.x < 0) {
            this.x = random(windowWidth);
        }

    };

    this.display = function () {
        ellipse(this.x, this.y, this.diameter, this.diameter);
    };
}

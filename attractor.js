class Attractor {
    constructor(x, y, container) {
        // Initialize the pixi Graphics class
        if (showBoxes) {
            this.graphics = new PIXI.Graphics();

            this.graphics.beginFill(0x0000ff);
            this.graphics.drawRect(x - 10, y - 10, 20, 20);
            this.graphics.endFill();

            container.addChild(this.graphics);
        }

        this.x = x;
        this.y = y;

        this.angle = Math.floor(Math.random() * 360);
    }

  
    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }
}

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

    updateAttractor(delta) {
        this.angle += 5 * delta;
    }

    getX() {
        let res = 0 * Math.cos(this.angle * Math.PI / 180.0);
        return res + this.x;
    }

    getY() {
        let res = 0 * Math.sin(this.angle * Math.PI / 180.0);
        return res + this.y;
    }
}

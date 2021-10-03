class SpawnRectangle {
    constructor(x, y, width, height, container) {

        if (showBoxes) {
            // Initialize the pixi Graphics class
            this.graphics = new PIXI.Graphics();

            this.graphics.beginFill(0xbf0000);
            this.graphics.drawRect(x - width / 2, y - height / 2, width, height);
            this.graphics.endFill();

            container.addChild(this.graphics);
        }

        this.x = x - width/2;
        this.y = y - height / 2;
        this.width = width;
        this.height = height;

    }

    assignRandomSpawnPoint(petal) {
        petal.x = this.x + Math.floor(Math.random() * this.width);
        petal.y = this.y + Math.floor(Math.random() * this.height);
    }
};

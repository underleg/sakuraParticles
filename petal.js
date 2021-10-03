class Petal {
    constructor(spawnRect, attractor, imageNum, delay, container) {

        let name = "petal0" + imageNum + ".png";

        this.sprite = PIXI.Sprite.from(name);

        this.sprite.x = 0.5;
        this.sprite.y = 0.5;

        container.addChild(this.sprite);
    
        spawnRect.assignRandomSpawnPoint(this);
        ///
        this.dx = 0.0;
        this.dy = 0.0;

        this.delay = parseInt(delay); 

        this.updateSpriteCoords();

        this.attractor = attractor;
     
        this.pull = document.getElementById("pull").value;

        this.sprite.rotation = Math.floor(Math.random() * 360) * Math.PI / 180;
        this.rotateDelta = (Math.random() * 6.0) - 3.0;

        this.distToAttractor = 0.0;
    }

    cleanup(container) {
        container.removeChild(this.sprite);

    }

    update(delta) {
        if (this.delay > 0.0) {
            this.delay -= delta;
        } else {

            this.sprite.rotation += (this.rotateDelta * delta) * Math.PI / 180;

            let distX = (this.attractor.getX() - this.x);

            let distY = (this.attractor.getY() - this.y);      

            this.distToAttractor = Math.sqrt(distX * distX + distY * distY);

            if (this.distToAttractor == 0.0) {
                this.distToAttractor = 1.0;
            }
     
            let coefficient = this.pull * delta / this.distToAttractor;

            this.dx += distX * coefficient;
            this.dy += distY * coefficient;

            this.x += this.dx;
            this.y += this.dy;

            this.updateSpriteCoords();
        }
    }

    updateSpriteCoords() {
        this.sprite.x = this.x - this.sprite.width / 2;
        this.sprite.y = this.y - this.sprite.height / 2;
    }

}



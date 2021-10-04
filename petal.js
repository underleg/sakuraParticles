class Petal {
    constructor(id, spawnRect, attractor, imageNum, delay, container) {

       let name = "petal0" + imageNum + ".png";

        this.sprite = PIXI.Sprite.from(name);

        this.sprite.x = 0.5;
        this.sprite.y = 0.5;

        this.sprite.ident = id;


        container.addChild(this.sprite);
    
        spawnRect.assignRandomSpawnPoint(this);
        ///
        this.dx = 0.0;
        this.dy = 0.0;

        this.delay = parseInt(delay); 

        this.active = true;
        this.lastDist = 999999;

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

    // updates 1 petal's movement - returns when the journey is complete 
    update(xsize, delta) {

        let res = false;

        if (this.active == false) {
            res = true; 
        } else if (this.delay > 0.0) {
            this.delay -= delta;
        } else {

            // make petal grow gradually
            let scaleDelta = 0.001 * delta;
            this.sprite.scale.x += scaleDelta;
            this.sprite.scale.y += scaleDelta;

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

            // if petal is heading away from the attract and is outside the screen area, reset it 
            if (this.distToAttractor > this.lastDist) {

                // if looping set scale
                if (looping) {
                    this.sprite.scale.x = 1.0;
                    this.sprite.scale.y = 1.0;
                } else { // disable petal
                    let xOffset = 2 * this.sprite.width;
                    if (this.x < - xOffset || this.x > xsize + xOffset) {
                        this.active = false;
                    }
                }
            }
            

            this.lastDist = this.distToAttractor;

        }

        return res;
    }

    updateSpriteCoords() {
        this.sprite.x = this.x - this.sprite.width / 2;
        this.sprite.y = this.y - this.sprite.height / 2;
    }

}



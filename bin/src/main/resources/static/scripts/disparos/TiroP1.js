class TiroP1 extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'pum')
    }

    fireP1(x, y, direction) {

        if (direction == 'left') {
            this.flipX = true;
            this.body.reset(x - 5, y);
            this.setVelocityX(-600);
            this.anims.play('pum', true);
            this.setOrigin(0, 0.5);


        }

        if (direction == 'right') {
            this.flipX = false;
            this.body.reset(x + 105, y);
            this.setVelocityX(600);
            this.setDepth(-1);
            this.anims.play('pum', true);
            this.setOrigin(1, 0.5);
        }


        this.setActive(true);
        this.setVisible(true);
        this.setDisplaySize(100, 16);


        this.body.setAllowGravity(false);
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);

        if (this.x >= 800 | this.x <= 0) {
            this.setActive(false);
            this.setVisible(false);
        }
        if (this.body.velocity.x != 600 & this.body.velocity.x != -600) {
            //this.body.velocity.x != 600 & this.body.velocity.x != -600
            this.x = 0;
            this.y = 0;                                                     ////////////////////////ARREGLAR ESOT PERO VA POR BUEN CAMINO
            this.setActive(false);
            this.setVisible(false);

            //console.log('colision detectada');

        }
    }
    update() {

    }


}
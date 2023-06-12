class TiroP2 extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'pum')
    }

    fireP2(x, y, direction) {

        if (direction == 'left') {
            this.flipX = true;
            this.body.reset(x - 5, y);
            this.setVelocityX(-600);
            this.anims.play('pum', true);
            this.setSize(50,50);
            this.setOffset(-0,60);

        }

        if (direction == 'right') {
            this.flipX = false;
            this.body.reset(x + 5, y);
            this.setVelocityX(600);
            this.setDepth(-1);
            this.anims.play('pum', true);
            this.setSize(50,50);
            this.setOffset(500,60);

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
            this.x = -100;
            this.y = -100;
            this.setActive(false);
            this.setVisible(false);

        }
    }


}
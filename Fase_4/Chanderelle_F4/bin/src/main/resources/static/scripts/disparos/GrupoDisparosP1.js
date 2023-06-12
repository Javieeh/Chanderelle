class GrupoDisparosP1 extends Phaser.Physics.Arcade.Group {
    constructor(scene) {

        super(scene.physics.world, scene);


        this.createMultiple({
            classType: TiroP1,
            frameQuantity: 30,
            active: false,
            visible: false,
            key: 'pum',
            depth: 3,
            setXY: { x: -100, y: -100 }

            //scale: 0.75
        })

    }

    fireBalaP1(x, y, direccion) {

        const bala = this.getFirstDead(false);
        if (bala) {
            bala.fireP1(x, y, direccion);
        }
        this.op = 0;
    }


}
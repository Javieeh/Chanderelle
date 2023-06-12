class GrupoDisparosP2 extends Phaser.Physics.Arcade.Group {
    constructor(scene) {

        super(scene.physics.world, scene);


        this.createMultiple({
            classType: TiroP2,
            frameQuantity: 30,
            active: false,
            visible: false,
            key: 'pum',
            setXY: { x: -100, y: -100 }
        })

    }

    fireBalaP2(x, y, direccion) {
        const bala = this.getFirstDead(false);
        if (bala) {
            bala.fireP2(x, y, direccion);
        }
    }


}
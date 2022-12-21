
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: "videogame",
    dom: {
        createContainer: true
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 650 },
            debug: false
        }
    },
    autoCenter: false,

    scene: [EscenaMenu, EscenaJuego, EscenaPausa, EscenaFinalJ1, EscenaFinalJ2, Lobby],
};//CONFIG

const game = new Phaser.Game(config);

const config = {
    type: Phaser.AUTO,
    parent: "videogame",
    width: 800,
    height: 600,
    dom: {
        createContainer: true
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 650 },
            debug: false,
        }
    },
    autoCenter: false,

    scene: [EscenaMenu, EscenaJuego, EscenaJuegoLocal, EscenaPausa, EscenaFinalJ1, EscenaFinalJ2, EscenaChat, EscenaLobby],
};//CONFIG

const game = new Phaser.Game(config);
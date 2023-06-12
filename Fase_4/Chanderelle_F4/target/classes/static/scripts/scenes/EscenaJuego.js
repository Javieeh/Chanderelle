/** @type { import ("../../typings/phaser") } */

"use strict";

var battle_Intro;
var battle_Loop;
var shoot_Sound;
var hit_Sound;

var gameScenePointer;

var player;
var setita;

var xP1;
var yP1;

var xP2;
var yP2;

var lastPdirection;
var lastSdirection;
var lastPdirectionAux;
var lastSdirectionAux;

var p1_isIdle = true;
var p2_isIdle = true;

var saltandoP1 = false;
var saltandoP2 = false;

var p1_isShooting = false;
var p2_isShooting = false;

var movimientoRealizado = false;

class EscenaJuego extends Phaser.Scene {

    constructor() {
        super('GameScene');

        this.sky;
        this.platforms;
        this.imagplatforms;
        this.cursors;
        this.stars;
        this.timerP1 = 0;

        this.impactoP1 = false;
        this.timerP2 = 0;

        this.impactoP2 = false;

        this.scoreText;
        this.vidastextleft;
        this.vidastextright;
        this.vidasleft = 3;
        this.vidasright = 3;
        this.bombs;
        this.gameOver = false;

        this.overText;

        this.imagvidasblanca;
        this.imagvidasrosa;

        this.keyM;

        this.hitbox1;


    }

    initialize() {
        Phaser.Scene.call(this, { key: 'GameScene' });

    }

    preload() {
        this.load.image('fondito', 'assets/game fondo.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.image('star', 'assets/star.png');
        this.load.image('bomb', 'assets/bomb.png');
        this.load.spritesheet('dude',
            'assets/dude.png',
            { frameWidth: 32, frameHeight: 48 }
        );

        this.load.spritesheet('caminar blanco',
            'assets/caminar blanco.png',
            { frameWidth: 226, frameHeight: 287 }
        );

        this.load.spritesheet('caminar rosa',
            'assets/sprite seta rosa.png',
            { frameWidth: 568, frameHeight: 633 }
        );

        this.load.spritesheet('bola',
            'assets/bolon.png',
            { frameWidth: 512, frameHeight: 144 }
            //{ frameWidth: 55, frameHeight: 16 }
        );


        //nuevo
        this.load.image('setita', 'assets/setita uwu.png');
        this.load.image('pium', 'assets/disparo uwu2.png');
        this.load.image('muro', 'assets/Vplatform.png');
        this.load.image('fog', 'assets/fog.png');
        this.load.image('coolPlatforms', 'assets/plataformas chulas.png');
        this.load.image('vidas blanc 3', 'assets/vidas blanca 3.png');
        this.load.image('vidas blanc 2.5', 'assets/vidas blanca 2,5.png');
        this.load.image('vidas blanc 2', 'assets/vidas blanca 2.png');
        this.load.image('vidas blanc 1.5', 'assets/vidas blanca 1,5.png');
        this.load.image('vidas blanc 1', 'assets/vidas blanca 1.png');
        this.load.image('vidas blanc 0', 'assets/vidas blanca muerta.png');
        this.load.image('vidas rosa 3', 'assets/vidas rosa 3.png');
        this.load.image('vidas rosa 2.5', 'assets/vidas rosa 2,5.png');
        this.load.image('vidas rosa 2', 'assets/vidas rosa 2.png');
        this.load.image('vidas rosa 1.5', 'assets/vidas rosa 1,5.png');
        this.load.image('vidas rosa 1', 'assets/vidas rosa 1.png');

        this.load.audio('Battle_Intro', ['music/JER_Battle_Intro.mp3', 'music/JER_Battle_Intro.ogg']);
        this.load.audio('Battle_Loop', ['music/JER_Battle_Loop.mp3', 'music/JER_Battle_Loop.ogg']);
        this.load.audio('shoot_Sound', 'music/SFX/Disparar.mp3');
        this.load.audio('hit_Sound', 'music/SFX/Impacto_Seta.mp3');

        //LUCIERNAGAS
        this.load.image('luciernaga', 'assets/Fire.png');

    }

    create() {
        console.log("Escena de juego creada!")
        gameScenePointer = this;

        this.sky = this.add.image(400, 300, 'fondito');
        this.sky.setDepth(-1);
        this.sky.setDisplaySize(800, 600);

        this.platforms = this.physics.add.staticGroup();

        //suelo ancho 400 alto 32  base
        //muro  ancho 32  alto 400  base
        this.platforms.create(400, 600, 'ground').setScale(2).setVisible(false).refreshBody();    //suelo base

        this.platforms.create(590, 450, 'ground').setDisplaySize(255, 32).setVisible(false).refreshBody(); //lvl 1 derecha 

        this.platforms.create(585, 305, 'ground').setDisplaySize(95, 32).refreshBody(); //lvl 2 derecha 
        this.platforms.create(40, 300, 'ground').setDisplaySize(125, 25).setVisible(false).refreshBody();   //lvl 2 izquierda

        this.platforms.create(750, 220, 'ground').setDisplaySize(110, 25).setVisible(false).refreshBody(); //lvl 3 derecha pegado 
        this.platforms.create(430, 220, 'ground').setDisplaySize(125, 20).setVisible(false).refreshBody(); //lvl 3 centro derecha 
        this.platforms.create(248, 220, 'ground').setDisplaySize(100, 25).setVisible(false).refreshBody(); //lvl 3 izquierda

        //tetris izq
        this.platforms.create(250, 365, 'ground').setDisplaySize(150, 25).setVisible(false).refreshBody(); //plat arriba
        this.platforms.create(125, 455, 'ground').setDisplaySize(105, 25).setVisible(false).refreshBody();    //plat abajo
        this.platforms.create(190, 435, 'muro').setDisplaySize(32, 150).setVisible(false).refreshBody()   //pared

        this.platforms.create(375, 543, 'muro').setDisplaySize(32, 60).setVisible(false).refreshBody(); //pincho suelo
        this.platforms.create(585, 380, 'muro').setDisplaySize(32, 130).setVisible(false).refreshBody(); //pared derecha I
        this.platforms.create(205, 248, 'muro').setDisplaySize(32, 80).setVisible(false).refreshBody(); //pared izquierda arriba 


        //imagen plataformas
        this.imagplatforms = this.add.image(400, 380, 'coolPlatforms');
        this.imagplatforms.setDepth(5);
        this.imagplatforms.setDisplaySize(800, 500);

        //imagen vidas
        this.imagvidasblanca = this.add.image(685, 65, 'vidas blanc 3').setDepth(2).setDisplaySize(260, 150);
        this.imagvidasblanca.flipX = true;
        this.imagvidasrosa = this.add.image(115, 65, 'vidas rosa 3').setDepth(2).setDisplaySize(260, 150);
        this.imagvidasrosa.flipX = false;

        //PLAYER
        this.player = this.physics.add.sprite(500, 500, 'caminar blanco');
        this.player.setDisplaySize(44, 60);
        this.player.setCollideWorldBounds(true);

        //xP1 = this.player.x
        //yP1 = this.player.y

        //SETITA
        this.setita = this.physics.add.sprite(300, 500, 'caminar rosa');
        this.setita.setDisplaySize(32, 48);
        this.setita.setCollideWorldBounds(true);






        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [{ key: 'dude', frame: 4 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        ////////////////////////////////////////////////////////////animacion seta amarilla
        this.anims.create({
            key: 'yellright',
            frames: this.anims.generateFrameNumbers('caminar blanco', { start: 9, end: 16 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'yellleft',
            frames: this.anims.generateFrameNumbers('caminar blanco', { start: 0, end: 7 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'yellfront',
            frames: [{ key: 'caminar blanco', frame: 8 }],
            frameRate: 20
        });

        ////////////////////////////////////////////////////////////animacion seta rosa
        this.anims.create({
            key: 'pinkright',
            frames: this.anims.generateFrameNumbers('caminar rosa', { start: 0, end: 4 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'pinkleft',
            frames: this.anims.generateFrameNumbers('caminar rosa', { start: 6, end: 10 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'pinkfront',
            frames: [{ key: 'caminar rosa', frame: 5 }],
            frameRate: 20
        });


        ////////////////ANIMACION DISPARO
        this.anims.create({
            key: 'pum',
            frames: this.anims.generateFrameNumbers('bola', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        ///////////////////////////////////

        //Collider con plataformas
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.setita, this.platforms);

        this.cursors = this.input.keyboard.createCursorKeys();//parte 8

        this.keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);

        //MENU PAUSA
        this.keyEsc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);


        this.disparosP1 = new GrupoDisparosP1(this);
        this.disparosP2 = new GrupoDisparosP2(this);
        this.physics.add.collider(this.disparosP1, this.setita, this.hitSeta, null, this);
        this.physics.add.collider(this.disparosP2, this.player, this.hitPlayerP1, null, this);
        this.physics.add.collider(this.disparosP1, this.platforms);
        this.physics.add.collider(this.disparosP2, this.platforms);



        this.addEvents();

        //this.vidastextleft = this.add.text(16, 16, 'P1 vidas: ' + this.vidasleft, { fontSize: '32px', fill: '#000' });
        //this.vidastextleft.setText('P1 vidas: ' + this.vidasleft);

        //this.vidastextright = this.add.text(570, 16, 'P2 vidas: ' + this.vidasright, { fontSize: '32px', fill: '#000' });
        //this.vidastextright.setText('P2 vidas: ' + this.vidasright);

        //NIEBLA
        const fog = this.add.image(1400, 200, 'fog');
        fog.alpha = 0.5;

        this.tweens.add({
            targets: fog,
            scale: 20,
            x: -3000,
            ease: 'Linear',
            duration: 300000,
            repeat: -1,
            depth: -1
        });

        //LUCIERNAGAS
        const p1 = this.add.particles('luciernaga');

        var k = 3;
        var k2 = 1;

        var rose = {
            getPoints: function (quantity, stepRate) {
                if (!stepRate) {
                    stepRate = Phaser.Math.PI2 / quantity;
                }

                var input = Phaser.Utils.Array.NumberArrayStep(0, Phaser.Math.PI2, stepRate);
                var output = new Array(input.length);

                for (var i = 0; i < input.length; i++) {
                    var angle = input[i];
                    output[i] = new Phaser.Math.Vector2().setToPolar(angle, 800 * Math.cos(k * angle));
                }

                return output;
            }
        };

        var rose2 = {
            getPoints: function (quantity, stepRate) {
                if (!stepRate) {
                    stepRate = Phaser.Math.PI2 / quantity;
                }

                var input = Phaser.Utils.Array.NumberArrayStep(0, Phaser.Math.PI2, stepRate);
                var output = new Array(input.length);

                for (var i = 0; i < input.length; i++) {
                    var angle = input[i];
                    output[i] = new Phaser.Math.Vector2().setToPolar(angle, 650 * Math.cos(k2 * angle));
                }

                return output;
            }
        };

        var rose3 = {
            getPoints: function (quantity, stepRate) {
                if (!stepRate) {
                    stepRate = Phaser.Math.PI2 / quantity;
                }

                var input = Phaser.Utils.Array.NumberArrayStep(0, Phaser.Math.PI2, stepRate);
                var output = new Array(input.length);

                for (var i = 0; i < input.length; i++) {
                    var angle = input[i];
                    output[i] = new Phaser.Math.Vector2().setToPolar(-angle, 800 * Math.cos(k * angle));
                }

                return output;
            }
        };

        var rose4 = {
            getPoints: function (quantity, stepRate) {
                if (!stepRate) {
                    stepRate = Phaser.Math.PI2 / quantity;
                }

                var input = Phaser.Utils.Array.NumberArrayStep(0, Phaser.Math.PI2, stepRate);
                var output = new Array(input.length);

                for (var i = 0; i < input.length; i++) {
                    var angle = input[i];
                    output[i] = new Phaser.Math.Vector2().setToPolar(-angle, 650 * Math.cos(k2 * angle));
                }

                return output;
            }
        };

        const emitterL = p1.createEmitter({

            lifespan: { min: 30, max: 100 },
            x: 200, y: 350,
            scale: { start: 0.15, end: 0 },
            blendMode: 'ADD',
            emitZone: { type: 'edge', source: rose, quantity: 15000 },
            depth: -2
        });

        const emitter2L = p1.createEmitter({

            lifespan: { min: 30, max: 100 },
            x: 200, y: 350,
            scale: { start: 0.15, end: 0 },
            blendMode: 'ADD',
            emitZone: { type: 'edge', source: rose2, quantity: 3000 },
            depth: -2
        });

        const emitter3L = p1.createEmitter({

            lifespan: { min: 30, max: 100 },
            x: 100, y: 350,
            scale: { start: 0.15, end: 0 },
            blendMode: 'ADD',
            emitZone: { type: 'edge', source: rose3, quantity: 15000 },
            depth: -2
        });

        const emitter4L = p1.createEmitter({

            lifespan: { min: 30, max: 100 },
            x: 50, y: 350,
            scale: { start: 0.15, end: 0 },
            blendMode: 'ADD',
            emitZone: { type: 'edge', source: rose4, quantity: 3000 },
            depth: -2
        });

        //MUSICA
        battle_Intro = this.sound.add('Battle_Intro');
        battle_Loop = this.sound.add('Battle_Loop');
        shoot_Sound = this.sound.add('shoot_Sound');
        hit_Sound = this.sound.add('hit_Sound');
        var battle_musicConfig = {
            mute: false,
            volume: 1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 8
        };
        battle_Intro.play();
        battle_Loop.play(battle_musicConfig);



    }//function create

    addEvents() {
        this.inputKeys = [
            this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B),];

    }

    shootdisparoP1(xpos, ypos, direc) {
        this.disparosP1.fireBalaP1(xpos, ypos, direc);
        shoot_Sound.play();
    }

    shootdisparoP2(xpos, ypos, direc) {
        this.disparosP2.fireBalaP2(xpos, ypos, direc);
        shoot_Sound.play();
    }

    update() {

        if (posSocketCreated) {

            if (localPlayer == 2) {
                //MOVIMIENTO PLAYER 2 = SETA GRIS 
                if ((this.keyA).isDown) {
                    this.MovimientoIzqLocalPlayer2();

                }
                else if ((this.keyD).isDown) {
                    this.MovimientoDchLocalPlayer2();

                }
                else {
                    this.IdleLocalPlayer2();

                }
                if ((this.keyW).isDown && this.player.body.touching.down) {
                    saltandoP1 = true;
                    this.SaltoLocalPlayer2();
                }
                if (this.player.body.touching.down) {
                    saltandoP1 = false;
                }
                if (saltandoP1) {
                    posSocket.sendWS(this.player.x, this.player.y, this.lastPdirection, localPlayer);
                }

                //ACTUALIZAR MOVIMIENTO DEL PLAYER 1
                this.setita.x = xP2;
                this.setita.y = yP2;

                //ACTUALIZAR DIRECCION DEL PLAYER 1
                this.lastSdirection = lastSdirection

                //ANIMACIONES PLAYER 1
                if (p2_isIdle) {
                    this.setita.anims.play('pinkfront');
                }
                else if (lastSdirection == 'left') {
                    this.setita.anims.play('pinkleft', true);
                }
                else if (lastSdirection == 'right') {
                    this.setita.anims.play('pinkright', true);
                }

                //DISPARO PLAYER 2
                if ((Phaser.Input.Keyboard.JustDown(this.keyC))) {
                    shootSocket.sendWS(localPlayer);
                    this.AccionDisparoP1();
                }

                //ACTUALIZACION DISPARO PLAYER 1
                if (p2_isShooting) {
                    this.AccionDisparoP2();
                    p2_isShooting = false
                }
            }
            else if (localPlayer == 1) {
                //MOVIMIENTO PLAYER 1 = SETA ROSA 
                if ((this.keyA).isDown) {
                    this.MovimientoIzqLocalPlayer1();

                }
                else if ((this.keyD).isDown) {
                    this.MovimientoDchLocalPlayer1();

                }
                //QUIETO
                else {

                    this.IdleLocalPlayer1();

                }

                //SALTO
                if ((this.keyW).isDown && this.setita.body.touching.down) {
                    saltandoP2 = true;
                    this.SaltoLocalPlayer1();

                }
                if (this.setita.body.touching.down) {
                    saltandoP2 = false;
                }
                if (saltandoP2) {
                    posSocket.sendWS(this.setita.x, this.setita.y, this.lastSdirection, localPlayer);

                }

                //ACTUALIZACION POSICIONES
                this.player.x = xP1;
                this.player.y = yP1;

                //ANIMACIONES
                this.lastPdirection = lastPdirection


                if (p1_isIdle) {
                    this.player.anims.play('yellfront');
                }
                else if (lastPdirection == 'left') {
                    this.player.anims.play('yellleft', true);
                }
                else if (lastPdirection == 'right') {
                    this.player.anims.play('yellright', true);
                }


                //DISPARO PLAYER 2
                if ((Phaser.Input.Keyboard.JustDown(this.keyC))) {

                    shootSocket.sendWS(localPlayer);
                    this.AccionDisparoP2();
                }
                if (p1_isShooting) {
                    this.AccionDisparoP1();
                    p1_isShooting = false

                }

            }
        }

        if ((Phaser.Input.Keyboard.JustDown(this.keyEsc))) {
            this.scene.wake('PauseScene');
            this.scene.pause('GameScene')

        }

        if (this.impactoP1 == true) {
            this.VisualImpactoP1()
        }

        if (this.impactoP2 == true) {
            this.VisualImpactoP2();
        }

        //FINAL
        if (this.gameOver == true && this.vidasright == 0) {
            this.VictoriaP1();
            lobbySocket.sendWS("winJ1")
        }
        else if (this.gameOver == true && this.vidasleft == 0) {
            this.VictoriaP2();
            lobbySocket.sendWS("winJ2")
        }


    }//function update

    VictoriaP1() {
        this.gameOver = false;
        this.vidasleft = 3;
        this.vidasright = 3;
        battle_Loop.stop();
        battle_Intro.stop();
    }

    VictoriaP2() {
        this.gameOver = false;
        this.vidasleft = 3;
        this.vidasright = 3;
        battle_Loop.stop();
        battle_Intro.stop();
    }

    VisualImpactoP1() {
        this.player.setTint(0xff0000);
        setTimeout(() => {
            this.player.setTint(0xffffff);
        }, "200");
        this.impactoP1 = false;
    }

    VisualImpactoP2() {
        this.setita.setTint(0xff0000);
        setTimeout(() => {
            this.setita.setTint(0xffffff);
        }, "200")
        this.impactoP2 = false;
    }

    AccionDisparoP1() {
        if (this.player.body.touching.left & this.lastPdirection == 'left') {

        }
        else if (this.player.body.touching.right & this.lastPdirection == 'right') {

        }
        else {
            this.shootdisparoP1(this.player.x, this.player.y, this.lastPdirection);

        }
    }

    AccionDisparoP2() {

        if (this.player.body.touching.left & this.lastPdirection == 'left') {

        }
        else if (this.player.body.touching.right & this.lastPdirection == 'right') {

        }
        else {
            this.shootdisparoP2(this.setita.x, this.setita.y, this.lastSdirection);
        }
    }

    //MOVIMIENTO PLAYER 1
    MovimientoIzqLocalPlayer2() {

        this.player.setVelocityX(-160);
        //this.hitbox1.body.velocity.x = -160;

        this.player.anims.play('yellleft', true);
        this.lastPdirection = 'left';
        posSocket.sendWS(this.player.x, this.player.y, this.lastPdirection, localPlayer, false);



    }

    MovimientoDchLocalPlayer2() {
        this.player.setVelocityX(160);
        //this.hitbox1.setVelocityX(160);

        this.player.anims.play('yellright', true);
        this.lastPdirection = 'right';
        posSocket.sendWS(this.player.x, this.player.y, this.lastPdirection, localPlayer, false);


    }

    SaltoLocalPlayer2() {
        this.player.setVelocityY(-450);

        //this.hitbox1.setVelocityY(-330);
    }

    IdleLocalPlayer2() {
        this.player.setVelocityX(0);
        //this.hitbox1.body.velocity.x = 0;

        this.player.anims.play('yellfront');
        posSocket.sendWS(this.player.x, this.player.y, this.lastPdirection, localPlayer, true);


    }

    //MOVIMIENTO PLAYER 2
    MovimientoIzqLocalPlayer1() {
        this.setita.setVelocityX(-160);

        this.setita.anims.play('pinkleft', true);
        this.lastSdirection = 'left';
        posSocket.sendWS(this.setita.x, this.setita.y, this.lastSdirection, localPlayer, false);


    }

    MovimientoDchLocalPlayer1() {
        this.setita.setVelocityX(160);

        this.setita.anims.play('pinkright', true);
        this.lastSdirection = 'right';
        posSocket.sendWS(this.setita.x, this.setita.y, this.lastSdirection, localPlayer, false);


    }

    SaltoLocalPlayer1() {
        this.setita.setVelocityY(-450);

    }

    IdleLocalPlayer1() {
        this.setita.setVelocityX(0);

        this.setita.anims.play('pinkfront');
        posSocket.sendWS(this.setita.x, this.setita.y, this.lastSdirection, localPlayer, true);


    }


    //player = derecha
    hitSeta(disparosP1, setita) {

        if (this.vidasleft > 0) {
            this.vidasleft = this.vidasleft - 1;
            //this.vidastextleft.setText('P1 vidas: ' + this.vidasleft);
            this.impactoP2 = true;
            if (this.vidasleft == 2) {
                setTimeout(() => {
                    this.imagvidasrosa = this.add.image(115, 65, 'vidas rosa 2').setDepth(2).setDisplaySize(260, 150);
                    this.imagvidasrosa.flipX = false;
                }, "500");
                this.imagvidasrosa = this.add.image(115, 65, 'vidas rosa 2.5').setDepth(2).setDisplaySize(260, 150);
                this.imagvidasrosa.flipX = false;

            }
            if (this.vidasleft == 1) {
                setTimeout(() => {
                    this.imagvidasrosa = this.add.image(115, 65, 'vidas rosa 1').setDepth(2).setDisplaySize(260, 150);
                    this.imagvidasrosa.flipX = false;

                }, "500");
                this.imagvidasrosa = this.add.image(115, 65, 'vidas rosa 1.5').setDepth(2).setDisplaySize(260, 150);
                this.imagvidasrosa.flipX = false;

            }
        }

        if (this.vidasleft < 1) {
            this.physics.pause();
            this.setita.setTint(0xff0000);
            this.gameOver = true;
            this.overText = this.add.text(200, 325, 'SETITA ELIMINADA', { fontSize: '50px', fill: '#000' });
        }
    }

    hitPlayerP1(disparosP2, player) {
        console.log(this.vidasright);
        if (this.vidasright > 0) {
            this.vidasright = this.vidasright - 1;
            //this.vidastextright.setText('P2 vidas: ' + this.vidasright);
            this.impactoP1 = true;
            if (this.vidasright == 2) {
                setTimeout(() => {
                    this.imagvidasblanca = this.add.image(685, 65, 'vidas blanc 2').setDepth(2).setDisplaySize(260, 150);
                    this.imagvidasblanca.flipX = true;
                }, "500");
                this.imagvidasblanca = this.add.image(685, 65, 'vidas blanc 2.5').setDepth(2).setDisplaySize(260, 150);
                this.imagvidasblanca.flipX = true;

            }
            if (this.vidasright == 1) {
                setTimeout(() => {
                    this.imagvidasblanca = this.add.image(685, 65, 'vidas blanc 1').setDepth(2).setDisplaySize(260, 150);
                    this.imagvidasblanca.flipX = true;

                }, "500");
                this.imagvidasblanca = this.add.image(685, 65, 'vidas blanc 1.5').setDepth(2).setDisplaySize(260, 150);
                this.imagvidasblanca.flipX = true;

            }
        }

        if (this.vidasright < 1) {
            this.physics.pause();
            this.player.setTint(0xff0000);
            this.gameOver = true;
            this.overText = this.add.text(200, 325, 'JUGADOR ELIMINADO', { fontSize: '50px', fill: '#000' });
        }
    }


}




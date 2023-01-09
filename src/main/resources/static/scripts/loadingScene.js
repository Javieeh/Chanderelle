class loadingScene extends Phaser.Scene {
    constructor() {
        super("MenuScene");
        this.fondo;
    }
    
    preload(){
      this.load.image('fondoMenu', 'assets/chanderelle.png');
    }
    create (){
        this.fondo = this.add.image(400, 300, 'fondoMenu');
        this.fondo.setDepth(-1);
        this.fondo.setScale(0.5);
      }
    //update(){
      
      enterButtonHoverState() {
        this.clickButton.setStyle({ fill: '#ff0'});
      }
    
      enterButtonRestState() {
        this.clickButton.setStyle({ fill: '#0f0' });
      }

      enterButtonHoverState2() {
        this.clickButton2.setStyle({ fill: '#ff0'});
      }
    
      enterButtonRestState2() {
        this.clickButton2.setStyle({ fill: '#0f0' });
      }
      
      update () {
    	  if ((crearPartidaBool == false) && (barrera == true)){
    		  crearPartida();
    		  console.log("He enviado petición para crear partida");
    		  crearPartidaBool = true;
    	  }
    	  if (StartGame == true){
    	  	this.scene.start("PlayGame");
    	  }
    	  
    	  
} 
}
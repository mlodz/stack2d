// navigator.splashscreen is not defined until after documentReady event

document.addEventListener('deviceready', onDeviceReady);
function onDeviceReady(){
    window.debug_text += "\ndevice ready: " + window.navigator.splashscreen ;
}

// window.screen.width is the device width, in "device pixels"
//    - also, on desktop, it's not the browser it's the monitor
// document.getElementByTagName('body').offsetWidth is the "css width"



var game = new Phaser.Game("100%", "100%", Phaser.CANVAS, 'game');

var bootState = {
    create: function() {
	console.log("Boot State: Create");
	game.physics.startSystem(Phaser.Physics.ARCADE); // maybe we don't need this
	game.state.start('load');

    }
};

var loadState = {
    preload: function() {
	console.log("Load State: Preload");
	// load assets
	game.load.image('lemon', 'assets/images/lemon_bg_1920x1200.jpg');

    },
    create: function() {
	console.log("LoadState: Create");
	game.state.start('play');
    }
};



game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('play', playState);

game.state.start('boot');



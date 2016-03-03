

// navigator.splashscreen is not defined until after documentReady event


window.debug_text = "\nDEBUG:";


document.addEventListener('deviceready', onDeviceReady);
function onDeviceReady(){
    window.debug_text += "\ndevice ready: " + window.navigator.splashscreen ;

// if(navigator.splashscreen) {
//     window.debug_text += "\nnavigator.splashcreen is defined";
//     navigator.splashscreen.show();
//     window.setTimeout(function () {
// 	window.debug_text += "\nsplashscreen is hidden after 10 seconds";
// 	navigator.splashscreen.hide();
//     }, 5000);
// }


}
// $(window).ready(function() {
//     window.debug_text += "\nwindow ready";
// }



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

var playState = {
    preload: function() {
	console.log("PlayState: Preload");
    },
    create: function() {
	console.log("PlayState: Create");
	// create sprites
	var background = game.add.image(game.world.centerX, game.world.centerY, 'lemon');
	background.anchor.set(0.5);
	//background.scale.setTo(0.5, 0.5);


	var title_text = game.add.text(
	    game.world.centerX,
	    30,
	    "You'll Figure It Out", 
	    {
		font: 'bold 36px Arial',
		fill: '#000' 
	    }
	).anchor.set(0.5);
	console.log("init score text");
	this.score_text = game.add.text(
	    game.world.centerX,
	    80,
	    "Score: ",
	    {
		font: '26px Arial',
		fill: '#000' 
	    }
	);
	this.score_text.anchor.set(0.5, 0);

	this.win_lose_counter = window.make_WinLoseCounter();
	console.log("hey:", this.win_lose_counter.message());

	this.print_score();

	if(navigator.splashscreen) {
	    navigator.splashscreen.hide();
	}

    },
    print_score: function() {
	var dimensions = "\nDimensions: " + game.width + " x " + game.height + " : " + window.devicePixelRatio;
	this.score_text.setText("Score: " + this.win_lose_counter.message() + dimensions + window.debug_text);
	//this.score_text.setText("Score: " + this.win_lose_counter.message() + dimensions);


	// game.debug.text("DEBUG", 0, 0);
	// game.debug.text("Dimensions: " + game.width + " x " + game.height + " : " + window.devicePixelRatio, game.world.centerX, 180);


    },
    update: function() {
	if(game.input.activePointer.isDown) {
	    var x = game.input.activePointer.clientX;
	    if(x < game.world.centerX) {
		this.win_lose_counter.win();
	    } else {
		this.win_lose_counter.lose();
	    }
	    this.print_score();
	}
    }
};

game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('play', playState);

game.state.start('boot');



var playState = {
    preload: function() {
	console.log("PlayState: Preload");
    },
    create: function() {
	console.log("PLayState: Create");

	var background = game.add.image(game.world.centerX, game.world.centerY, 'lemon');
	background.anchor.set(0.5);
	background.inputEnabled = true;
	background.events.onInputUp.add(this.on_click, this);

	var title_text = game.add.text(
	    game.world.centerX,
	    30,
	    "Stack 2D", 
	    {
		font: 'bold 36px Arial',
		fill: '#000' 
	    }
	).anchor.set(0.5);
	this.score_text = game.add.text(
	    game.world.centerX,
	    60,
	    "Level: #", 
	    {
		font: 'bold 18px Arial',
		fill: '#000' 
	    }
	)
	this.score_text.anchor.set(0.5);

	if(navigator.splashscreen) {
	    navigator.splashscreen.hide();
	}
	this.start_game();


    },
    
    start_game: function() {
	console.log("start game");
	this.round = 0;
	this.speed = 10;
	this.delta_speed = 1.1;

	this.game_state = {
	    round: 0,
	    speed: 10,
	    accel: 1.1,
	    slider_y: 300,
	    slider_height: 50,

	    slider_width: 100,

	    left_bound: 100,
	    right_bound: 600

	};

	this.create_base();

	this.start_round();

    },
    end_game: function() {
	this.current_slider.destroy();
	this.base.destroy();
	var self = this;
	setTimeout(
	    function() {self.start_game()},
	    3000
	);


    },
    start_round: function() {
	this.create_slider();
	this.score_text.setText(this.game_state.round);
	console.log("start round", this.game_state);

    },
    end_round: function() {
	this.game_state.round += 1;
	this.game_state.speed *= this.game_state.accel;
	this.start_round();
    },
    create_base: function() {
	var base = game.add.graphics(0, 0);
	base.beginFill(223344, 1);
	var width = this.game_state.slider_width;
	var height = 200;
	var middle = (this.game_state.left_bound + this.game_state.right_bound) / 2;
	var x =  middle - width / 2;
	var y = this.game_state.slider_y + this.game_state.slider_height;
	base.drawRect(x, y, width, height);
	
	this.base = base;
	this.base_top = y;
	this.base_left = x;
	this.base_right = x + width;
    },

    create_slider: function() {
	
	var x_start = this.game_state.left_bound;
	var x_end =  this.game_state.right_bound;
	var width = this.game_state.slider_width;
	var height = this.game_state.slider_height;
	var speed = this.game_state.speed;
	var time = 80 * (x_end - x_start - width) / speed;  // speed = distance / time
	var y = this.game_state.slider_y;


	var slider = game.add.graphics(x_start, y);
	slider.beginFill(0xFF0000, 1);
	slider.drawRect(0, 0, width, height);

	bounce = game.add.tween(slider);
	bounce.to(
	    {'x': x_end - width},
	    time,
	    Phaser.Linear,
	    true,
	    0,
	    -1
	);
	bounce.start();
	bounce.yoyo(true, 0);

	// TODO: too many global things, make some objects
	this.current_slider = slider;
	this.current_slider_width = width;
	this.current_slider_tween = bounce;

    },

    on_click: function() {
	console.log(">>>>>>>>>>>>>>>> click");


	var slider_left = this.current_slider.x;
	var slider_right = slider_left + this.current_slider_width;

	console.log("slider:", parseInt(slider_left), parseInt(slider_right), this.current_slider);
	console.log("base:", parseInt(this.base_left), parseInt(this.base_right));

	var misclick = (slider_right < this.base_left || slider_left > this.base_right);
	if(misclick) {
	    console.log("misclick");
	    this.end_game();
	    return;
	}
	var close_enough = Math.abs(slider_left - this.base_left) < 10;
	if(close_enough) {
	    console.log("################ CLOSE ENOUGH ################ ");
	    this.current_slider_tween.stop();
	    this.current_slider.x = this.base_left;
	    slider_left = this.current_slider.x;
	    slider_right = slider_left + this.current_slider_width;

	}



	var new_left = Math.max(slider_left, this.base_left);
	var new_top = this.base_top - this.game_state.slider_height;
	var new_right = Math.min(slider_right, this.base_right);
	var new_width = new_right - new_left;
	var new_height = this.game_state.slider_height + 1; // +1 removes the tiny gap when tweening
	console.log("drawRect: ", new_left, new_top, new_width, new_height);
	// slide the base down
	this.base.beginFill(0x228899, 1);
	this.base.drawRect(
	    new_left,
	    new_top,
	    new_width,
	    new_height
	);
	down = game.add.tween(this.base);
	down.to(
	    {'y': this.base.y + this.game_state.slider_height},
	    500,
	    Phaser.Easing.Quadratic.InOut
	);
	down.start();

	// Destroy slider
	this.current_slider.destroy()
	this.current_slider_width = undefined;
	this.current_slider_tween = undefined;
	
	// Update base
	this.base_left = new_left;
	this.base_right = new_right;
	this.base_top -= this.game_state.slider_height;

	this.game_state.slider_width = new_right - new_left;

	this.end_round();

    },
    update: function() {
	// this.rectA.x = game.input.activePointer.x;

    }
};

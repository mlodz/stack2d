window.make_WinLoseCounter = function() {
    var wins = 0;
    var losses = 0;
    function win() {
	wins++;
    };
    function lose() {
	losses++;
    };
    function message() {
	return wins + " / " + losses;
    };
    return {
	win: win,
	lose: lose,
	message: message
    };
};


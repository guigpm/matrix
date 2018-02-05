var c = document.getElementById("c");
var ctx = c.getContext("2d");

// the characters
var gurmukhi = "੧੨੩੪੫੬੭੮੯੦ੳਅਰਤਯਪਸਦਗਹਜਕਲਙੜਚਵਬਨਮੲਥਫਸ਼ਧਘਝਖਲ਼ੜ੍ਹਛਭਣ"
var sanskrit = "१२३४५६७८९अरतयपसदगहजकलङषचवबनमआथय़फशधघझखळक्षछभणऒ"
// converting the string into an array of single characters
var characters = sanskrit.split("");
var font_size = 16;
var columns = 1;    // number of columns for the rain

// an array of drops - one per column
var drops = [];

function ajusta_ctx () {
	// making the canvas full screen
	c.height = window.innerHeight;
	c.width = window.innerWidth;
	columns = c.width/font_size;    // number of columns for the rain

	drops = [];
	// x below is the x coordinate
	// 1 = y-coordinate of the drop (same for every drop initially)
	for (var x = 0; x < columns; x++) drops[x] = 1;
}

// drawing the characters
function draw() {

	// translucent BG to show trail
	ctx.fillStyle = "rgba(0,0,0,0.05)"; //getColor();
	ctx.fillRect(0, 0, c.width, c.height);

	ctx.fillStyle = "#33F"; // text color
	ctx.font = font_size + "px arial";

	// looping over drops
	for (var i = 0; i < drops.length; i++) {
		// a random chinese character to print
		var text = characters[Math.floor(Math.random() * characters.length)];
		// x = i * font_size, y = value of drops[i] * font_size
		ctx.fillText(text, i * font_size, drops[i] * font_size);

		// sending the drop back to the top randomly after it has crossed the screen
		// adding randomness to the reset to make the drops scattered on the Y axis
		if (drops[i] * font_size > c.height && Math.random() > 0.975)
			drops[i] = 0;

		// Incrementing Y coordinate
		drops[i]++;
	}
}



// setInterval(draw, 33);
var press_start = function () {};
var press_start_title = function () {};
var start_timeout = null;
var interval_start = 1000;
press_start = function () {
	ctx.fillStyle = "rgba(0,0,0,1)";
	ctx.fillRect(0, 0, c.width, c.height);

	start_timeout = setTimeout(press_start_title, interval_start);
}
press_start_title = function () {
	ctx.fillStyle = "rgba(0,0,0,1)";
	ctx.fillRect(0, 0, c.width, c.height);

	ctx.fillStyle = "#FFF"; // text color
	ctx.font = font_size + "px arial";

	var text = "Press Start";
	ctx.fillText(
		text,
		c.width/2.0 - ((text.length * font_size) / 5.0 /*numero magico para centralizar*/),
		c.height/2.0 - (font_size / 2.0)
	);

	start_timeout = setTimeout(press_start, interval_start);
}

function bsod() {
	ctx.fillStyle = "rgba(0,0,255,1)";
	ctx.fillRect(0, 0, c.width, c.height);

	$("#bsod_screen").show();

	setTimeout(function () {
		count_start = 1;
	}, 1000)
}

var count_start = 0;
function start_pressed(event) {
	if (event.keyCode == 13 && !count_start) {
		clearTimeout(start_timeout);
		bsod();
		count_start = -1;
	} else if (count_start === 1) {
		$("#bsod_screen").hide();

		ctx.fillStyle = "rgba(0,0,0,1)"; //getColor();
		ctx.fillRect(0, 0, c.width, c.height);

		setInterval(draw, 50);
		count_start = 2;
	}
}

$(document).ready(function () {
	ctx.fillStyle = "rgba(0,0,0,1)"; //getColor();
	ctx.fillRect(0, 0, c.width, c.height);

	press_start();
	$("body").keydown(start_pressed);

	ajusta_ctx();
	// $(window).resize(ajusta_ctx);
});
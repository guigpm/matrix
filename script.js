var c = document.getElementById("c");
var ctx = c.getContext("2d");

// making the canvas full screen
c.height = window.innerHeight;
c.width = window.innerWidth;

// the characters
var gurmukhi = "੧੨੩੪੫੬੭੮੯੦ੳਅਰਤਯਪਸਦਗਹਜਕਲਙੜਚਵਬਨਮੲਥਫਸ਼ਧਘਝਖਲ਼ੜ੍ਹਛਭਣ"
var sanskrit = "१२३४५६७८९अरतयपसदगहजकलङषचवबनमआथय़फशधघझखळक्षछभणऒ"
// converting the string into an array of single characters
var characters = sanskrit.split("");
var font_size = 16;
var columns = c.width/font_size;    // number of columns for the rain

// an array of drops - one per column
var drops = [];
// x below is the x coordinate
// 1 = y-coordinate of the drop (same for every drop initially)
for (var x = 0; x < columns; x++) drops[x] = 1;



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
	ctx.fillRect(0, 0, c.width, c.height);

	ctx.fillStyle = "#FFF"; // text color
	ctx.font = font_size + "px arial";

	var text = "Press Start";
	ctx.fillText(text, c.width/2.0 - ((text.length / 2.0) * font_size), c.height/2.0 - (font_size / 2.0));

	start_timeout = setTimeout(press_start, interval_start);
}

function start_pressed(event) {
	if (event.keyCode == 13) {
		clearTimeout(start_timeout);
		ctx.fillStyle = "rgba(0,0,0,1)";
		ctx.fillRect(0, 0, c.width, c.height);
		ctx.fillRect(0, 0, c.width, c.height);

		setInterval(draw, 33);
	}
}


$(document).ready(function () {
	ctx.fillStyle = "rgba(0,0,0,1)"; //getColor();
	ctx.fillRect(0, 0, c.width, c.height);

	press_start();
	$("body").keydown(start_pressed);
});
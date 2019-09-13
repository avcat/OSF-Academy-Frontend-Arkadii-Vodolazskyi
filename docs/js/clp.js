function lightOrDark(color) {

    // Variables for red, green, blue values
    var r, g, b, hsp;

    // Check the format of the color, HEX or RGB?
    if (color.match(/^rgb/)) {

        // If HEX --> store the red, green, blue values in separate variables
        color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);

        r = color[1];
        g = color[2];
        b = color[3];
    }
    else {

        // If RGB --> Convert it to HEX: http://gist.github.com/983661
        color = +("0x" + color.slice(1).replace(
        color.length < 5 && /./g, '$&$&'));

        r = color >> 16;
        g = color >> 8 & 255;
        b = color & 255;
    }

    // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
    hsp = Math.sqrt(
    0.299 * (r * r) +
    0.587 * (g * g) +
    0.114 * (b * b)
    );

    // Using the HSP value, determine whether the color is light or dark
    if (hsp>127.5) {

        return 'light';
    }
    else {

        return 'dark';
    }
}

// ====================================

// Interaction for color pick ...............................
let colorBox = document.querySelector("main .pop-items form .color ul.colors");

// Initial states
colorBox.children[0].classList.add("active");

// Add listeners
colorBox.addEventListener("click", (e) => {
	(Array.from(colorBox.children)).forEach(child => {
		child.classList.remove("active");
		child.style.borderColor = "";
	});
	e.target.classList.add("active");

	// Pick contrasting border
	lightOrDark(e.target.style.backgroundColor) === "light" ? e.target.style.borderColor = "#000" : e.target.style.borderColor = "#ccc";
}, true)

// Interaction for slider-arrows ...............................
let arrows = document.querySelectorAll("section.feat-prod .slider-arrows .arrows button");

let arrowScreens = document.querySelectorAll("section.feat-prod .slider-arrows .items .screen");

// Initial states
let focus = 1;
arrowScreens[focus].classList.add("active");

arrows[0].addEventListener("click", () => {

	focus--;
	if (focus < 0) {
		focus = 0;
	}

	arrowScreens.forEach(screen => {
		screen.classList.remove("active");
	});

	arrowScreens[focus].classList.add("active");
});

arrows[1].addEventListener("click", () => {

	focus++;
	if (focus > arrowScreens.length - 1) {
		focus = arrowScreens.length - 1;
	}

	arrowScreens.forEach(screen => {
		screen.classList.remove("active");
	});

	arrowScreens[focus].classList.add("active");
});

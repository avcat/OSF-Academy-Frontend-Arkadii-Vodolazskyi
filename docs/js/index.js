// Interaction for slider-dots

let dots = document.querySelectorAll("section.slider .slider-dots ul.dots li button");

let dotsScreens = document.querySelectorAll("section.slider .slider-dots div.img");

for (let i = 0; i < dots.length; i++) {

	dots[i].addEventListener("click", () => {
		dots.forEach(dot => {
			dot.classList.remove("active");
		});
		dotsScreens.forEach(screen => {
			screen.classList.remove("active");
		});

		dots[i].classList.add("active");
		dotsScreens[i].classList.add("active");
	});

}

// Interaction for slider-arrows
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

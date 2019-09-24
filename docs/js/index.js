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


// Function to import data from JSON ............................
function getData(url, callback) {

	fetch(url)
	.then(res => res.json())
	.then(data => callback(data));

};


// Buy now ..............................................

const cart = document.querySelector("header nav ul.nav-manage a#cart > span");
getData("../json/amounts.json", (data) => {
	cart.innerText = data.amounts.cartAmount;
});

const buyNow = document.querySelector("section.pop-items div.items div.item div.paired button");

buyNow.addEventListener("click", () => {
	// ! Here to change JSON
	getData("../json/amounts.json", (data) => {
		data.amounts.cartAmount++;
		cart.innerText = data.amounts.cartAmount;
		console.log("JSON cartAmount is now: " + data.amounts.cartAmount);
	});
}, true);




// Add to cart
let addToCart = document.querySelectorAll("section.pop-items button.addToCart");

addToCart.forEach(button => {

	button.addEventListener("click", () => {
		// ! Here to change JSON
		cartAmount++;

		getData("../json/amounts.json", (data) => {
			cart.innerText = data.amounts.cartAmount;
		});
	}, true);

});



// Add to wishlist
const wishlist = document.querySelector("header nav ul.nav-manage a#wishlist > span");
getData("../json/amounts.json", (data) => {
	wishlist.innerText = data.amounts.wishlistAmount;
});

let addToWishlist = document.querySelectorAll("section.pop-items button.addToWishlist");

addToWishlist.forEach(button => {

	button.addEventListener("click", () => {
		// ! Here to change JSON
		wishlistAmount++;

		getData("../json/amounts.json", (data) => {
			wishlist.innerText = data.amounts.wishlistAmount;
		});
	}, true);

});
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
(function () {
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
	}, true);
})();


// Interaction for slider-arrows ..........................
document.addEventListener("DOMContentLoaded", () => {

	let arrowsLoaded = 0;

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



		// ---------------- Pre-load with JSON ----------------

		// Find slider's screen box
		const arrowBox = document.querySelector("section.feat-prod div.slider-arrows div.items");

		if (focus === arrowScreens.length - 1) {

			// Load JSON
			firebase.database().ref("/items").once('value', snap => {

				// How many items are loaded already
				if (arrowsLoaded < snap.val().length) {

					// Create screen
					let newScreen = document.createElement("div");
					newScreen.classList.add("screen");

					for (let i = arrowsLoaded; i < arrowsLoaded + 4; i++) {

						if (i < snap.val().length) {

							// Create item of the screen
							let futureArrowItem = futureArrowItems(
								snap.val()[i].image,
								snap.val()[i].name,
								snap.val()[i].tag
							);

							// Append item to the screen
							newScreen.append(futureArrowItem);

						}

						// Add screen to the box
						arrowBox.append(newScreen);

						// Refresh arrow screens
						arrowScreens = document.querySelectorAll("section.feat-prod .slider-arrows .items .screen");
					}

				};

			});

			arrowsLoaded += 4;

		}; // ---------------- end of pre-load with JSON ----------------

	}); // ---------------- end of event listener ----------------

}); // ---------------- end of document.onload listener ----------------

// Forming new screen for the slider-arrows
function futureArrowItems (imageURL, name, tag) {

	let item = document.createElement("div");
	item.classList.add("item");

	let itemImage = document.createElement("div");
	itemImage.classList.add("img");
	itemImage.style.backgroundImage = `url(${imageURL})`;
	item.append(itemImage);

	let itemName = document.createElement("h4");
	itemName.classList.add("name");
	itemName.innerText = name;
	item.append(itemName);

	let itemTag = document.createElement("a");
	itemTag.innerText = tag;
	item.append(itemTag);

	return item;
}

// Add to cart buttons .....................................
(function () {
	let addToCart = document.querySelectorAll("section.pop-items button.addToCart");

	addToCart.forEach(button => {

		button.addEventListener("click", () => {

			addItem("cart");

		}, true);

	});
})();

// Add to wishlist buttons .................................
(function () {
	let addToWishlist = document.querySelectorAll("section.pop-items button.addToWishlist");

	addToWishlist.forEach(button => {

		button.addEventListener("click", () => {

			addItem("wishlist");

		}, true);

	});
})();


// Load more .................................................
(function () {
	const loadMoreBtn = document.getElementById("loadMore");

	let itemsShowed = 16;
	// Items showed depends on the screen width
	if (window.innerWidth <= 440) {
		itemsShowed = 4;
	}

	let itemsLoaded = 0;

	loadMoreBtn.addEventListener("click" , () => {

		// Find the item box
		const popItemsBox = document.querySelector("section.pop-items div.items");

		// Find all the items
		let popItems = popItemsBox.children;

		// Firstly, show other items
		if (itemsShowed < 16) {

			// Show next 4 items
			for (let i = itemsShowed; i < itemsShowed + 4; i++) {
				popItems[i].style.display = "block";
			}

			itemsShowed += 4;
		}

		// And, if all the items are showed already, we can download more items
		else if (itemsShowed >= 16) {

			// Load JSON
			firebase.database().ref("/items")
			.once('value', snap => {

				// How many items are loaded already
				if (itemsLoaded < snap.val().length) {

					for (let i = itemsLoaded; i < itemsLoaded + 4; i++) {

						if (i < snap.val().length) {
							// Form HTML
							let newItem = createItem(
								snap.val()[i].image,
								snap.val()[i].name,
								snap.val()[i].price
							);

							newItem.style.display = "block";

							popItemsBox.append(newItem);
						}
						else {
							loadMoreBtn.innerText = "All items are loaded"
							loadMoreBtn.classList.remove("enabled");
							break;
						}
					}

					itemsLoaded += 4;
				}

			});

		}

	}, true);

})();


function addItem (branchName) {

	// Get items count to form new id
	firebase.database().ref(`/amounts/${branchName}`)
	.once('value', snap => {

		let newID = 1;

		Object.values(snap.val()).forEach(object => {
			newID++;
		});

		firebase.database().ref(`/amounts/${branchName}/${newID}`)
		.update({
			image: "https://firebasestorage.googleapis.com/v0/b/osf-academy-frontend.appspot.com/o/items%2Fitem2.jpg?alt=media&token=765a5d78-8358-43dc-baa0-438b4570f127",
			name: "Hay - About A Lounge Chair AAL 93",
			price: "659.55"
		});

		// Update HTML
		firebase.database().ref(`/amounts/${branchName}`)
		.once('value', snap => {
			if (branchName === "cart") {
				cartSpan.innerText = newID++;
			} else if (branchName === "wishlist") {
				wishlistSpan.innerText = newID++;
			}
		});

	});

}

// Create item
function createItem (imageURL, name, price) {

	let item = document.createElement("div");
	item.classList.add("item");

	let itemImage = document.createElement("div");
	itemImage.classList.add("img");
	itemImage.style.backgroundImage = `url(${imageURL})`;
	item.append(itemImage);

	let itemName = document.createElement("h4");
	itemName.classList.add("name");
	itemName.innerText = name;
	item.append(itemName);

	let itemPrice = document.createElement("span");
	itemPrice.innerText = "$ " + price;
	item.append(itemPrice);


	let itemOverlay = document.createElement("div");
	itemOverlay.classList.add("overlay");

	let itemCart = document.createElement("button");
	itemCart.classList.add("addToCart");
	let cartImage =  document.createElement("img");
	cartImage.src = "img/icons/plus.svg";
	itemCart.append(cartImage);
	itemOverlay.append(itemCart);

	let itemWishlist = document.createElement("button");
	itemWishlist.classList.add("addToWishlist");
	let wishlistImage =  document.createElement("img");
	wishlistImage.src = "img/icons/heart-filled.svg";
	itemWishlist.append(wishlistImage);
	itemOverlay.append(itemWishlist);


	item.append(itemOverlay);

	return item;
}
// Interaction for slider-dots ..............................
(function () {
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

// Buy now button ..............................................
(function () {
	const buyNow = document.querySelector("section.pop-items div.items div.item div.paired button");

	buyNow.addEventListener("click", () => {

		addItem("cart");

	}, true);
})();


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

// Load more .................................................
(function () {
	const loadMoreBtn = document.getElementById("loadMore");

	let itemsLoaded = 0;

	loadMoreBtn.addEventListener("click" , () => {

		// Find the item box
		const popItems = document.querySelector("section.pop-items div.items");

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

						popItems.append(newItem);
					} else {
						loadMoreBtn.innerText = "All items are loaded"
						loadMoreBtn.classList.remove("enabled");
						break;
					}
				}

				itemsLoaded += 4;
			}

		});

	}, true);
})();


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


// ======================= Future dots =======================
// (on small screen we'll make slider out of popar items section)

let futureDots = null;

window.addEventListener("resize", () => {

	makeFutureSlider();

}, true);

window.addEventListener("load", () => {

	makeFutureSlider();

}, true);

function makeFutureSlider () {

	// If screen width became small and we don't have items for slider yet
	if (window.innerWidth <= 440 && futureDots === null) {

		// Find Future slider box
		const futureDotsBox = document.querySelector("section.pop-items ul.future-dots");

		// Find first 5 items
		let futureItems = document.querySelectorAll("section.pop-items div.items div.item:nth-child(-n+5)");

		// Initial state - first item is active
		futureItems[0].classList.add("active");

		// For each...
		for (let i = 0; i < futureItems.length; i++) {

			// create a dot
			let dot = document.createElement("li");

			// append it to the futureDotsBox
			futureDotsBox.append(dot);
		}

		// Get pointers to the dots
		futureDots = document.querySelectorAll("section.pop-items ul.future-dots > li");

		// Initial state - first dot is active
		futureDots[0].classList.add("active");

		// Add event listeners to the dots
		for (let i = 0; i < futureItems.length; i++) {

			futureDots[i].addEventListener("click", () => {

				futureDots.forEach(dot => {
					dot.classList.remove("active");
				});
				futureItems.forEach(item => {
					item.classList.remove("active");
				});

				futureDots[i].classList.add("active");
				futureItems[i].classList.add("active");

			}, true);
		}

	}

}
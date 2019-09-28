// Tabs interaction ..............................
(function () {

	let btns = document.querySelectorAll("section.product .info ul > li");
	let tabs = document.querySelectorAll("section.product .info .tab-box .tab");

	for (let i = 0; i < btns.length; i++) {
		btns[i].addEventListener("click", () => {
			btns.forEach(btn => {
				btn.classList.remove("active");
			});
			tabs.forEach(tab => {
				tab.classList.remove("active");
			});

			btns[i].classList.add("active");
			tabs[i].classList.add("active");
		}, true);
	}

})();


// Product images interaction ..............................
(function () {

	const bigImages = document.querySelectorAll("section.product div.overview div.large img");
	const smallImages = document.querySelectorAll("section.product div.overview div.small img");

	// Small -> Big

	for (let i = 0; i < smallImages.length; i++) {
		smallImages[i].addEventListener("click", () => {
			smallImages.forEach(btn => {
				btn.classList.remove("active");
			});
			bigImages.forEach(tab => {
				tab.classList.remove("active");
			});

			smallImages[i].classList.add("active");
			bigImages[i].classList.add("active");
		}, true);
	}

	// Big -> Full
	let overlay = document.getElementById("overlay");

	for (let i = 0; i < bigImages.length; i++) {

		bigImages[i].addEventListener("click", () => {

			bigImages[i].classList.contains("full") ? (
				bigImages[i].classList.remove("full"),
				overlay.classList.remove("active"),
				document.body.classList.remove("noscroll")
			) : (
				document.body.classList.add("noscroll"),
				overlay.classList.add("active"),
				bigImages[i].classList.add("full")
			);

		}, true);

	}

	overlay.addEventListener("click", () => {
		bigImages.forEach(bigImage => {
			bigImage.classList.remove("full");
		});

		document.body.classList.remove("noscroll");
		overlay.classList.remove("active");
	}, true);

})();


// Read more interaction ..............................
(function () {

	const text = document.querySelector("section.product div.overview div.about p");

	const originalHeight = text.clientHeight;

	if (originalHeight > 100) {

		text.style.height = "7.5rem";

		// Create "Read more" button, then append to p
		let more = document.createElement("button");
		more.classList.add("more");
		more.innerText = "Read more";

		// Find the right place for button
		const share = document.querySelector("section.product div.overview div.about div.share");
		// Find the parent element to insert button
		const parent = share.parentNode;

		parent.insertBefore(more, share);

		// Add event listener
		more.addEventListener("click", () => {
			text.style.height = originalHeight + "px";
		}, true);
	}

})();

const colorSelect = document.querySelector("section.product div.overview div.about div.colorpick > select");

// Color select ..............................
(function () {

	const colors = document.querySelectorAll("section.product div.overview div.about div.colorpick > ul > li");

	colorSelect.addEventListener("change", () => {

		colors.forEach(color => {
			color.classList.remove("active");
		});

		colors[colorSelect.selectedIndex].classList.add("active");
	});

})();

const amount = document.querySelector("section.product div.overview div.about div.add div.amountpick > input");

// Amount select ..............................
(function () {

	const minus = document.querySelector("section.product div.overview div.about div.add div.amountpick > button.minus");
	const plus = document.querySelector("section.product div.overview div.about div.add div.amountpick > button.plus");

	// Initial value
	amount.value = 1;

	// Interaction and amount validate
	minus.addEventListener("click", () => {
		amount.focus();
		amount.value <= 1 ? amount.value = 1 : amount.value--;
	}, true);
	plus.addEventListener("click", () => {
		amount.focus();
		amount.value >= 99 ? amount.value = 9 : amount.value++;
	}, true);

	// Numbers validate - no need since it's input "number"

})();

// Add to cart this item ..............................
(function () {

	// Find button
	const addThisItem = document.getElementById("addThisItem");

	addThisItem.addEventListener("click", () => {

		console.log("amount.value", amount.value);

		// Get items count to form new id
		firebase.database().ref(`/amounts/cart`)
		.once('value', snap => {

			for (let i = 0; i < amount.value; i++) {

				let newID = snap.val().length;

				firebase.database().ref(`/amounts/cart/${newID}`)
				.update({
					image: colorSelect.value === "Dark Grey" ? "https://firebasestorage.googleapis.com/v0/b/osf-academy-frontend.appspot.com/o/pdp%2FPG.10216885.JJ169XX.PZ-small.jpg?alt=media&token=f36eafcb-bc25-4f37-9f9a-f7fe987d9e9e" : "https://firebasestorage.googleapis.com/v0/b/osf-academy-frontend.appspot.com/o/pdp%2FPG.10216885.JJ8UTXX.PZ-small.jpg?alt=media&token=af8a6fcd-dc28-44e1-8116-39d671d2c71b",
					name: document.querySelector("section.breadcrumbs h2").innerText,
					price: document.querySelector("section.product div.overview div.about span.price").innerText
				});
			}

		});

		// Update HTML
		firebase.database().ref(`/amounts/cart`)
		.once('value', snap => {
			cartSpan.innerText = snap.val().length;
		});

	}, true);

})();


// Print Page .............................
(function () {

	const print = document.getElementById("print");

	print.addEventListener("click", () => {
		text.style.height = originalHeight + "px";
		window.print();
		text.style.height = "7.5rem";
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

		let newID = snap.val().length;

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
				cartSpan.innerText = snap.val().length;
			} else if (branchName === "wishlist") {
				wishlistSpan.innerText = snap.val().length;
			}
		});

	});

}

// Make future images slider .................................
let futureImages = null;

// Make future items slider .................................
let futureDots = null;

window.addEventListener("resize", () => {

	makeFutureSlider();
	makeFutureImages();

}, true);

window.addEventListener("load", () => {

	makeFutureSlider();
	makeFutureImages();

}, true);

function makeFutureSlider () {

	// If screen width became small and we don't have items for slider yet
	if (window.innerWidth <= 440 && futureDots === null) {

		// Find Future slider box
		const futureDotsBox = document.querySelector("section.pop-items ul#popular.future-dots");

		// Find items
		let futureItems = document.querySelectorAll("section.pop-items div.items div.item");

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
		futureDots = document.querySelectorAll("section.pop-items ul#popular.future-dots > li");

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

function makeFutureImages () {

	// If screen width became small and we don't have items for slider yet
	if (window.innerWidth <= 440 && futureImages === null) {

		// Find Future slider box
		const futureDotsBox = document.querySelector("section.product ul#images.future-dots");

		// Find items
		let futureItems = document.querySelectorAll("section.product div.overview div.small img");

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
		futureImages = document.querySelectorAll("section.product ul#images.future-dots > li");

		// Initial state - first dot is active
		futureImages[0].classList.add("active");

		// Add event listeners to the dots
		for (let i = 0; i < futureItems.length; i++) {

			futureImages[i].addEventListener("click", () => {

				futureImages.forEach(dot => {
					dot.classList.remove("active");
				});
				futureItems.forEach(item => {
					item.classList.remove("active");
				});

				futureImages[i].classList.add("active");
				futureItems[i].classList.add("active");

			}, true);
		}

	}

}
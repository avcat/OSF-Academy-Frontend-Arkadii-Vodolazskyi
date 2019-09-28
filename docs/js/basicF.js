
// ========================== amounts.js ==========================
// Find elements, that will show the amounts
const wishlistSpan = document.getElementById("wishlistAmount");
const cartSpan = document.getElementById("cartAmount");

(function () {

	// Get wishlistAmount from JSON, show it with span
	firebase.database().ref("/amounts/wishlist") // Link to the data
	.once('value', snap => {

		wishlistSpan.innerText = snap.val().length; // Get data

	});

	// Get cartAmount from JSON, show it with span
	firebase.database().ref("/amounts/cart")
	.once('value', snap => {

		cartSpan.innerText = snap.val().length;

	});

})();


// ========================== cookies.js ==========================
(function () {

	// HTML needed: Overlay + Cookies Modal

	document.addEventListener("DOMContentLoaded", () => {

		if (localStorage.getItem("Cookies accepted") !== "true") {

			// Get pointers
			let overlay = document.getElementById("overlay");
			const cookiesWindow = document.getElementById("cookies");
			const closeCookies = document.getElementById("close-cookies");
			const acceptCookies = document.getElementById("accept-cookies");

			// Show cookies modal window in some seconds
			setTimeout(() => {

				overlay.classList.add("active");
				document.body.classList.add("noscroll");
				cookiesWindow.classList.add("active");

			}, 1000);

			// Close cookies button
			closeCookies.addEventListener("click", () => {

				cookiesWindow.classList.remove("active");
				overlay.classList.remove("active");
				document.body.classList.remove("noscroll");

			}, true);

			// Accept cookies button
			acceptCookies.addEventListener("click", () => {

				localStorage.setItem("Cookies accepted", "true");

				cookiesWindow.classList.remove("active");
				overlay.classList.remove("active");
				document.body.classList.remove("noscroll");

			}, true);

		}

	});

})();


// ========================== signin.js ==========================

// HTML needed: Overlay + Sign In Modal + Header

document.addEventListener("DOMContentLoaded", () => {

	// Show/hide modal window ........................................

	// Find overlay
	const overlay = document.getElementById("overlay");

	// Find signin form
	const signinForm = document.getElementById("signinForm");

	// Find open modal button
	const openSignin = document.getElementById("openSignin");

	// Find login button
	const login = document.getElementById("login");

	// Open signin modal
	openSignin.addEventListener("click", () => {

		overlay.classList.add("active");
		document.body.classList.add("noscroll");
		signinForm.classList.add("active");

	}, true);


	// Validation inputs and submitting ...............................

	const emailField = document.querySelector("form#signinForm input[type='email']");
	const passwordField = document.querySelector("form#signinForm input[type='password']");

	// Close signin modal with submit button if valid
	login.addEventListener("click", () => {

		if (emailField.validity.valid === true && passwordField.validity.valid === true) {

			overlay.classList.remove("active");
			document.body.classList.remove("noscroll");
			signinForm.classList.remove("active");

		}

	}, true);

	// Close signin modal with click on overlay
	overlay.addEventListener("click", () => {

		overlay.classList.remove("active");
		document.body.classList.remove("noscroll");
		signinForm.classList.remove("active");

	}, true);


	// Show/hide password ...................................
	const showPassword = document.querySelector("form#signinForm span.showPassword");

	showPassword.addEventListener("click", () => {

		passwordField.type === "password" ? passwordField.type = "text" : passwordField.type = "password";

	}, true);

});

// ========================== hamburger.js ==========================

// Find hamburger menu
const hambBtn = document.getElementById("hamburger");

// Find nav-main
const navMain = document.querySelector("header nav ul.nav-main");

// Event listener for Hamburger is added below

// ========================== services-expand.js ==========================

// Find Services tab
const servicesTab = document.querySelector("header nav ul.nav-main li.menu-open > h2");

// Find its span
const servicesSpan = document.querySelector("header nav ul.nav-main li.menu-open > h2 > span.arrow-down");

// Find Services menu
const servicesMenu = document.querySelector("header nav ul.nav-main li.menu-open div.menu");

// ====================== prod-cat-expand.js ======================

// Find Prod-cat tab
const prodCatTab = document.querySelector("header nav ul.nav-main li.menu-open div.menu div.prod-cat > h3");

// Find its span
const prodCatSpan = document.querySelector("header nav ul.nav-main li.menu-open div.menu div.prod-cat > h3 > span.arrow-down");

// Find Prod-cat menu
const prodCatMenu = document.querySelector("header nav ul.nav-main li.menu-open div.menu div.prod-cat > div");

// ====================== sale-expand.js ======================

// Find Sale tab
const saleTab = document.querySelector("header nav ul.nav-main li.menu-open div.menu div.sale > h3");

// Find its span
const saleSpan = document.querySelector("header nav ul.nav-main li.menu-open div.menu div.sale > h3 > span.arrow-down");

// Find Sale menu
const saleMenu = document.querySelector("header nav ul.nav-main li.menu-open div.menu div.sale > ul");

// ------ event listeners ------

// Event listener: click on Prod-cat tab - show/hide Prod-cat menu
prodCatTab.addEventListener("click", () => {

	if (saleMenu.classList.contains("active") === true) {
		saleMenu.classList.remove("active");
		saleSpan.classList.remove("active");
	}

	prodCatMenu.classList.toggle("active");
	prodCatSpan.classList.toggle("active");

}, false);

// Event listener: click on Sale tab - show/hide Sale menu
saleTab.addEventListener("click", () => {

	if (prodCatMenu.classList.contains("active") === true) {
		prodCatMenu.classList.remove("active");
		prodCatSpan.classList.remove("active");
	}

	saleMenu.classList.toggle("active");
	saleSpan.classList.toggle("active");

}, false);

// Event listener: click on Services tab - show/hide Services menu
servicesTab.addEventListener("click", () => {

	if (servicesMenu.classList.contains("active") === true) {
		prodCatMenu.classList.remove("active");
		prodCatSpan.classList.remove("active");
		saleMenu.classList.remove("active");
		saleSpan.classList.remove("active");
	}

	servicesMenu.classList.toggle("active");
	servicesSpan.classList.toggle("active");

}, true);

// Event listener: click on hamburger - show/hide nav-main
hambBtn.addEventListener("click", () => {

	if (navMain.classList.contains("active") === true) {

		// Remove all states from inner menus
		prodCatMenu.classList.remove("active");
		prodCatSpan.classList.remove("active");
		saleMenu.classList.remove("active");
		saleSpan.classList.remove("active");
		servicesMenu.classList.remove("active");
		servicesSpan.classList.remove("active");

		navMain.classList.remove("active");
		hambBtn.children[0].classList.add("active");
		hambBtn.children[1].classList.remove("active");

	} else if (navMain.classList.contains("active") === false) {

		navMain.classList.add("active");
		hambBtn.children[0].classList.remove("active");
		hambBtn.children[1].classList.add("active");

	}

}, true);

// ====================== footer-expand.js ======================

document.addEventListener("DOMContentLoaded", () => {
		// Find all Footer tabs
	const footerTabs = document.querySelectorAll("footer div.wrapper > div > h3");

	// Find their spans
	const footerSpans = document.querySelectorAll("footer div.wrapper > div > h3 > span.arrow-down");

	// Find all Footer menus
	const footerMenus = [
		document.querySelector("footer div.wrapper > div > ul.contact-menu"),
		document.querySelector("footer div.wrapper > div > div.categories-menu"),
		document.querySelector("footer div.wrapper > div > ul.about-menu"),
	];

	// Events listeners: click on tab i - open menu i
	for (let i = 0; i < footerTabs.length; i++) {

		footerTabs[i].addEventListener("click", () => {

			if (footerMenus[i].classList.contains("active") === false) {
				footerMenus.forEach(footerMenu => {
					footerMenu.classList.remove("active");
				});
				footerSpans.forEach(footerSpan => {
					footerSpan.classList.remove("active");
				});

				footerMenus[i].classList.add("active");
				footerSpans[i].classList.add("active");
			} else {
				footerMenus.forEach(footerMenu => {
					footerMenu.classList.remove("active");
				});
				footerSpans.forEach(footerSpan => {
					footerSpan.classList.remove("active");
				});
			}

		}, true);

	}

	// ========================== year.js ==========================

	// Inject current year to the footer ...............................
	document.getElementById("year").innerText = new Date().getFullYear();
});

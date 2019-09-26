
// ========================== amounts.js ==========================

// Find elements, that will show the amounts
const wishlistSpan = document.getElementById("wishlistAmount");
const cartSpan = document.getElementById("cartAmount");

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

// ========================== cookies.js ==========================

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

// ========================== year.js ==========================

// Inject current year to the footer ...............................
document.getElementById("year").innerText = new Date().getFullYear();
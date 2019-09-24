// HTML needed: Overlay + Sign In Modal + Header

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


// Other functionality ========================================

// Inject current year to the footer ...............................
document.getElementById("year").innerText = new Date().getFullYear();



// HTML needed: Overlay + Cookies Modal

document.addEventListener("DOMContentLoaded", () => {

	if (localStorage.getItem("Cookies accepted") !== "true") {

		console.log(localStorage.getItem("Cookies accepted"));
		console.log(localStorage.getItem("Cookies accepted") !== "true");

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

// Set deadline ------------------------------------------
const deadline = new Date("sep 30, 2019 12:00:00").getTime();

// Find tags to write in
const spans = document.querySelectorAll("section.countdown div.release span");

// Renew every second
let x = setInterval(() => {

	// Calculate remaining time
	let now = new Date().getTime();

	let remaining = deadline - now;

	let months = Math.floor(remaining / (1000 * 60 * 60 * 24 * 30.5));
	let days = Math.floor(remaining / (1000 * 60 * 60 * 24));
	let hours = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	let minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
	let seconds = Math.floor((remaining % (1000 * 60)) / 1000);

	// Add zeros and show remaining time ---------------------

	let time = [months, days, hours, minutes, seconds];

	for (let i = 0; i < time.length; i++) {

		if (time[i] >= 0 && time[i] < 10) {
			spans[i].innerText = "0" + time[i].toString();
		} else {
			spans[i].innerText = time[i].toString();
		}

	}

}, 1000);


// Subscribe ==========================================

const emailSubscribe = document.getElementById("email");
const subscribeButton = document.getElementById("subscribe");

subscribeButton.addEventListener("click", (e) => {

	e.preventDefault();

	// Checking email validity
	if (emailSubscribe.validity.valid === true) {

		// Get emails count to form new id
		firebase.database().ref("/emails")
		.once('value', snap => {

			let newID = snap.val().length;

			firebase.database().ref(`/emails/${newID}`)
			.update({
				email: emailSubscribe.value
			});

		});

		alert(`Subscribed with email ${emailSubscribe.value}. Thank you!`);

	}
	else {
		alert("Email is not valid.");
	}

}, true);

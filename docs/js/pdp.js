// Tabs interaction ..............................

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

// Product images interaction ..............................

let bigImages = document.querySelectorAll("section.product div.overview div.large img");
let smallImages = document.querySelectorAll("section.product div.overview div.small img");

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
			overlay.classList.remove("active")
		) : (
			overlay.classList.add("active"),
			bigImages[i].classList.add("full")
		);
	}, true);
}

overlay.addEventListener("click", () => {
	bigImages.forEach(bigImage => {
		bigImage.classList.remove("full");
	});

	overlay.classList.remove("active");
}, true);


// Read more interaction ..............................

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
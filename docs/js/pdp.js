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
	},true);
}
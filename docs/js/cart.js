// Amount select ..............................
let amount = document.querySelectorAll("section.cart div.items div.item div.amountpick > input");
let minus = document.querySelectorAll("section.cart div.items div.item div.amountpick > button.minus");
let plus = document.querySelectorAll("section.cart div.items div.item div.amountpick > button.plus");

// Interaction and amount validate
for (let i = 0; i < amount.length; i++) {

	// Initial value
	amount[i].value = 1;

	// Add listeners
	minus[i].addEventListener("click", () => {
		amount[i].focus();
		amount[i].value <= 1 ? amount[i].value = 1 : amount[i].value--;
	}, true);
	plus[i].addEventListener("click", () => {
		amount[i].focus();
		amount[i].value >= 99 ? amount[i].value = 9 : amount[i].value++;
	}, true);

}


// ** Delete item ...................................................

// // Fund all needed elements

// // Parent node
// let itemBox = document.querySelector("section.cart div.items");

// // Items
// let items = itemBox.children;

// // Delete buttons
// let deletes = [];
// for (let i = 0; i < items.length; i++) {
// 	deletes.push(
// 		items[i].querySelector("div.delete")
// 	);
// }

// // Add listeners to delete buttons
// for (let i = 0; i < deletes.length; i++) {
// 	deletes[i].addEventListener("click", () => {
// 		itemBox.removeChild(items[i]);
// 	}, true);
// }

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


// Your web app's Firebase configuration ==================
var firebaseConfig = {
	apiKey: "AIzaSyBVToMeDDxYgASRBfGc3y8yiRPIBh_H4GI",
	authDomain: "osf-academy-frontend.firebaseapp.com",
	databaseURL: "https://osf-academy-frontend.firebaseio.com",
	projectId: "osf-academy-frontend",
	storageBucket: "https://osf-academy-frontend.firebaseio.com/",
	messagingSenderId: "592176681003",
	appId: "1:592176681003:web:da48f623c71e95449e1a6e"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// =========================================================


// Function to import data from JSON ............................
function getData(fileName, callback) {

	fetch(`https://osf-academy-frontend.firebaseio.com/${fileName}.json`, {
		method: "GET"
	})
	.then(res => res.json())
	.then(data => callback(data));

};

// Get data from GitHub JSON
let received = getData("amounts",
	data => {
		console.log("Before changing: ", data);
	}
);


// POST request

function postData(filename, postTheData) {

	console.log("Trying to post: ", postTheData);

	fetch(`https://osf-academy-frontend.firebaseio.com/${filename}.json`, {
		method: "POST",
		body: JSON.stringify(postTheData)
	}).then(
		console.log("Finished POST.")
	);

}

postData("amounts", {
		sthAmount: 3
	}
);

received2 = getData("amounts",
	data => {
		console.log("After changing: ", data);
	}
);
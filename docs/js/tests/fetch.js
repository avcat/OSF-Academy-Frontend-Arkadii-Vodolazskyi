
// Function to import data from JSON ............................
function getData(fileName, callback) {

	fetch(
		`https://raw.githubusercontent.com/ArkadiiVodolazskyi/OSF-Academy-Frontend-Arkadii-Vodolazskyi/master/docs/json/${fileName}.json`
	)
	.then(res => res.json())
	.then(data => callback(data));

};

// Get data from GitHub JSON
let received = getData("amounts",
	data => {
		console.log("Before changing: ", data);

		return data; // - No data outside
	}
);


// POST request

postTheData = {
	"sthAmount": 3
}

function postData(filename, postTheData) {

	console.log("Trying to post: ", postTheData);

	fetch(`https://raw.githubusercontent.com/ArkadiiVodolazskyi/OSF-Academy-Frontend-Arkadii-Vodolazskyi/master/docs/json/${filename}.json`, {
		method: "POST",
		body: JSON.stringify(postTheData),
		headers: {
			"Contents-Type": "application/json"
		}
	}).then(res => res.json())
	.then(response => console.log('Успех:', JSON.stringify(response)))
	.catch(error => console.error('Ошибка:', error));

	console.log("Finished POST.");

}


postData("amounts", postTheData);


// Change GitHub JSON
let received2 = getData("amounts",
	data => {
		console.log("After changing: ", data);
	}
);
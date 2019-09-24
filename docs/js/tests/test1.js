
// Import Node JS File System package
let fs = require("fs");

// Get the data from file and parse it (syncronous) - actally stores data
let amounts = JSON.parse(
	fs.readFileSync("../json/amounts.json")
);

// Get the data from file and parse it (asyncronous) - allows to works with data only with callback
let amounts2 = fs.readFile("../json/amounts.json", "utf8", (err, data) => {
	if (err) throw err;
	return JSON.parse(data); // Won't work
});

console.log(amounts);
console.log(amounts2);
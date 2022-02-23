import { getAPI_URL } from "./config.js";
import { weatherHTML } from "./html_template.js";

//Assign variables to HTML elements
const place = document.getElementById("place");
const button = document.getElementById("button");
const weatherContainer = document.getElementById("weatherContainer");
let weatherData;

//Run getData function on button click
button.addEventListener("click", () => {
	getData();
});

//Run getData function with ENTER key
place.addEventListener("keydown", (e) => {
	if (e.keyCode === 13) {
		getData();
	}
});

//Retrieve data from API URL and save into a variable
async function getData() {
	try {
		const result = await axios.get(getAPI_URL(place.value));
		weatherData = result.data.list;
		onWeatherData(weatherData);
	} catch (error) {
		console.error(error);
	}
}

//For loop to determine number of times we access the API data. It is also used loop ove timeArr in order to make dynamic times and then insert the HTML into the DOM
function onWeatherData(weatherData) {
	const timeArr = ["Now", "In 3 Hours", "In 6 Hours", "In 9 Hours"];
	let holder = "";
	for (let i = 0; i < 4; i++) {
		timeArr[i];
		holder += `<div id="holder${i}" class="holder">
						<h2>${timeArr[i]}</h2>
						${weatherHTML(weatherData[i])}
					</div>`;
	}
	weatherContainer.innerHTML = holder;
}

import { getAPI_URL } from "./config.js";
import { weatherHTML } from "./html_template.js";

//Assign variables to HTML elements
const place = document.getElementById("place");
const button = document.getElementById("button");
const title = document.getElementById("title");
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

// A failsafe incase the user has browser location switched off
const getLocation = () => {
	navigator.geolocation.getCurrentPosition(success, error);
};
const error = (reason) => {
	title.innerHTML = `<h3>${reason.message}. Please enable Geolocation and reload the page.</h3>`;
};
const success = (position) => {};
getLocation();

//Retrieve data from API URL and save into a variable or informs the user what and why there is a problem
async function getData() {
	try {
		const result = await axios.get(getAPI_URL(place.value));
		weatherData = result.data.list;
		onWeatherData(weatherData);
	} catch (error) {
		console.log(error);
		if (error.response) {
			title.innerHTML = `<h3>Error code: ${error.response.status}. Error status: ${error.response.statusText}. Please reload the page and enter a valid Location</h3>`;
			weatherContainer.innerHTML = "";
		} else {
			title.innerHTML = "<h3>API is down</h3>";
		}
	}
}

//For loop to determine number of times we access the API data. It is also used loop over timeArr in order to make dynamic times and then insert the HTML into the DOM
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

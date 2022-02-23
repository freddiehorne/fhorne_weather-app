import { weatherHTML, getAPI_URL } from "./config.js";

const place = document.getElementById("place");
const button = document.getElementById("button");
const weatherContainer = document.getElementById("weatherContainer");
let weatherData;

button.addEventListener("click", () => {
	getData();
});

place.addEventListener("keydown", (e) => {
	if (e.keyCode === 13) {
		getData();
	}
});

async function getData() {
	try {
		const result = await axios.get(getAPI_URL(place.value));
		weatherData = result.data.list;
		onWeatherData(weatherData);
	} catch (error) {
		console.error(error);
	}
}

function onWeatherData(weatherData) {
	const timeArr = ["Now", "In 3 Hours", "In 6 Hours"];
	let holder = "";
	for (let i = 0; i < timeArr.length; i++) {
		const el = timeArr[i];
		holder += `<div id="holder${i}" class="holder">
						<h2>${timeArr[i]}</h2>
						${weatherHTML(weatherData[i])}
					</div>`;
	}
	weatherContainer.innerHTML = holder;
}

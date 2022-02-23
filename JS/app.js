const div1 = document.getElementById("div1");
const div2 = document.getElementById("div2");
const div3 = document.getElementById("div3");
const place = document.getElementById("place");
// const button = document.getElementById("goButton");
let data;
let inputValue;

let weatherData;

async function getData() {
	try {
		place.addEventListener("input", async (e) => {
			const dataURL = `https://api.openweathermap.org/data/2.5/forecast?q=${e.target.value}&appid=24581586ed3d69ed3183980de6c64e19`;
			const result = await axios.get(dataURL);
			weatherData = result.data;
			console.log(result);
			updateDOM();
		});
	} catch (error) {
		console.log(error);
	}
}
getData();

const updateDOM = () => {
	// const city = weatherData.city.name;

	const temperature = Math.round(weatherData.list[0].main.temp - 273.15); //degC

	const maxTemp = Math.round(weatherData.list[0].main.temp_max - 273.15); //degC
	const minTemp = Math.round(weatherData.list[0].main.temp_min - 273.15); //degC

	const feelsLike = Math.round(weatherData.list[0].main.feels_like - 273.15); //degC

	const clouds = weatherData.list[0].clouds.all; //%

	const windSpeed = Math.round(weatherData.list[0].wind.speed * 2.237); //MPH

	const rainAmount = Math.round(weatherData.list[0].pop * 25.4); //mm

	const sunriseUnix = weatherData.city.sunrise * 1000;

	const sunsetUnix = weatherData.city.sunset * 1000;

	const sunriseDate = new Date(sunriseUnix);
	const sunsetDate = new Date(sunsetUnix);

	let sunriseHour = sunriseDate.getHours();
	if (sunriseDate.getHours() < 10) {
		sunriseHour = `0${sunriseDate.getHours()}`;
	}

	let sunriseMinutes = sunriseDate.getMinutes();
	if (sunriseDate.getMinutes() < 10) {
		sunriseMinutes = `0${sunriseDate.getMinutes()}`;
	}

	const sunsetHour = sunsetDate.getHours();
	const sunsetMinutes = sunsetDate.getMinutes();
	if (sunsetDate.getMinutes() < 10) {
		sunsetMinutes = `0${sunsetDate.getMinutes()}`;
	}

	const sunriseTime = `${sunriseHour}:${sunriseMinutes}`;
	const sunsetTime = `${sunsetHour}:${sunsetMinutes}`;

	div1.append(`Minimum Temperature: ${minTemp}°C`);
	div1.append(`Maximum Temperature: ${maxTemp}°C`);
	div1.append(`Current Temperature: ${temperature}°C`);
	div1.append(`Feels like: ${feelsLike}°C`);

	div2.append(`Expected rain: ${rainAmount}mm`);
	div2.append(`Cloud cover: ${clouds}%`);
	div2.append(`Wind speed: ${windSpeed} mph`);

	if (
		weatherData.city.country === "GB" || //UK
		weatherData.city.country === "IE" || //Ireland
		weatherData.city.country === "PT" //Portugal
	) {
		div3.append(`Sunrise ${sunriseTime}`);
		div3.append(`Sunset ${sunsetTime}`);
	}
};
// button.addEventListener("click", updateDOM);

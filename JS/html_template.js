//Template for the main HTML to be inserted into the DOM
export function weatherHTML(timeSlot) {
	return `
				<h3>${Math.round(timeSlot.main.temp - 273.15)}°C</h3>
	          <img src="/images/${timeSlot.weather[0].icon}.png" alt="${
		timeSlot.weather[0].description
	}">                                 
	          <ul>
               <li>Feels like ${Math.round(
									timeSlot.main.feels_like - 273.15
								)}°C</li>
               <li>Cloud cover ${timeSlot.clouds.all}%</li>
               <li>Rain ${(timeSlot.pop * 25.4).toFixed(1)}mm</li>
               <li>Wind speed ${Math.round(
									timeSlot.wind.speed * 2.237
								)} mph</li>
	          </ul>
          `;
}

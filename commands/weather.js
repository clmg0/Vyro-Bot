//PETICION API CHISTES
async function weatherCity(message, city) {
	const response = await fetch('https://goweather.herokuapp.com/weather/' + city);
	const responseJson = await response.json();
	message.channel.send("Weather in " + city.toUpperCase() + ": " + responseJson.temperature + " " + responseJson.wind + " " + responseJson.description);
}

module.exports = {weatherCity}
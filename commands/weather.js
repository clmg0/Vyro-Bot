//PETICION API CHISTES
async function weatherCity(message, city) {
	const response = await fetch('https://goweather.herokuapp.com/weather/' + city);
		try {
			const responseJson = await response.json();
			message.channel.send("Weather in **" + city.toUpperCase() + "**: " + responseJson.temperature + " " + responseJson.wind + " " + responseJson.description);
		} catch (e) {
			message.channel.send("Can't find city, try writing it in one word.");
		}
	}

module.exports = {weatherCity}
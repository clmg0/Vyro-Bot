//PETICION API CHISTES
async function jokeES(message) {
	const response = await fetch('https://v2.jokeapi.dev/joke/Programming?lang=es&format=txt');
	const responseText = await response.text();
	message.channel.send(responseText);
}

async function jokeEN(message) {
	const response = await fetch('https://v2.jokeapi.dev/joke/Programming?format=txt');
	const responseText = await response.text();
	message.channel.send(responseText);
}

module.exports = {jokeES, jokeEN}
//PETICION API GAME OF THRONES
async function quoteGameOfThrones(message) {
	const response = await fetch('https://api.gameofthronesquotes.xyz/v1/random');
    const responseJson = await response.json();
    const sentence = responseJson.sentence;
    const name = responseJson.character.name;
    const finalMessage = sentence + ' - Author:  ' + name;
    message.channel.send(finalMessage);
	
}

module.exports = {quoteGameOfThrones}
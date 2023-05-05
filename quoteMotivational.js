//PETICION API BREAKING BAD
async function quoteMotivational(message) {
	const response = await fetch('https://api.goprogram.ai/inspiration');
    const responseJson = await response.json();
    const quote = responseJson.quote;
    const author = responseJson.author;
    const finalMessage = quote + ' - Author:  ' + author;
    message.channel.send(finalMessage);
	
}

module.exports = {quoteMotivational}
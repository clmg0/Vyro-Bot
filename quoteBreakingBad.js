//PETICION API BREAKING BAD
async function quoteBreakingBad(message) {
	const response = await fetch('https://api.breakingbadquotes.xyz/v1/quotes');
    const responseJson = await response.json();
    const quote = responseJson[0].quote;
    const author = responseJson[0].author;
    const finalMessage = quote + ' - Author:  ' + author;
    message.channel.send(finalMessage);
	
}

module.exports = {quoteBreakingBad}
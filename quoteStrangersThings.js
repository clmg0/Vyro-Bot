//PETICION API STRANGERS THINGS
async function quoteStrangersThings(message) {
	const response = await fetch('https://strangerthings-quotes.vercel.app/api/quotes');
    const responseJson = await response.json();
    const quote = responseJson[0].quote;
    const author = responseJson[0].author;
    const finalMessage = quote + ' - Author:  ' + author;
    message.channel.send(finalMessage);
	
}

module.exports = {quoteStrangersThings}
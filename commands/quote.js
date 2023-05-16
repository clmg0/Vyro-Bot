//PETICION API BREAKING BAD
async function quoteBreakingBad(message) {
	const response = await fetch('https://api.breakingbadquotes.xyz/v1/quotes');
    const responseJson = await response.json();
    const quote = responseJson[0].quote;
    const author = responseJson[0].author;
    const finalMessage = quote + ' - Author:  ' + author;
    message.channel.send('**'+finalMessage+'**');
	
}

//PETICION API STRANGERS THINGS
async function quoteStrangersThings(message) {
	const response = await fetch('https://strangerthings-quotes.vercel.app/api/quotes');
    const responseJson = await response.json();
    const quote = responseJson[0].quote;
    const author = responseJson[0].author;
    const finalMessage = quote + ' - Author:  ' + author;
    message.channel.send('**'+finalMessage+'**');
	
}

//PETICION API MOTIVATIONAL
async function quoteMotivational(message) {
	const response = await fetch('https://api.goprogram.ai/inspiration');
    const responseJson = await response.json();
    const quote = responseJson.quote;
    const author = responseJson.author;
    const finalMessage = quote + ' - Author:  ' + author;
    message.channel.send('**'+finalMessage+'**');
	
}

//PETICION API LUCIFER
async function quoteLucifer(message) {
	const response = await fetch('https://lucifer-quotes.vercel.app/api/quotes');
    const responseJson = await response.json();
    const quote = responseJson[0].quote;
    const author = responseJson[0].author;
    const finalMessage = quote + ' - Author:  ' + author;
    message.channel.send('**'+finalMessage+'**');
	
}

//PETICION API GAME OF THRONES
async function quoteGameOfThrones(message) {
	const response = await fetch('https://api.gameofthronesquotes.xyz/v1/random');
    const responseJson = await response.json();
    const sentence = responseJson.sentence;
    const name = responseJson.character.name;
    const finalMessage = sentence + ' - Author:  ' + name;
    message.channel.send('**'+finalMessage+'**');
	
}

module.exports = {quoteBreakingBad, quoteStrangersThings, quoteGameOfThrones, quoteLucifer, quoteMotivational}
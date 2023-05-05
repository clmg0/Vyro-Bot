//IMPORTS

const discord = require("discord.js")
const client = new discord.Client({
	intents: [
		"Guilds",
		"GuildMessages",
		"GuildVoiceStates",
		"MessageContent",
		"GuildMembers"
	]
})
const config = require('./config.json')
const { DisTube } = require("distube")

const jokes = require('./commands/jokes.js')
const music = require('./commands/music.js')
const antiSpam = require('./commands/antispam.js')
const quote = require('./commands/quote.js')
const weather = require('./commands/weather.js')

client.DisTube = new DisTube(client, {
	leaveOnStop: true,
	leaveOnFinish: true,
	emitNewSongOnly: true,
	emitAddSongWhenCreatingQueue: false,
	emitAddListWhenCreatingQueue: false,
})

//COMPORTAMIENTO BOT CUANDO SE AÑADEN CANCIONES
client.DisTube.on('playSong', (queue, song) =>
	queue.textChannel.send(
		"Now playing: " + song.name + ". Requested by: " + song.user.username + '\n' + song.url
	)
)

client.DisTube.on('addSong', (queue, song) =>
	queue.textChannel.send(
		"Added to the queue: " + song.name + ". Requested by: " + song.user.username
	)
)

//EVENTO READY
client.on("ready", client => {
	console.log("VyroBOT ONLINE...")
})

//EVENTO MENSAJE DE USUARIO
client.on("messageCreate", message => {
	if (message.author.bot || !message.guild) return;
    
    antiSpam.spamObj.message(message);
    
    if (message.channel.id === config.verifyChannelId) {
        verify.verify(message);
        return;
    }
	
	const prefix = config.prefix;
	const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const queue = client.DisTube.getQueue(message);

    if (!message.content.toLowerCase().startsWith(prefix)) return;

    if (message.member.voice.channel) {
        if (args[0].toLowerCase() === "play" && args.length > 1) {
            music.playSong(message, args, client.DisTube);
        } else if (queue) {
            music.musicQueueFunctions(queue, message, client.DisTube);
        }
        return;
    }

    if (args[0].toLowerCase() === "weather" && args.length > 1) {
        weather.weatherCity(message, args[1]);
        return;
    }

    switch (args[0].toLowerCase()) {
        case "chiste":
            jokes.jokeES(message);
            break;
        case "joke":
            jokes.jokeEN(message);
            break;
        case "bbquote":
            quote.quoteBreakingBad(message);
            break;
        case "gotquote":
            quote.quoteGameOfThrones(message);
            break;
        case "stquote":
            quote.quoteStrangersThings(message);
            break;
        case "luciferquote":
            quote.quoteLucifer(message);
            break;
        case "positivequote":
            quote.quoteMotivational(message);
            break;
        default:
            break;
    }
})

//DAR BIENVENIDA Y ROL DE NUEVO A LOS NUEVOS USUARIOS
client.on('guildMemberAdd', async(member) => {
	let role= member.guild.roles.cache.find(role => role.name === config.newUserRoleName);
	member.roles.add(role);
	const welcomeChannel = member.guild.channels.cache.find(c => c.name === 'welcome')
	welcomeChannel.send('Welcome ' + discord.userMention(member.user.id) + ' to ' + member.guild.name + '!' + '\n' + 'Please verify yourself in the verification channel.')
})

client.login(config.token)
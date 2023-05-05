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
	if (message.author.bot || !message.guild) return

	antiSpam.spamObj.message(message)
	const prefix = config.prefix

	//VERIFICACIÓN
	if (message.channel.id===config.verifyChannelId) {		
		verify.verify(message)
		return
	}

	//SI EL MENSAJE NO EMPIEZA POR ASTERISCO SALE DE LA FUNCIÓN, NO ES UN COMANDO
	if (!message.content.toLowerCase().startsWith(prefix)) return

	const args = message.content.slice(prefix.length).trim().split(/ +/g)
	let Queue = client.DisTube.getQueue(message)

	//CHECK SI EL USUARIO ESTA EN UN CANAL DE VOZ PARA PERMITIR FUNCIONES DE MUSICA
	if(message.member.voice.channel) {
		//FUNCION DE PLAY/ADD
		if (args[0].toLowerCase() === "play" && args.length > 0) {
			music.playSong(message, args, client.DisTube)
			
		} else if (Queue !== undefined) {
			//SI EXISTE LA COLA DE REPRODUCCIÓN
			music.musicQueueFunctions(Queue, message, client.DisTube)
		}

		return
	}

	//TIEMPO
	if (args[0].toLowerCase() === "weather") {
		weather.weatherCity(message, args[1])
		return
	}

	//COMANDOS BASICOS, CHISTES, QUOTES, ETC.
	switch (message.content.toLowerCase()) {
		case config.prefix + "chiste":
			jokes.jokeES(message)
			break
		case config.prefix + "joke":
			jokes.jokeEN(message)
			break
		case config.prefix + "bbquote":
			quote.quoteBreakingBad(message)
			break
		case config.prefix + "gotquote":
			quote.quoteGameOfThrones(message)
			break
		case config.prefix + "stquote":
			quote.quoteStrangersThings(message)
			break
		case config.prefix + "luciferquote":
			quote.quoteLucifer(message)
			break
		case config.prefix + "positivequote":
			quote.quoteMotivational(message)
			break
		default:
			break
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
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

const jokes = require('./jokes.js')
const music = require('./music.js')
const antiSpam = require('./antispam.js')
const quoteBreakingBad = require('./quoteBreakingBad.js')
const quoteGameOfThrones = require('./quoteGOT.js')
const quoteStrangersThings = require('./quoteStrangersThings.js')
const quoteLucifer = require('./quoteLucifer.js')
const quoteMotivational = require('./quoteMotivational.js')
const weather = require('./weather.js')

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

	//CHISTES
	if (message.content.toLowerCase() === (config.prefix +"chiste")) {
		jokes.jokeES(message)
		return
	}

	if (message.content.toLowerCase() === (config.prefix +"joke")) {
		jokes.jokeEN(message)
		return
	}

	//TIEMPO
	
	if (args[0].toLowerCase() === "weather") {
		weather.weatherCity(message, args[1])
		return
	}
  
	//FRASES FAMOSAS
	if (message.content.toLowerCase() === (config.prefix +"bbquote")) {
		quoteBreakingBad.quoteBreakingBad(message)
		return
	}

	if (message.content.toLowerCase() === (config.prefix +"gotquote")) {
		quoteGameOfThrones.quoteGameOfThrones(message)
		return
	}

	if (message.content.toLowerCase() === (config.prefix +"stquote")) {
		quoteStrangersThings.quoteStrangersThings(message)
		return
	}

	if (message.content.toLowerCase() === (config.prefix +"luciferquote")) {
		quoteLucifer.quoteLucifer(message)
		return
	}

	if (message.content.toLowerCase() === (config.prefix +"positivequote")) {
		quoteMotivational.quoteMotivational(message)
		return
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
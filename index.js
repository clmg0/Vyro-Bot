//IMPORTS

const discord = require("discord.js")
const client = new discord.Client({
	intents: [
		"Guilds",
		"GuildMessages",
		"GuildVoiceStates",
		"MessageContent"
	]
})
const config = require('./config.json')
const { DisTube } = require("distube")

client.DisTube = new DisTube(client, {
	leaveOnStop: true,
	leaveOnFinish: true,
	emitNewSongOnly: true,
	emitAddSongWhenCreatingQueue: false,
	emitAddListWhenCreatingQueue: false,
})
const jokes = require('./jokes.js')
const music = require('./music.js')
const antiSpam = require('./antispam.js')

//COMPORTAMIENTO BOT CUANDO SE AÑADEN CANCIONES
client.DisTube.on('playSong', (queue, song) =>
	queue.textChannel.send(
		"Now playing: " + song.name + ". Requested by: " + song.user.tag + '\n' + song.url
	)
)

client.DisTube.on('addSong', (queue, song) =>
	queue.textChannel.send(
		"Added to the queue: " + song.name + ". Requested by: " + song.user.tag
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

	//SI EL MENSAJE NO EMPIEZA POR ASTERISCO SALE DE LA FUNCIÓN, NO ES UN COMANDO
	if (!message.content.toLowerCase().startsWith(prefix)) return

	const args = message.content.slice(prefix.length).trim().split(/ +/g)
	let Queue = client.DisTube.getQueue(message)

	if (message.content.toLowerCase() === (config.prefix +"chiste")) {
		jokes.jokeES(message)
	}

	if (message.content.toLowerCase() === (config.prefix +"joke")) {
		jokes.jokeEN(message)
	}

	//CHECK SI EL USUARIO ESTA EN UN CANAL DE VOZ PARA PERMITIR FUNCIONES DE MUSICA
	if(message.member.voice.channel) {
		//FUNCION DE PLAY/ADD
		if (args.shift().toLowerCase() === "play" && args.length > 0) {
			music.playSong(message, args, client.DisTube)
			
		} else if (Queue !== undefined) {
			//SI EXISTE LA COLA DE REPRODUCCIÓN
			music.musicQueueFunctions(Queue, message, client.DisTube)
		}
	}
})

client.login(config.token)
const discord = require("discord.js")
const { PermissionsBitField } = require('discord.js');
const client = new discord.Client({
	intents: [
		"Guilds",
		"GuildMessages",
		"GuildVoiceStates",
		"MessageContent"
	]
})
const config = require('./config.json')
const AntiSpam = require("discord-anti-spam");
const { DisTube } = require("distube")

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
		"Now playing: " + song.name + ". Requested by: " + song.user.tag
	)
)

client.DisTube.on('addSong', (queue, song) =>
	queue.textChannel.send(
		"Added to the queue: " + song.name + ". Requested by: " + song.user.tag
	)
)

const antiSpam = new AntiSpam({
	warnThreshold: 3, // Amount of messages sent in a row that will cause a warning.
	muteTreshold: 6, // Amount of messages sent in a row that will cause a mute.
	kickTreshold: 9, // Amount of messages sent in a row that will cause a kick.
	banTreshold: 12, // Amount of messages sent in a row that will cause a ban.
	warnMessage: "Stop spamming!", // Message sent in the channel when a user is warned.
	muteMessage: "You have been muted for spamming!", // Message sent in the channel when a user is muted.
	kickMessage: "You have been kicked for spamming!", // Message sent in the channel when a user is kicked.
	banMessage: "You have been banned for spamming!", // Message sent in the channel when a user is banned.
	unMuteTime: 60, // Time in minutes before the user will be able to send messages again.
	verbose: true, // Whether or not to log every action in the console.
	removeMessages: true, // Whether or not to remove all messages sent by the user.
	ignoredPermissions: [PermissionsBitField.Administrator], // If the user has the following permissions, ignore him.
  });

const jokes = require('./jokes.js')
const music = require('./music.js')

client.on("ready", client => {
	console.log("VyroBOT ONLINE...")
})

client.on("messageCreate", message => {
	if (message.author.bot || !message.guild) return

	antiSpam.message(message)
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
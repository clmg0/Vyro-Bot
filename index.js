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

client.on("ready", client => {
	console.log("VyroBOT ONLINE...")
})

client.on("messageCreate", message => {
	if (message.author.bot || !message.guild) return

	const prefix = config.prefix

	//SI EL MENSAJE NO EMPIEZA POR ASTERISCO SALE DE LA FUNCIÓN, NO ES UN COMANDO
	if (!message.content.toLowerCase().startsWith(prefix)) return

	const args = message.content.slice(prefix.length).trim().split(/ +/g)
	let Queue = client.DisTube.getQueue(message)

	//CHECK SI EL USUARIO ESTA EN UN CANAL DE VOZ PARA PERMITIR FUNCIONES DE MUSICA
	if(message.member.voice.channel) {
		//FUNCION DE PLAY/ADD
		if (args.shift().toLowerCase() === "play") {
			playSong(message, args)
			
		} else if (Queue !== undefined) {
			//SI EXISTE LA COLA DE REPRODUCCIÓN
			musicQueueFunctions(Queue, message)
		}
	}
})

//FUNCION DE PLAY/ADD
function playSong(message, args) {
	client.DisTube.play(message.member.voice.channel, args.join(" "), {
		member: message.member,
		textChannel: message.channel,
		message
	})
}

//FUNCIONES DE MUSICA SI HAY COLA EN REPRODUCCIÓN
function musicQueueFunctions(Queue, message) {
	//SHUFFLE DE LA COLA
	if (message.content.toLowerCase() === (config.prefix +"shuffle")) {
		Queue = client.DisTube.shuffle(message);
		message.channel.send("Shuffled the queue!");
		return
	}

	//VER COLA DE CANCIONES
	if (message.content.toLowerCase() === (config.prefix +"songs")) {
		songList = ''
		Queue.songs.forEach(function (value, i) {
			songList = songList + "\n" + i + ".- " + value.name + '. RQB: ' + value.user.tag
		});
		message.channel.send(songList);
		return
	}

	//FUNCIÓN DE PAUSE, RESUME
	if (message.content.toLowerCase() === (config.prefix +"pause")) {
		if (Queue.paused) {
			client.DisTube.resume(message);
		} else {
			client.DisTube.pause(message);
		}
		return
	}
	
	//FUNCION DE STOP
	if (message.content.toLowerCase() === (config.prefix +"stop")) {
		client.DisTube.stop(message);
        message.channel.send("Stopped the queue!");
		return
	}

	//FUNCION DE SKIP, SI SOLO HAY UNA CANCION SE EVITA
	if ((message.content.toLowerCase() === (config.prefix +"skip")) && Queue.songs.length > 1) {
		client.DisTube.skip(message);
	} else {
		message.channel.send("No next song, can't skip");
	}
}

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

client.login(config.token)
const config = require('./config.json')

//FUNCION DE PLAY/ADD
function playSong(message, args, musicClient) {
	musicClient.play(message.member.voice.channel, args.join(" "), {
		member: message.member,
		textChannel: message.channel,
		message
	})
}

//FUNCIONES DE MUSICA SI HAY COLA EN REPRODUCCIÓN
function musicQueueFunctions(Queue, message, musicClient) {
	//SHUFFLE DE LA COLA
	if (message.content.toLowerCase() === (config.prefix +"shuffle")) {
		Queue = musicClient.shuffle(message);
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
			musicClient.resume(message);
		} else {
			musicClient.pause(message);
		}
		return
	}
	
	//FUNCION DE STOP
	if (message.content.toLowerCase() === (config.prefix +"stop")) {
		musicClient.stop(message);
        message.channel.send("Stopped the queue!");
		return
	}

	//FUNCION DE SKIP, SI SOLO HAY UNA CANCION SE EVITA
	if (Queue.songs.length <= 1) return
	if (message.content.toLowerCase() === (config.prefix +"skip")) {
		musicClient.skip(message);
	}
}

module.exports = { playSong, musicQueueFunctions}
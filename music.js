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
	switch(message.content.toLowerCase()) {
		//SHUFFLE DE LA COLA
		case config.prefix + "shuffle":
			Queue = musicClient.shuffle(message);
			message.channel.send("Shuffled the queue!");
			break;
		
		//VER COLA DE CANCIONES
		case config.prefix + "songs":
			songList = '';
			Queue.songs.forEach(function (value, i) {
				songList = songList + "\n" + i + ".- " + value.name + '. RQB: ' + value.user.username
			});
			message.channel.send(songList);
			break;

		//FUNCIÓN DE PAUSE, RESUME		
		case config.prefix + "pause":
			if (Queue.paused) {
				musicClient.resume(message);
			} else {
				musicClient.pause(message);
			}
			break;

		//FUNCION DE STOP
		case config.prefix + "stop":
			musicClient.stop(message);
			message.channel.send("Stopped the queue!");
			break;
			
		//FUNCION DE SKIP, SI SOLO HAY UNA CANCION SE EVITA
		case config.prefix + "skip":
			if (Queue.songs.length <= 1) {
				message.channel.send("Can't skip, no next song!");
			} else {
				musicClient.skip(message);
			}
			
			break;
	
		default:
			break;
	}
}

module.exports = { playSong, musicQueueFunctions}
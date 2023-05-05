const config = require('../config.json')

function banUser(args, message) {
    const targetUser = args[1]
    const reason = args[2]
    const days = args[3]

    //Busqueda de usuarios
    let userTargetFound = message.mentions.users.first().id
    let userRequesterFound = message.author.id
    let botFound = config.botId

    console.log(userTargetFound.member)
    //Busqueda de roles
    let requesterRole = message.member.roles.highest.position
    let targetRole = message.mentions.users.first().roles.highest.position
    let botRole = botFound.member.get.roles.highest.position

    if (requesterRole <= targetRole) {
        message.channel.send("The user" + userTargetFound + " can't be banned because he has a higher role than you.");
        return
    } else if (targetRole >= botRole) {
        message.channel.send("The user" + userTargetFound + " can't be banned because he has a higher role than the bot.");
        return
    } else if (userTargetFound == botFound) {
        message.channel.send("I can't ban myself.");
        return
    } else if (userTargetFound == userRequesterFound) {
        message.channel.send("You can't ban yourself.");
        return
    } else {
        client.users.get(userTargetFound).send("You have been banned from the server for: " + reason + ", " + days + " days.");
        user.ban({ days: days, reason: reason });
        message.channel.send("The user" + userTargetFound + " has been banned for: " + reason + "; " + days + " days.");
        return
    }
}

module.exports = {banUser}
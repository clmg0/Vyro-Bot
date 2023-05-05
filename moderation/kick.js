const config = require('../config.json')

function kickUser(args, message) {
    const targetUser = args[1]
    const reason = args[2]

    //Busqueda de usuarios
    let userFound = message.guild.members.find(user => user.username == targetUser)
    let userRequesterFound = message.user
    let userMentioned = message.mentions.users.first()
    let botFound = message.guild.members.find(user => user.username == config.botName)

    //Busqueda de roles
    let requesterRole = message.user.member.get.roles.highest.position
    let targetRole = userMentioned.member.get.roles.highest.position
    let botRole = botFound.member.get.roles.highest.position

    if (requesterRole <= targetRole) {
        message.channel.send("The user" + userFound + " can't be kicked because he has a higher role than you.");
        return
    } else if (targetRole >= botRole) {
        message.channel.send("The user" + userFound + " can't be kicked because he has a higher role than the bot.");
        return
    } else if (userTargetFound == botFound) {
        message.channel.send("I can't kick myself.");
        return
    } else if (userTargetFound == userRequesterFound) {
        message.channel.send("You can't kick yourself.");
        return
    } else {
        client.users.get(userFound).send("You have been kicked from the server for: " + reason + ".");
        user.kick({ reason: reason });
        message.channel.send("The user" + userFound + " has been kicked for: " + reason + ".");
        return
    }
}

module.exports = {kickUser}
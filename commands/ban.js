const discord = require("discord.js")

function banUser(args, message) {
    const reason = args[2]?.value || "No reason given."
    const days = args[3]?.value || 5

    //Busqueda de usuarios
    let userTargetFound = message.mentions.members.first()
    let userRequesterFound = message.author
    let botFound = message.guild.members.me

    //Busqueda de roles
    let requesterRole = message.member.roles.highest.position
    let targetRole = userTargetFound.roles.highest.position
    let botRole = botFound.roles.highest.position

    if (requesterRole < targetRole) {
        message.channel.send("The user " + discord.userMention(userTargetFound.user.id) + " can't be banned because he has a higher role than you.");
        return
    } else if (targetRole > botRole) {
        message.channel.send("The user " + discord.userMention(userTargetFound.user.id) + " can't be banned because he has a higher role than the bot.");
        return
    } else if (targetRole === botRole) {
        message.channel.send("The user " + discord.userMention(userTargetFound.user.id) + " can't be banned because he has a the same role than the bot.");
        return
    } else if (targetRole === requesterRole) {
        message.channel.send("The user " + discord.userMention(userTargetFound.user.id) + " can't be banned because he has a the same role than you.");
        return
    } else if (userTargetFound.id == botFound.id) {
        message.channel.send("I can't ban myself.");
        return
    } else if (userTargetFound.id == userRequesterFound.id) {
        message.channel.send("You can't ban yourself.");
        return
    } else {
        try {
            userTargetFound.send("You have been banned from the server for: **" + reason + ", " + days + " days.**");
            setTimeout(function(){
                userTargetFound.ban({ days: days, reason: reason });
            },1000 * 10)
            message.channel.send("The user " + discord.userMention(userTargetFound.user.id) + " has been banned for: **" + reason + "; " + days + " days.**");
            return
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = {banUser}
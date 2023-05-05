const config = require('../config.json')

function verify(message) {
	if (message.content.toLowerCase() === (config.prefix +"verify")) {
        message.delete()
        message.member.roles.add(message.guild.roles.cache.find(r => r.name === config.verifiedUserRoleName))
        message.member.roles.remove(message.guild.roles.cache.find(r => r.name === config.newUserRoleName))
        //SOLO PERMITE ESCRIBIR VERIFY
    } else {
        message.delete()
    }
}

module.exports = {verify}
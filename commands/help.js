const config = require('../config.json')
const prefix = config.prefix;

function helpMenu(message) {
    message.author.send("**The available commands for Vyro-Bot are:** \n "+prefix+"help \n "+prefix+"chiste \n "+prefix+"joke \n "+prefix+"bbquote \n "+prefix+"gotquote \n "+prefix+"stquote \n "+prefix+"luciferquote \n "+prefix+"positivequote \n "+prefix+"weather \n "+prefix+"ban \n "+prefix+"kick \n\n **MUSIC**: \n "+prefix+"play \n "+prefix+"shuffle \n"+prefix+"songs \n"+prefix+"pause \n"+prefix+"stop \n"+prefix+"skip");
}
module.exports = {helpMenu}
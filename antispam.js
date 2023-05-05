const AntiSpam = require("discord-anti-spam");
const { PermissionsBitField } = require('discord.js');

const spamObj = new AntiSpam({
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
	ignoredPermissions: [PermissionsBitField.Flags.Administrator], // If the user has the following permissions, ignore him.
});

module.exports = { spamObj }
/**
 * @file Sample ping command
 * @author Naman Vrati
 * @since 1.0.0
 * @version 3.2.2
 */

/**
 * @type {import('../../typings').LegacyCommand}
 */
module.exports = {
	name: "vyro",
	// Refer to typings.d.ts for available properties.

	execute(message, args) {
		message.channel.send({ content: "Soy Vyro Bot el Bot inteligente." });
	},
};

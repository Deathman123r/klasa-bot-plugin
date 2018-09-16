const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['choose', 'decide'],
			description: 'Makes a decision for you given some choices.',
			usage: '<choices:str> [...]',
			quotedStringSupport: true,
			usageDelim: ' '
		});
	}

	run(message, choices) {
		return message.reply(choices.length === 1 ?
			'You only gave me one choice, dummy.' :
			`I think you should go with "${choices[Math.floor(Math.random() * choices.length)]}"`);
	}

};

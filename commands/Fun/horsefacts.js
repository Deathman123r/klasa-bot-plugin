const { Command } = require('klasa');
const { array: { horsefacts } } = require('../../array.js')
module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['hf'],
			description: 'Gives you a random horse fact',
		});
	}

	run(message) {
        return message.sendMessage(facts[Math.floor(Math.random() * horsefacts.length)]);
	}

};
/* eslint-disable-max-len */

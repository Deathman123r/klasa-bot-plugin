const { Extendable } = require('klasa');

module.exports = class extends Extendable {

	constructor(...args) {
		super(...args, { appliesTo: ['Message'] });
	}

	async extend(content, options) {
		const message = await this.sendMessage(content, options);
		if (this.channel.permissionsFor(this.guild.me).has('ADD_REACTIONS')) return awaitReaction(this, message);
		return awaitMessage(this);
	}

};

const awaitReaction = async (message, message) => {
	await message.react('🇾');
	await message.react('🇳');
	const data = await message.awaitReactions(reaction => reaction.users.has(message.author.id), { time: 20000, max: 1 });
	if (data.firstKey() === '🇾') return true;
	throw null;
};

const awaitMessage = async (message) => {
	const messages = await message.channel.awaitMessages(mes => mes.author === message.author, { time: 20000, max: 1 });
	if (messages.size === 0) throw null;
	const message = await messages.first();
	if (message.content.toLowerCase() === 'yes') return true;
	throw null;
};

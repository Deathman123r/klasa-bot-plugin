/*
MIT License

Copyright (c) 2017-2018 dirigeants

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/

const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
// Create a TMDB account on https://www.themoviedb.org/ (if you haven't yet) and go to https://www.themoviedb.org/settings/api to get your API key.
const tmdbAPIkey = 'API_KEY_HERE';

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			enabled: false,
			aliases: ['tvshows', 'tv', 'tvseries'],
			description: 'Finds a TV show on TMDB.org',
			extendedHelp: 'e.g. `s.tvshow universe, 2`',
			usage: '<Query:str> [Page:number]',
			usageDelim: ','
		});
	}

	async run(message, [query, page = 1]) {
		const url = new URL('https://api.themoviedb.org/3/search/tv');
		url.search = new URLSearchParams([['api_key', tmdbAPIkey], ['query', query]]);

		const body = await fetch(url)
			.then(response => response.json());
		const show = body.results[page - 1];
		if (!show) throw `I couldn't find a TV show with title **${query}** in page ${page}.`;

		const embed = new MessageEmbed()
			.setColor('RANDOM')
			.setImage(`https://image.tmdb.org/t/p/original${show.poster_path}`)
			.setTitle(`${show.name} (${page} out of ${body.results.length} results)`)
			.setDescription(show.overview)
			.setFooter(`${this.client.user.username} uses the TMDb API but is not endorsed or certified by TMDb.`,
				'https://www.themoviedb.org/static_cache/v4/logos/208x226-stacked-green-9484383bd9853615c113f020def5cbe27f6d08a84ff834f41371f223ebad4a3c.png');
		if (show.title !== show.original_name) embed.addField('Original Title', show.original_name, true);
		embed
			.addField('Vote Count', show.vote_count, true)
			.addField('Vote Average', show.vote_average, true)
			.addField('Popularity', show.popularity, true)
			.addField('First Air Date', show.first_air_date);

		return message.sendEmbed(embed);
	}

};

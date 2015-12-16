'use strict'
const request = require('superagent');
const Promise = require('promise');
const key = require("../../lib/config.js").ytKey;

function searchYoutube(keyword, pageToken) {
	let options = "?type=video&part=snippet&q=" + keyword + "&key=" + key.key + "&maxResults=10";
	if(pageToken) {
		options += "&pageToken=" + pageToken
	}
	const url = `https://www.googleapis.com/youtube/v3/search${options}`;
	return new Promise(resolve => {
		request.get(url)
			.end((err, res) => resolve(res.body))
	})
}

export default { searchYoutube }
const cs = require('cognitive-services');

const KEY = require('../config.js').ms_key;

const emotionRecognition = new cs.emotionRecognition({KEY});

module.exports = {
	recognize: (mediaUrl) => (
		emotionRecognition.recognize({body: {url: mediaUrl} })
	)
};
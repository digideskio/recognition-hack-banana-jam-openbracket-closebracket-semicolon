const cs = require('cognitive-services');

const emotionRecognition = new cs.emotionRecognition(KEY);

module.exports = {
	recognize: (mediaUrl) => (
		emotionRecognition.recognize({url: mediaUrl})
	)
};
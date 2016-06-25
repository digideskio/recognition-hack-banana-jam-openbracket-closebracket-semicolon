const twitter = require('./twitter');
const cognition = require('./cognition');

const responses = {
	angry: [],
	sad: [],
	happy: []
};

function biggestScore(scores){
	let biggest = 0;
	let mood;
	for (var i in scores){
		if (scores[i] > biggest){
			mood = i;
		}
	}
	return mood;
}

twitter.onTweet((tweet) => {
	console.log('got tweet', tweet);
	let url = tweet.media.url;
	cognition.recognize({mediaUrl: url}).then((response) => {
		console.log('got cognition response', response);
		const mood = biggestScore(response[0].scores);
		const idx = Math.floor((Math.random() * responses[mood].length));
		const message = responses[idx];
		console.log('tweeting', message);
		twitter.tweet({replyTo: tweet.id, text: message}, function(err){
			if (err){
				console.error(err);
			} else {
				console.log('tweeted!');
			}
		});
	});
});
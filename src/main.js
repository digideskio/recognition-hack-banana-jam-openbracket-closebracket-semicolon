const twitter = require('./twitter');
const cognition = require('./cognition');

const responses = {
	anger: [ "you look angry!" ],
	contempt: [ "you look contempt!" ],
	disgust: [ "you look disgusted!" ],
	fear: [ "you look scared" ],
	happiness: [ "you look happy!" ],
	neutral: [ "you look neutral" ],
	surprise: [ "you look surprised" ],
	sadness: [ "you look sad" ],
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
	let url = tweet.entities.media[0].media_url_https;
	console.log('got media URL', url);
	cognition.recognize(url).then((response) => {
		console.log('got cognition response', response);
		console.log('got cognition scores', response[0].scores);
		const mood = biggestScore(response[0].scores);
		console.log('recognised mood as', mood);
		const idx = Math.floor((Math.random() * Object.keys(responses[mood]).length));
		const message = responses[mood][idx];
		console.log('tweeting', message);
		twitter.tweet({replyTo: tweet.id, message}, function(err){
			if (err){
				console.error(err);
			} else {
				console.log('tweeted!');
			}
		});
	});
});

console.log('@semicolonbot activated, god help you');
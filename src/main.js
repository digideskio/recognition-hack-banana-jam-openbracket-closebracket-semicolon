const twitter = require('./twitter');
const cognition = require('./cognition');

const responses = {
	anger: [ "angry!", "mad", "irate",  "annoyed", "cross", "vexed", "irritated", "indignant", "irked" ],
	contempt: [ "contempt!" ],
	disgust: [ "disgusted!" ],
	fear: [ "scared" ],
	happiness: [ "happy!" ],
	neutral: [ "neutral" ],
	surprise: [ "surprised" ],
	sadness: [ "sad" ],
	noface: [ "I couldn't see anyone in that picture" ]
};

function biggestScore(scores){
	let biggest = 0;
	let mood;
	for (var i in scores){
		if (scores[i] > biggest){
			biggest = scores[i];
			mood = i;
		}
	}
	return mood;
}

twitter.onTweet((tweet, noBlankTweet) => {
	let url = tweet.entities.media[0].media_url_https;
	let screenName = tweet.user.screen_name;
	console.log('got media URL', url);
	cognition.recognize(url).then((response) => {
		console.log('got cognition response', response);
		let mood;
		let message;
		if (response[0]){
			console.log('got cognition scores', response[0].scores);
			mood = biggestScore(response[0].scores);
			console.log('recognised mood as', mood);
		} else {
			mood = 'noface';
			console.log('cognition couldnt find a face');
		}

		const idx = Math.floor((Math.random() * Object.keys(responses[mood]).length));
		if (mood == 'noface'){
			if (!noBlankTweet){
				message = responses[mood][idx] + " @user";
			}
		} else {
			message = "you look " + responses[mood][idx] + " @user";
		}
		if (message){
			message = message.split('@user').join('@'+screenName);
			console.log('tweeting', message);
			console.log('replying to tweet with ID',tweet.id_str);
			twitter.tweet({replyTo: tweet.id_str, message}, function(err){
				if (err){
					console.error(err);
				} else {
					console.log('tweeted!');
				}
			});
		}
	});
});

console.log('@semicolonbot activated, god help you');

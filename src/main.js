const twitter = require('./twitter');
const cognition = require('./cognition');

const responses = {
	anger: [ "you look angry! @user" ],
	contempt: [ "you look contempt! @user" ],
	disgust: [ "you look disgusted! @user" ],
	fear: [ "you look scared @user" ],
	happiness: [ "you look happy! @user" ],
	neutral: [ "you look neutral @user" ],
	surprise: [ "you look surprised @user" ],
	sadness: [ "you look sad @user" ],
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
	let screenName = tweet.user.screen_name;
	console.log('got media URL', url);
	cognition.recognize(url).then((response) => {
		console.log('got cognition response', response);
		console.log('got cognition scores', response[0].scores);
		const mood = biggestScore(response[0].scores);
		console.log('recognised mood as', mood);
		const idx = Math.floor((Math.random() * Object.keys(responses[mood]).length));
		const message = responses[mood][idx].split('@user').join('@'+screenName);
		console.log('tweeting', message);
		console.log('replying to tweet with ID',tweet.id_str);
		twitter.tweet({replyTo: tweet.id_str, message}, function(err){
			if (err){
				console.error(err);
			} else {
				console.log('tweeted!');
			}
		});
	});
});

console.log('@semicolonbot activated, god help you');
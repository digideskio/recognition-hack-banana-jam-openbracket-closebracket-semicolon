// require twitter npm module

let cb = () => {}

// twitter.on('tweet', (tweet) => cb(tweet))

module.exports = {
	// when tweeted
	onTweet: (callback) => {
		cb = callback;
	},
	// send a tweet
	tweet: () => {

	}
}
var Twitter = require('twitter');
let cb = () => {};

var config = require('../config');

var client = new Twitter({
	consumer_key: config.consumer_key,
	consumer_secret: config.consumer_secret,
	access_token_key: config.access_token_key,
	access_token_secret: config.access_token_secret
});

let endpoint = 'user';
let args = {replies: 'all'};

if (process.argv[2]) {
	endpoint = 'statuses/filter';
	args = {track: '#'+process.argv[2]};
	console.log('also filtering for tweets with hashtag', args.track);

	client.stream(endpoint, args, function(stream) {

		stream.on('data', function(data) {
			if (data.event){
				console.log("[Twitter]",'got event', data.event);
			} else if (data.friends){
				console.log("[Twitter]",'Got friends list', data.friends);
			} else if (data.user && (data.user.id != config.user_id)){
				cb(data);
			} else {
				// console.log("[Twitter]",'Got unhandled case', data);
			}

		});

		stream.on('error', function(error) {
			console.error(error);
		});

	});
}

client.stream('user', {replies: 'all'}, function(stream) {

		stream.on('data', function(data) {
			if (data.event){
				console.log("[Twitter]",'got event', data.event);
			} else if (data.friends){
				console.log("[Twitter]",'Got friends list', data.friends);
			} else if (data.user && (data.user.id != config.user_id)){
				cb(data);
			} else {
				// console.log("[Twitter]",'Got unhandled case', data);
			}

		});

		stream.on('error', function(error) {
			console.error(error);
		});

	});

function tweet({message, replyTo}, done){
	if (client){
		console.log('tweeting',  {status: message, in_reply_to_status_id: replyTo});
		client.post('statuses/update', {status: message, in_reply_to_status_id: replyTo},  function(error, theTweet, response){
			if(error) {
				done(error);
			} else {
				done(null);
			}
		});
	} else {
		done(new Error("Client not authenticated"));
	}
}

module.exports = {
	// when tweeted
	onTweet: (callback) => {
		cb = callback;
	},
	// send a tweet
	tweet: tweet
};
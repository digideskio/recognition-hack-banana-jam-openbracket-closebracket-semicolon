# recognition-hack-banana-jam-openbracket-closebracket-semicolon


# Description

Twitter bot which analyses the images sent to it using the [Microsoft Congnition Emotion API](https://www.microsoft.com/cognitive-services/en-us/emotion-api) and sends (hopefully) appropriate responses.

Built at [Re:cognition Hack 2016](https://www.eventbrite.co.uk/e/recognition-tickets-25574579255).

# Installation

* Download and install [Node JS 6.x](https://nodejs.org) if you haven't got it already
* Checkout the repo somewhere
* Open a terminal and cd into the directory
* Run `npm install`
* Run `cp config.example.js config.js`
* Open `config.js` in your favourite editor and follow the Configuration steps

# Configuration

* `consumer_key` is your twitter app's Consumer Key (API Key)
* `consumer_secret` is your twitter app's Consumer Secret (API Secret)
* `access_token_key` is your twitter user's Access Token on your twitter app
* `access_token_secret` is your twitter user's Access Token Secret on your twitter app
* `ms_key` is one of your Microsoft Cognitive Emotion - Preview keys
* `user_id` is your twitter user's ID

# Running
* Run `node .`

# Running also following a hashtag
* Run `node . hashtagWithoutHash`
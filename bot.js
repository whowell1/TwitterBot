console.log("The bot is starting ");

var Twit = require('twit');

var config = require('./config');
var T = new Twit(config);
var retweet = "";
var modifiedTweets = [];

var params = {
  q: 'Donald Trump since:2017-10-4',
  count: 8,
  result_type: 'recent',
  lang: 'en'
}

var wordsToReplace = ['Trump', 'fake news', 'Donald', 'Ivanka', "donald", "trump"];
var replacementWords = ['***', '&&&&', '555', '11111','3333', '5555'];

function gotData(err, data, response) {
  var tweets = data.statuses;
  for (var i = 0; i < tweets.length; i++) {
    modifiedTweet = containsWordsToReplace(tweets[i].text, wordsToReplace);
    if (modifiedTweet.length > 135) {
      modifiedTweet = modifiedTweet.substring(0, 135);
    }
    modifiedTweets.push(modifiedTweet);
  }
  sendRetweet(modifiedTweets[Math.floor(Math.random() * 9)]);

}

function containsWordsToReplace(text, replacements) {
  var split = text.split(" ");
  var modifiedTweet = split.map(function(word) {
    for (var i = 0; i < replacements.length; i++) {
      if (word.includes(replacements[i])) {

        word = ["OJ Simpson"];



      }
    }
    return word;
  });
  return modifiedTweet.join(" ");
}

function tweeted(err, data, response) {
  if (err) {
    console.log("Something went wrong sending retweet");
    setTimeOut(function() {
      T.get('search/tweets', params, gotData);
    }, 200);
    console.log(err);
  } else {
    console.log("It worked");
  }
}

function sendRetweet(retweet) {
  var tweet = {
    status: retweet
  }
  T.post('statuses/update', tweet, tweeted);
}
T.get('search/tweets', params, gotData);

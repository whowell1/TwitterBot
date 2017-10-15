console.log("The bot is starting ");

var Twit = require('twit');
var catNames  = require('cat-names');

var config = require('./config');
var T = new Twit(config);
var retweet = "";
var modifiedTweets = [];

var params = {
  q: 'Trump since:2017-10-4',
  count: 8,
  result_type: 'recent',
  lang: 'en'
}

var wordsToReplace = ['Trump', 'fake news', 'Donald', 'Ivanka', "donald", "trump"];



var randomNames = ["Lebron James and ", " OJ Simpson", ""];

var followComments = [
                        "I bet he wanted to marry " + catNames.random() + " instead",
                        "I think he got maybe " + Math.floor(Math.random(0,1)*50) + " year(s) left in him",

                      ];

Array.prototype.pick = function() {
                      	return this[Math.floor(Math.random()*this.length)];
                    }



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
        word = randomNames.pick()
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

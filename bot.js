console.log("The bot is starting ");

var Twit = require('twit');

var config = require('./config');
// console.log(config);
var T = new Twit(config);

var params = {
  q: 'Donald Trump since:2017-10-4',
  count: 8,
  result_type: 'recent',
  lang: 'en'
}

var wordsToReplace = ['Trump', 'fake news', 'Donald', 'Ivanka'];

function gotData(err, data, response) {
  var tweets = data.statuses;
  var modifiedTweets = [];
  for (var i = 0; i < tweets.length; i++) {
    // console.log(tweets[i].text.replace(wordsToReplace , wordsToOverWriteWith));
    modifiedTweet = containsWordsToReplace(tweets[i].text, wordsToReplace);
    modifiedTweets.push(modifiedTweet);

  }
  
   var tweet = {
    status: modifiedTweets[0]
    }

  T.post('statuses/update' , tweet, tweeted);
}


function containsWordsToReplace(text, replacements) {
  var split = text.split(" ");
  var modifiedTweet = split.map(function(word) {
    for (var i = 0; i < replacements.length; i++) {
      if (word.includes(replacements[i])) {
        word = '************';
      }
    }
    return word;
  });
  return modifiedTweet.join(" ");
}
var listOfTweets = T.get('search/tweets', params, gotData);






// console.log(gotData());




function tweeted(err, data,response) {
  if (err){
    console.log("Something went wrong");
  } else {
    console.log("It worked");
  }
}

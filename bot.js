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


var wordsToReplace = ["Trump"];


var wordsToOverWriteWith = ["OJ Simpson"];
function gotData(err, data, response){
  var tweets = data.statuses;
  for (var i = 0; i < tweets.length; i++){
      console.log(tweets[i].text.replace(wordsToReplace , wordsToOverWriteWith));
  }
}
 var listOfTweets = T.get('search/tweets', params,gotData);



// var tweet = {
//
//   status: '#This is testbot wow. '
// }
//
// T.post('statuses/update' , tweet, tweeted);
//
//
// function tweeted(err, data,response) {
//   if (err){
//     console.log("Something went wrong");
//   } else {
//     console.log("It worked");
//   }
// }

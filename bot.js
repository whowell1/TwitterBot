console.log("The bot is starting ");

var Twit = require('twit');
var config = require('./config');
var request = require("request");
var newYorkTimesApiKey = "a05afe51ee714541b68ecea8dac10cbf";

var T = new Twit(config);
var names = ["Khor Choibalsan", "Adolf Hitler", "Francisco Franco", "Idi Amin",
  "Joseph Stalin", "Bashar al-Assad",
  "Christoper Columbus", "King Leopold II", "Augusto Pinochet",
  "Talaat Pasha", "Tomas de Torquemada", "Robert Mugabe", "Koki Hirota",
  "Chiang Kai-shek"
];

var trivia = [
  "Who is the richest person of all time?",
  "What continent has the most imports of slaves?",
  "What does the origins of the word of hip-hop?",
  "Which American inventor is generally given credit for the invention of the lightning rod?"
];


var triviaAnswers = [
 "You should look it up",
 "You should read more",
 "Google it",
 "read about it",
 "Ask your teacher about it"
];

var issues = ["global warming", "education", "poverty", "womens rights", "gay rights",
  "civil wars", " ethnic violence", "corrupt police", "cyber warfare", "US Presidents", "Artifical Intelligence"
];

Array.prototype.pick = function() {
  return this[Math.floor(Math.random() * this.length)];
}
Array.prototype.pickAndPad = function() {
  return this.pick() + " ";
}


function history() {
  var facts = "";
  var url = ""
  names = names.pickAndPad();
  if (names.includes("Idi Amin")) {
    url = "https://goo.gl/YaXphN";
  } else if (names.includes("Kho Choibalsan")) {
    url = "https://goo.gl/Azeq8s";
  } else if (names.includes("Adolf Hitler")) {
    url = "https://goo.gl/qU3Y81";
  } else if (names.includes("Francisco Franco")) {
    url = "https://goo.gl/ETjQjB";
  } else if (names.includes("King Leopold II")) {
    url = "https://goo.gl/sSsjGG";
  } else if (names.includes("Bashar al-Assad")) {
    url = "https://goo.gl/i1xk9B";
  } else if (names.includes("Augusto Pinochet")) {
    url = "https://goo.gl/USfiYA";
  } else if (names.includes("Talaat Pasha")) {
    url = "https://goo.gl/E9jA8s";
  } else if (names.includes("Tomas de Torquemada")) {
    url = "https://goo.gl/cF2WcV";
  } else if (names.includes("Robert Mugabe")) {
    url = "https://goo.gl/KjTajt";
  } else if (names.includes("Koki Hirota")) {
    url = "https://goo.gl/mdTFpT";
  } else if (names.includes("Chiang Kai-shek")) {
    url = "https://goo.gl/7BMY7R";
  } else if (names.includes("Christoper Columbus")) {
    url = "https://goo.gl/MEH8g6";
  } else {
    url = 'https://goo.gl/xahXHC';
  }
  facts += names
  facts += "killed more than "
  facts += Math.floor(Math.random() * 10000)
  facts += " people but "
  facts += issues.pickAndPad();
  facts += "ruins more lives. Read about " + names + "on Wiki ";
  facts += url;
  if (facts.length >= 135) {
    facts = "";
    facts += trivia.pickAndPad();
    facts += triviaAnswers.pickAndPad();
    // facts += triviaResponse.pickAndPad();
    return facts;
  } else {
    return facts;
  }
}


var nyTimesURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?" + "api-key=" + newYorkTimesApiKey + "&q=" + issues.pickAndPad().replace(" ", "%20");



// function getArticle(){
//   var response;
//   var data = request(nyTimesURL, function(err,res,body){
//     body = JSON.parse(body);
//     var body = body.response.docs[0].headline.main;
//     console.log("API Response " + body);
//     return body;
//   })
//   return data;
//   // console.log(data);
// }
//
//

//  request(nyTimesURL, function(err,res,body){
//   body = JSON.parse(body);
//   var url = body.response.docs[Math.floor(Math.random() * 9)].web_url;
//   tweetItTimes(url);
// });



function tweetPerson(event) {
  var replyTo = event.in_reply_to_screen_name;
  var from = event.user.screen_name;
  var location = event.location;

  if (replyTo === "lotusFyre1") {
    var replyTweet = "@" + from; // this is where I have the results of data
  }

}

// function tweetJSON(eventMsg){
//   var fs = require('fs');
//   var json = JSON.stringify(eventMsg,null,2);
//   fs.writeFile("tweet.json", json);
// }



function tweeted(err, data, response) {
  if (err) {
    console.log("Something went wrong");
    console.log(err);

  } else {
    console.log("It worked");
  }
}

function postTweet(text){
  T.post('statuses/update', {
    status: text
  }, tweeted);
}

function tweetItTimes(url) {
  request(nyTimesURL, function(err,res,body){
   body = JSON.parse(body);
   var url = "You should be aware of what is going on in the world, Here is a article for you ";
     url += body.response.docs[Math.floor(Math.random() * 9)].web_url;
   postTweet(url);
  });
}

function tweetItHistory(url) {
  var tweetText = history();
  postTweet(tweetText);
}

function run() {
  tweetItTimes();
  tweetItHistory();
}

run();

// setInterval(run, 1000 * 60 * 60);

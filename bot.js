console.log("The bot is starting ");

var Twit = require('twit');
var catNames = require('cat-names');
var config = require('./config');
var debug = true;
var T = new Twit(config);
var names = ["Khorloogiin Choibalsan", "Adolf Hitler", "Francisco Franco", "Idi Amin",
  "Joseph Stalin", "Bashar al-Assad",
  "Christoper Columbus", "King Leopold II", "Augusto Pinochet",
  "Talaat Pasha", "Tomas de Torquemada", "Robert Mugabe", "Koki Hirota",
  "Chiang Kai-shek"
];

var issues = ["global warming", "education", "poverty", "womens rights", "gay rights",
  "civil war", " ethnic violence", "corrupt police", "cyber warfare", "US Presidents", "Justin Bieber"
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
  } else if (names.includes("Khorloogiin Choibalsan")) {
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
    url = '';
  }
  facts += names
  facts += "killed more than "
  facts += " " + Math.floor(Math.random() * 10000)
  facts += " people "
  facts += issues.pickAndPad();
  facts += "ruins more lives. Read about " + names + "on Wiki ";
  facts += url;
  return facts;
}



function tweeted(err, data, response) {
  if (err) {
    console.log("Something went wrong");
  } else {
    console.log("It worked");
  }
}

function tweet() {
  var tweetText = history();
  T.post('statuses/update', {
    status: tweetText
  }, tweeted);

}

function run() {
  tweet();
}

run();

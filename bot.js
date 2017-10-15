console.log("The bot is starting ");

var Twit = require('twit');
var catNames  = require('cat-names');
var config = require('./config');
var debug = false;

var T = new Twit(config);


var names = [ "Khorloogiin Choibalsan" , "Adolf Hitler" ,  "Francisco Franco" , "Idi Amin" ,
             "Joseph Stalin" , "Abdul Nacer Benbrika" ,
             "Christoper Columbus", "King Leopold II" , "Augusto Pinochet" ,
             "Mehmet Talat Paşa" , "Tomas de Torquemada" , "Robert Mugabe" , "Koki Hirota" ,
             "Chiang Kai-shek"
];


var issues = [ "global warming" , "education" , "poverty" , "womens rights" , "gay rights" ,
             "civil war" , " ethnic violence" , "corrupt police" , "cyber warfare"
];



Array.prototype.pick = function() {
                      	return this[Math.floor(Math.random()*this.length)];
                    }
Array.prototype.pickAndPad = function() {
                    	return this.pick() + " ";
                    }
function history(){
 var facts = "";
 names = names.pickAndPad();
 facts += names
 facts += " killed more than "
 facts += Math.floor(Math.random()*10000)
  facts += "people "
 facts += issues.pickAndPad();
 facts += "ruins more lives. Read about " + names + "on Wikipedia. Stay woke.";
 return facts.trim();
}

function tweet() {
	var tweetText = history();
	if (debug)
		console.log(tweetText);
	else
		T.post('statuses/update', {status: tweetText }, function(err, reply) {
			if (err !== null) {
				console.log('Error: ', err);
			}
			else {
				console.log('Tweeted: ', tweetText);
			}
		});
}
function run() {
	tweet();
}

// console.log(history().length);

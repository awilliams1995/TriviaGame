$( document ).ready(function(){

var	triviaGameOptions = {

	question1: {

		question: "Place question 1 here",
		choice1: "incorrect choice",
		choice2: "incorrect choice",
		choice3: "correct choice",
		choice4: "incorrect choice",
		correctChoice: "correct choice"
	},
	question2: {

		question: "Place question 2 here",
		choice1: "correct choice",
		choice2: "incorrect choice",
		choice3: "incorrect choice",
		choice4: "incorrect choice",
		correctChoice: "correct choice"
	},
	question3: {

		question: "Place question 3 here",
		choice1: "incorrect choice",
		choice2: "correct choice",
		choice3: "incorrect choice",
		choice4: "incorrect choice",
		correctChoice: "correct choice"

	},
	question4: {

		question: "Place question 4 here",
		choice1: "incorrect choice",
		choice2: "incorrect choice",
		choice3: "incorrect choice",
		choice4: "correct choice",
		correctChoice: "correct choice"

	},
	question5: {

		question: "Place question 5 here",
		choice1: "incorrect choice",
		choice2: "incorrect choice",
		choice3: "incorrect choice",
		choice4: "correct choice",
		correctChoice: "correct choice"

	},
	question6: {

		question: "Place question 6 here",
		choice1: "correct choice",
		choice2: "incorrect choice",
		choice3: "incorrect choice",
		choice4: "incorrect choice",
		correctChoice: "correct choice",

	}

};
 function questionAdder(){
 		//var this = triviaGameOptions["question" + (Object.keys(triviaGameOptions).length+1)];
 		this.question = prompt("what would your question be?");
 		this.choice1  = prompt("what would your first choice be?");
 		this.choice2  = prompt("what would your second choice be?");
 		this.choice3  = prompt("what would your third choice be?");
 		this.choice4  = prompt("what would your fourth choice be?");
 		choices =  [];
 		for (var i =1; i < Object.keys(this).length; i++) {
 			choices.push(i+ " : " + this[Object.keys(this)[i]]);
 		}
 		this.correctChoice = this["choice" + prompt(choices.join("\n")+"\nwhich of the above options, is the correct answer?", "Please select 1,2,3 or 4")];

 			while(String(this.correctChoice) == "undefined"){
 		this.correctChoice = this["choice" + prompt(choices.join("\n")+"\n INVALID INPUT --> please enter one of the following characters: 1 2 3 4", "1 2 3 4")];
 			}
 	
 		return this;
}
  	if(confirm("do you want to add your own questions and answers to this game?")){
 		
 		var that = new questionAdder();
 		triviaGameOptions["question" + (Object.keys(triviaGameOptions).length+1)] = that;

 	};
var counter;
var round;
var actualTimerToBeCleared;
var correctAnswers;
var incorrectAnswers;
var unanswered;
var gameOver = false;


var timer = function(){
	counter = 30;
	$(".timer").html(counter);
	actualTimerToBeCleared = setInterval(countDown, 1000);
};

function clearTimer(){
	clearInterval(actualTimerToBeCleared);
}
function gameOverCheck(){

if(correctAnswers+incorrectAnswers+unanswered == Object.keys(triviaGameOptions).length){

$("<div>").html("Game Over").appendTo("#gameBox");
$("<div>").html("Correct answers " + correctAnswers).appendTo("#gameBox");
$("<div>").html("Incorrect answers " + incorrectAnswers).appendTo("#gameBox");
$("<div>").html("Unanswered questions " + unanswered).appendTo("#gameBox");
$("#start").css("display","inline-block");
gameOver = true;
clearTimer();

}

}

function choiceListener(){

$(".choice").on("click",function(){
round++;	
var roundBeingAnalyzed = round -1;
var correctAnswerCheck = triviaGameOptions["question"+ roundBeingAnalyzed][$(this).attr("id")] == triviaGameOptions["question"+ roundBeingAnalyzed]["correctChoice"];
console.log(correctAnswerCheck);
if(correctAnswerCheck){
	clearTimer();
	correctAnswers++;
$("#gameBox").html("yes " + triviaGameOptions["question"+ roundBeingAnalyzed]["correctChoice"] + " was the correct choice!");
setTimeout(populateDiv,5000,triviaGameOptions["question"+ round]);
}
else{
	clearTimer();
incorrectAnswers++;
$("#gameBox").html("Wrong!"+triviaGameOptions["question"+ roundBeingAnalyzed]["correctChoice"] + " was the correct choice!");
setTimeout(populateDiv,5000, triviaGameOptions["question"+ round]);
}
});

}

function countDown(){
	if(counter>0){
	counter--;
	$(".timer").html(counter);
	console.log("got executed now");
}
		else if(counter==0){
			clearTimer();
			round++;
			var roundBeingAnalyzed = round -1;
			$("#gameBox").empty();
			$("#gameBox").html("Out Of Time! " + triviaGameOptions["question"+ roundBeingAnalyzed]["correctChoice"] + " was the correct choice!");
			unanswered++;
			setTimeout(populateDiv,5000,triviaGameOptions["question"+ round]);
			//out of time buddy

			}

}


function populateDiv(item){

	gameOverCheck();
if (!gameOver){

	$("#gameBox").empty();

	$("<div>").attr("id","question").html(item.question).appendTo("#gameBox");
for (var i = 1; i < 5 ; i++) {

	$("<button>").attr("id",("choice"+i)).attr("class","choice").html(item["choice" +i]).appendTo("#gameBox");
	$("#gameBox").append("<br>");

}
	timer();
	choiceListener();
}

}


$(".start").on("click",function(){
correctAnswers = 0;
console.log("start event executed");
incorrectAnswers = 0;
unanswered = 0;
round= 1;
gameOver = false;
counter = 30;
$(this).hide();
populateDiv(triviaGameOptions["question"+ round]);
});




});	






var message = "Hello";
message.length;
182 + 42
224 - 182;
//you have written 182 character, you have -42 left.
var tweet = prompt("Complete your tweet");
var tweetUnder140 = tweet.slice(0, 140);
alert(tweetUnder140);
var tweetCount = tweet.length;
alert("You have written " + tweetCount + " characters, you have " + (140 - tweetCount) + " characters remaining.");
alert(prompt("Compose your tweet").slice(0,14));
tweet.toUpperCase


var name = prompt("What is your name?");
var firstChar = name.slice(0, 1);
var upperCaseFirstChar = firstChar.toUpperCase();
var restOfChar = name.slice(1, name.length);
restOfChar = restOfChar.toLowerCase();
var capitalName = upperCaseFirstChar + restOfChar;
alert("Hello, " + capitalName);


var dogAge = prompt("How old is your dog? ");
var humanAge = (dogAge - 2) * 4 + 19;
alert("Your dog is " + humanAge + " years old in human years")

function lifeInWeeks(age) {

age = 90 - age
var xDays = 365 * age;
var yWeeks = 52 * age;
var zMonths = 12 * age;
console.log("You have "+ xDays +" days, " + yWeeks + " weeks, and "+ zMonths + " months left. ");
}

lifeInWeeks(56);

function getMilk(money, costPerBottles) { 
  console.log("leaveHouse");
  console.log("moveRight");
  console.log("moveRight");
  console.log("moveUp");
  console.log("moveUp");
  console.log("moveUp");
  console.log("moveUp");
  console.log("moveRight");
  console.log("moveRight");
  console.log("buy "+ calBottles(money, costPerBottles) +" bottles of milk")
  console.log("moveLeft");
  console.log("moveLeft");
  console.log("moveDown");
  console.log("moveDown");
  console.log("moveDown");
  console.log("moveDown");
  console.log("moveLeft");
  console.log("moveLeft");
  console.log("enterHouse"); 
  return calChange(money, costPerBottles);
}
function calBottles (startingMoney, costPerBottles){
  var numberOfBottles = Math.floor(startingMoney / costPerBottles);
  return numberOfBottles;
}
 function calChange(startingAmount, costPerBottles){
   var change = startingAmount % costPerBottles;
   return change;
 }
console.log("Master here is your " + getMilk(6, 1.5) +  " change.");


var n = Math.random() * 100;
n = Math.floor(n) + 1;
console.log(n);
var userName = prompt("Insert your name here");
var crushName = prompt("Insert your Crush here");


if(n >= 88 && n <=100){
 alert("Your love percentage is " + n + "% awwwwww that's cute NOW DIE TOGETHER!!!" );
} 
if(n >=70 && n <=88 ){
 alert("Your love percentage is " + n + "% still 50% chances getting divorce" );
}
if(n >=41 && n <=69 ){
 alert("Your love percentage is " + n + "% divorce 100%");
}
if(n >=20 && n <=40 ){
  alert("Your love percentage is " + n + "% sorry i guess you can watch Breaking Bad now" );
}
if(n >=0 && n <=19 ){
 alert("Your love percentage is " + n + "% sorry i guess you can kill yourself now" );
}
function isLeap(year) {
    
    if(year / 4 === 0){
       return "Leap Year"; 
    } else{
            
    }
}
sLeap(40);

var guestList = ["Angela", "Pam", "James", "Elsa", "Paul"];
var guestName = prompt("Enter your name");
if (guestList.includes(guestName)){
    alert("Welcome")
} else{
   alert("Sorry, maybe try again"); 
}
console.log(guestList[0]);

var numberOfBottles = 99
while (numberOfBottles >= 0) {
    var bottleWord = "bottle";
    if (numberOfBottles === 1) {
        bottleWord = "bottles";
    } 
    console.log(numberOfBottles + " " + bottleWord + " of beer on the wall");
    console.log(numberOfBottles + " " + bottleWord + " of beer,");
    console.log("Take one down, pass it around,");
	numberOfBottles--;
    console.log(numberOfBottles + " " + bottleWord + " of beer on the wall.");
}

var output = [];
function fizzBuzz(){
        for (var count = 1; count < 101; count++){   
        if(count % 3 === 0 && count % 5 === 0){
            output.push("fizzBuzz");
            
        } else if (count % 3 === 0 ){
            output.push("Fizz");
        } else if(count % 5 === 0){
            output.push("Buzz");
        } else{
         output.push(count);   
        }
        console.log(output); 
            
    }        
}


function fibonacciGenerator (n) {
    var output = [];
      if (n === 1) {
          output = [0];
      } else if (n === 2){
           output[0, 1];       
      } else {
          output = [0, 1];
          for (var i = 0; i < n; i++){
              output.push(output[output.length - 2] + output[output.length - 1])
          }
      }
     return output;
}
    
output = fibonacciGenerator(100);
console.log(fibonacciGenerator)

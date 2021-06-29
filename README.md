# DogVsCat-TTT-ChromeExtension
*it was the Game concept of Tic tac toe*
Game was Tested in Two Browser Chrome,Edge Get good result Tic tac toe game in DogvsCat Download and play get relax
It was to Two Player Mode One was User and Another End was Computer .
### Game Explain
- User Give input in Username Field
- Selecting Avatar and Who begins(it disabled of Enemy)
- Press Start Game

![](https://i.snipboard.io/0mCn27.jpg)

And Play with Your Chrome Extension Tic Tac Tao Version Of Dog Vs Cat 
### Game Template Explain and Structure
left  Top Logo Present And Beside Draw and Win Message Display and Board Area With 9 Cells  Top of Board User Name and Logo is Display and Bottom Enemy Name and Logo Present. When Click Each Cell in Your Turn It Display Your Selected Avatar in Cell In Each Turn Validate Cells in And Display the Message

![](https://snipboard.io/IMXqwx.jpg)
Reset Button Fix and Updates will Soon ..
### Code Explain..
Nine Function Defined Three Sub Function It Play Around With the With in the Functions 

- Get Data Function and Separate Players Function
- minmax algorithm Parameter of two Current Board and Player
- Display move in Template 
- Boolean Function Win or Draw and Display Message 
- Winning it is a sub Function Help more in Code 
- EmptyCollecting Arry Function It will Decide Darw mostly in minimax function
- Two input Entries They are two functions
- Computer move Function

### JavaScript Code
#### Data Collector:
```javascript
function addData(Username,Avatar,Begins,Players){
	let player2 = {}
	let player1 = Players[Avatar]
	player1.name = Username
	player1.Start = Begins
	if (Avatar == 0){
		player2 = Players[1]
	}
	if (Avatar == 1){
		player2 = Players[0]	
	}
	//assign to two constant variable
	Userplayer = player1
	Computerplayer= player2
};
```
This Function was Starting Terminal panel Functon Creating The player modal Finally Dividing into Single Object of UserPlayer and ComputerPlayer .The Player Object is Sturctured 
#### Player Object:
```javascript
{   
    Charater:"_Name_in_Board_",
    name:"__UserName",
    profile:"Logo_Of_Player",
    icon:"Icon_of_The_Player",
    Start:0 // how start game 0 first 1 Second
}
```
In Two Player Object Have The Sturcture Data Userplayer UserSelected Object present other in Computerplayer Object Call of object Get value Place in The functions More function of Dict Explain in Further Sessions..
#### Checker In Game:
```javascript
//Boolean Function To get Win or Loose form here
function winning(Board,player){
	if(Board[0]==player.Charater && Board[1]==player.Charater && Board[2]==player.Charater||
		Board[3]==player.Charater && Board[4]==player.Charater && Board[5]==player.Charater||
		Board[6]==player.Charater && Board[7]==player.Charater && Board[8]==player.Charater||
		Board[0]==player.Charater && Board[3]==player.Charater && Board[6]==player.Charater||
		Board[1]==player.Charater && Board[4]==player.Charater && Board[7]==player.Charater||
		Board[2]==player.Charater && Board[5]==player.Charater && Board[8]==player.Charater||
		Board[0]==player.Charater && Board[4]==player.Charater && Board[8]==player.Charater||
		Board[2]==player.Charater && Board[4]==player.Charater && Board[6]==player.Charater){
		return true 
	}
	else{
		return false
	}
};
```
This Lines Of Code Says Checking Winning Or not Winnig  By the Functions .Winning Function Two Parameter Present Board == Current Board Status ,player is Object of Player like Userplayer or ComputerPlayer winning means return true and it Checking horizontal ,vertical, and Diagonal this are the functionality of Functions 
#### Message Display in Template
```javascript
function winordraw(){
	if(winning(Board,Userplayer)){
		// Sending to Template(index.html)
		document.getElementById("messages-display").innerHTML=`${ Userplayer.name}! Won the match`
		return true
	}
	if(winning(Board,Computerplayer)){
		// Sending to Template(index.html)
		document.getElementById("messages-display").innerHTML =`${ Computerplayer.name}! Won the match`
		return true
	}
	let current= CollectEmpty(Board)
	if(current.length == 1){
		// Sending to Template(index.html)
		document.getElementById("messages-display").innerHTML =`<p>---Match is Draw-- </p>`
		return true
	}
	else{
		return false
	}	
};
```
This Function of code in Boolean and MessageSender to `index.html` and Show the Message in Game it was active in button Click Function `addEventListener` . there DOM Element Call Here.. We will Update This Function in Advance method will soon
#### Restart Game
```javascript
function RestartGame(){
	for(var id=0; id < 9; ++id){
		Board[id] = id
		if(Board[id]===id){
			// Sending to Template(index.html)
			let HTMLkey =`block${id}`	
			document.getElementById(HTMLkey).innerHTML=`<img src="/images/defaulticon.jpg">`
			document.getElementById(HTMLkey).getAttributeNode("value").value=`${id}`
			document.getElementById("messages-display").innerHTML =`<p>let's Play</p>`
		}	
	}
};
```
This line of Code Keep For User Want To Play Continuosly in Extension So Restart Button was Updated in this extension in this lines Restart the board in starting stage and template also Thorugh the For Looping of Board
```javascript
function CollectEmpty(Current){
	 return Current.filter(c=> c!=Computerplayer.Charater && c!=Userplayer.Charater)	
};
```
it Return the Array of Avalible Cell We Want To Store in variable most Calling
Functions in Extension 
### MiniMax Algorithm
minimax algorithm it was ai processing code The line of Code implementated in Chess Game  and started implemented in Two players Game. like tic tac toe,Chess and etc..
minimax is Know as Game Theory. I learned through the blogs  [GreekforGreek](https://www.geeksforgeeks.org/minimax-algorithm-in-game-theory-set-1-introduction/) , [Github_user](https://github.com/ahmadabdolsaheb/minimaxarticle)
and Refer Those Links Know More Knowlege
- players
    ```javascript
    function minimax(StaticBoard, player)
    ```
- Conditions To Score like
    - tie = 0
    - Computer = 1
    - human = -1
    ```javascript
    if (winning(StaticBoard, Userplayer)){
     		return {score:-1};
  	}
  	//Computer player is maxmizing Player
	else if (winning(StaticBoard, Computerplayer)){
    		return {score:1};
	}
	// Draw Condition Fields Want Empty
  	else if (Possiblespots.length == 0){
  		return {score:0};
  	}
    ```
    - by For Loop of Possiblespots get from `CollectEmpty()` function
- make Terminal of Game in minimax Funtion
    - Use players play game in regression method by Call Function of minimax function
    ```javascript
        //computer Playing vs his artifial Player
    	if (player.Charater == Computerplayer.Charater){
      		var result = minimax(StaticBoard, Userplayer);
      		move.score = result.score;
    	}
    	else{
      		var result = minimax(StaticBoard,Computerplayer);
     		move.score = result.score;
    	}
    	StaticBoard[Possiblespots[i]] = move.spot;
   		moves.push(move);
    ```
    - Storing the value variable and reset the board moment was repeat again and again
- final Analysis of Store Value in array of object index spot and score
     ```javascript
     //final discuss happened here..
	var bestMove;
  	if(player.Charater === Computerplayer.Charater){
		var bestScore = -10000;
		for(var i = 0; i < moves.length; i++){
			if(moves[i].score > bestScore){
        			bestScore = moves[i].score;
        			bestMove = i;
      		}
    	}
  	}
	else{
    		var bestScore = 10000;
    		for(var i = 0; i < moves.length; i++){
			if(moves[i].score < bestScore){
        			bestScore = moves[i].score;
        			bestMove = i;
      		}
    	}
	}
	//Selected the Best move from final discuss
	return moves[bestMove];
     ```
    - return the Final in Spot Object value 
    ```javascript
    var keys = minimax(Board,Computerplayer)
    // Getting The value
   console.log(keys.spot) 
    ```
full Code of minimax Algorithm Try in Your Project And Get active Results
### Template Connection
Contact of frist panel extension get value of input the username ,avatar selection and Starter Selection this function Scripted with `AddEventListener`, `ForEach`, other Function by `lib/jquery-3.6.0.js`   and Game loop also was coded. 
for Style Used css File `index.css` 
one of the addEventlistener function in `index.js`. show here
```javascript
// Icon clicking Function Here ...
Cells.forEach(Cell=>{
	Cell.addEventListener("click" ,()=>{
		//Get value of Template Selected Cell...
		if(Cell.attributes.value.value !== "fill"){
			if(winordraw()==false){
				//Placeing the value in board  and template(index.html)
				Humaninput(Cell.attributes.value.value)
				Computeinput()
			}
		}
	});	
});
```
more See in Code of `index.js`
### Dog Vs Cat Extension Works Pictures..

![](https://snipboard.io/cIGiY5.jpg)
Default player names *johnkitty* , *Johnpappy*
![](https://snipboard.io/A6kJU7.jpg)
#### Thank you for Read!.
Created by Joel T George

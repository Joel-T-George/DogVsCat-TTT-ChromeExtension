//make two player in one array
//html Selection and input Getting
// author -- Joel T George 
// date created -- 28-06-2021 

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
//Game Changing algrothim --minimax--
function minimax(StaticBoard, player){
	//making Possible Field to Play
	var Possiblespots = CollectEmpty(StaticBoard)
	//fixing The Rules to The Algrothim
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
	var moves = [];  
  	for (var i = 0; i < Possiblespots.length; i++){
    	var move = {};
  		move.spot = StaticBoard[Possiblespots[i]];
    	StaticBoard[Possiblespots[i]] = player.Charater;


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
  	}
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
};

//Computer  Player Moving in Template through this function
function Computeinput(){
	// Computer player take Best move From Here
	var keys = minimax(Board,Computerplayer)
	Displaymove(keys.spot,Computerplayer)
};

//Display in template through this function
function Displaymove(id,player){
	key = parseInt(id)
	if (Board[key] !== Userplayer.Charater || Board[key] !== Computerplayer.Charater ){
		let HTMLkey =`block${id}`
		Board[key] =  player.Charater;
		document.getElementById(HTMLkey).innerHTML=`<img src="/images/${ player.icon}">`
		document.getElementById(HTMLkey).getAttributeNode("value").value="fill"	
	}
	if(Board[key] == Userplayer.Charater || Board[key] == Computerplayer.Charater){
		return 
	}
};

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

//Game was Running through this Function player loose ,win and draw get from here
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

//Game Restart From Calling The function
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

//Getting Userinput from the Template(index.html)
function Humaninput(id){
	Displaymove(id,Userplayer)	
};

//Function that collecting Avalabile Cells
function CollectEmpty(Current){
	 return Current.filter(c=> c!=Computerplayer.Charater && c!=Userplayer.Charater)	
};

//Declare the Variables-- 
const Username = document.getElementById("username")
const Avatar = document.querySelectorAll(".avatar")
const GameBeginswith = document.querySelectorAll(".starter")
const Submit =document.querySelector("#startgame")
const Cells = document.querySelectorAll(".cell")
const Restart = document.querySelector(".Restart")
//Players and Board
const Players = [{Charater:"Cat",name:"JohnKitty",profile:"profilecaticon.png",icon:"caticon.jfif",Start:0},{Charater:"Dog",name:"Johnpappy",profile:"profiledogicon.png",icon:"dogicon.jfif",Start:0}]
var Userplayer ={},Computerplayer={}
const Board =[0,1,2,3,4,5,6,7,8]
//Userselection of avator and begins..
//variables get information template(index.html)
var nameofUser,Gamebegin,avatar,movekey=" "
// ------AVATAR SELECTED BY USER-----
Avatar.forEach((Selected)=>{
	Selected.addEventListener("click",()=>{
		avatar = parseInt(Selected.value)	
	});
});

// ------GAME STARTS SELECTED BY USER-----
GameBeginswith.forEach((Selected)=>{
	Selected.addEventListener("click",()=>{
		Gamebegin=parseInt(Selected.value)
	});

});

// ------INPUT SUBMITING PROCESS HERE----
Submit.addEventListener("click",()=> {
	addData(Username.value,avatar,Gamebegin,Players)
	$("#Gamewindow").removeClass("not-visibilty")
	$(".logo").removeClass("not-visibilty")
	$("#Userselection").addClass("not-visibilty")	
	document.getElementById("Userprofiles").innerHTML +=`<img class="a" src="/images/${Userplayer.profile}" alt="Gameusercode"><span>${Userplayer.name}</span>`
	document.getElementById("enemyprofiles").innerHTML +=`<img class="a" src="/images/${Computerplayer.profile}" alt="Gameenemycode"><span>${Computerplayer.name}</span>`	
});

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

//Game Restarting ...
Restart.addEventListener("click",()=>{
	RestartGame()	
});
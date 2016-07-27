$(document).ready(function(){
	var world = [
		[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2], 
		[2, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
		[2, 1, 1, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 1, 1, 2, 1, 1, 2],
		[2, 1, 1, 2, 1, 2, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
		[2, 1, 1, 2, 1, 2, 2, 2, 1, 1, 2, 1, 2, 2, 2, 2, 2, 1, 2],
		[2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 2],
		[2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1, 2],
		[2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2],
		[2, 1, 1, 2, 2, 2, 2, 2, 1, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2],
		[2, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
		[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
	]
	var score = 0; 
	document.getElementById('score').innerHTML = score;

	var pacman = {
		x: 1,
		y: 1 
	}
	var ghost = {
		x: 15,
		y: 5 
	}

	// function that displays the world of Pacman
	function displayWorld(){
		var output = "";

		for(var i = 0; i<world.length; i++){
			output += "\n<div class='row'>\n"
			for(var j = 0; j<world[i].length; j++){
				if(world[i][j] == 2){
					output += "<div class='brick'></div>";
				}
				else if(world[i][j] == 1){
					output += "<div class='coin'></div>";
				}
				else if (world[i][j] == 0){
					output += "<div class='empty'></div>";
				}
				else if (world[i][j] == 3){
					output += "<div class='grape'></div>";
				}
			}
			output += "\n</div>"
		}
		document.getElementById('world').innerHTML = output;
	}
	displayWorld();

	// function that shifts the position of Pacman 
	function displayPacman(){
		document.getElementById('pacman').style.top = pacman.y*20 + "px"
		document.getElementById('pacman').style.left = pacman.x*20 + "px"
	}
	displayPacman();

	function displayGhost(){
		document.getElementById('ghost').style.top = ghost.y*20 + "px"
		document.getElementById('ghost').style.left = ghost.x*20 + "px"
	}
	displayGhost();

	resume = true;
	function moveGhost(){
		if(resume != true){
			return;
		}
		choice = Math.floor(Math.random()*4)+1
		if(choice == 1 && world[ghost.y][ghost.x+1] != 2){
			ghost.x++;
			displayGhost();
		}
		else if(choice == 2 && world[ghost.y+1][ghost.x] != 2){
			ghost.y++;
			displayGhost();

		}
		else if(choice == 3 && world[ghost.y][ghost.x-1] != 2){
			ghost.x--;
			displayGhost();

		}
		else if(choice == 4 && world[ghost.y-1][ghost.x] != 2){
			ghost.y--;
			displayGhost();
		}

		if(ghost.y == pacman.y && ghost.x == pacman.x){
			$('body').append('<div id="result"><font face="courier" style="margin: 30px">GAME OVER</font><button type="button" onClick="window.location.reload();"><font face="courier">Restart?</font></button></div>')
			resume = false;
		}else{
			//keep calling the moveGhost function
			setTimeout(moveGhost, 100)
			
		}
	}
	moveGhost();

	//console.dir(document) --> shows properties of the document
	document.onkeydown = function(e){
		//for different browsers, different things are passed
		if(resume == true){
			// different keydowns that affect the movement of pacman 
			if(e.keyCode == 37 && world[pacman.y][pacman.x-1] != 2){
				//left
				pacman.x--;
				displayPacman();
				document.getElementById('pacman').style.transform = "rotate(180deg)"
			}
			else if(e.keyCode == 38 && world[pacman.y-1][pacman.x] != 2){
				//up
				pacman.y--;
				displayPacman();
				document.getElementById('pacman').style.transform = "rotate(270deg)"
			}
			else if(e.keyCode == 39 && world[pacman.y][pacman.x+1] != 2){
				//right
				pacman.x++;
				displayPacman();
				document.getElementById('pacman').style.transform = "rotate(0deg)"
			}
			else if(e.keyCode == 40 && world[pacman.y+1][pacman.x] != 2){
				//down
				pacman.y++;
				displayPacman();
				document.getElementById('pacman').style.transform = "rotate(90deg)"
			}

			// when pacman encounters 1 (coin), set the space to empty, increase score by 10
			if(world[pacman.y][pacman.x] == 1){
				world[pacman.y][pacman.x] = 0;
				score ++;
				document.getElementById('score').innerHTML = score*10;
				displayWorld();
			}
			// when pacman ecounters 3 (grape), set the space to empty, increase score by 30
			if(world[pacman.y][pacman.x] == 3){
				world[pacman.y][pacman.x] = 0;
				score += 3;
				document.getElementById('score').innerHTML = score*10;
				displayWorld(); 
			}
		}
	}

})
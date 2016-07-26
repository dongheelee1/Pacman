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
	var rotation = 0; 
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

	// function that shifts the position of Pacman 
	function displayPacman(){
		document.getElementById('pacman').style.top = pacman.y*20 + "px"
		document.getElementById('pacman').style.left = pacman.x*20 + "px"
	}
	function displayGhost(){
		document.getElementById('ghost').style.top = ghost.y*20 + "px"
		document.getElementById('ghost').style.left = ghost.x*20 + "px"
	}
	displayWorld();
	displayPacman();
	displayGhost();

	//console.dir(document) --> shows properties of the document
	document.onkeydown = function(e){
		//for different browsers, different things are passed
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
		console.log(e.keyCode);

		if(world[pacman.y][pacman.x] == 1){
			world[pacman.y][pacman.x] = 0;
			score ++;
			document.getElementById('score').innerHTML = score*10;
			displayWorld();
		}
		if(world[pacman.y][pacman.x] == 3){
			world[pacman.y][pacman.x] = 0;
			score += 3;
			document.getElementById('score').innerHTML = score*10;
			displayWorld(); 
		}
	}
})
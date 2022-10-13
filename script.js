class Race{
// Class for wrap aroung the methods to draw the track field and to
// frezee (stop) and reset the race.
	constructor(){
		this.participants =[];
		this.winner = false;
	}
	get getWinner(){
		return this.winner;
	}
	set setWinner(boolean){
		this.winner = boolean;
	}
	// Participants have to be added to the race using addParticipants.
	addParticipants = (array) =>{
		array.forEach((participant) =>{
			this.participants.push(participant);
		});
	};
	drawLine = (xPos,yPos, width, height, context) =>{
		context.fillRect(xPos,yPos, width, height, context);
	};
	writeText = (message, xPos, yPos, context) =>{
		context.font = "bold 12pt times";
		context.fillText(message, xPos, yPos);  
	};
	createResetButton = (xPos, yPos, canvas) =>{
		this.resetButton = document.createElement("button");
		this.resetButton.textContent = "Reset";
		this.resetButton.style.left = `${xPos}px`;
		this.resetButton.style.top = `${yPos}px`;
		canvas.insertAdjacentElement("afterend", this.resetButton);
		this.resetButton.addEventListener("click", this.resetRace);
	};
	freezeRace = () =>{
		this.participants.forEach((participant) => {
			participant.diamond.removeEventListener("click", participant.move);
			participant.setFrozen = true;	
		});
	};
	resetRace = () =>{
		this.participants.forEach((participant) =>{
			participant.setRacePosition = 0;
			participant.diamond.style.left = `${participant.xPos}px`;
			participant.box.style.color = "black";
			participant.updateScore();
			if(participant.getFrozen === true){
				participant.diamond.addEventListener("click", participant.move);
				participant.setFrozen = false;
			}
		});
	};
}
class Participant{
// Class for creating a new participant and the diamond and score associated with it
	constructor(race, color, xPos, yPos, xSize, ySize, scoreXPos, scoreYPos, canvas){
		this.race = race;
		this.xPos = xPos;
		this.yPos = yPos;
		this.xSize = xSize;
		this.ySize = ySize;
		this.scoreXPos = scoreXPos;
		this.scoreYPos = scoreYPos;
		this.canvas = canvas;
		this.racePosition = 0;
		this.frozen = false;
		// DIAMOND - Drawing, adding event handler and styling.
		this.diamond = document.createElement("div");
		this.diamond.setAttribute("class", "diamond");
		canvas.insertAdjacentElement("afterend", this.diamond);
		this.diamond.addEventListener("click", this.move);

		this.diamond.style.background = color;
		this.diamond.style.left = `${this.xPos}px`;
		this.diamond.style.top = `${this.yPos}px`;
		this.diamond.style.width = `${this.xSize}px`;
		this.diamond.style.height = `${this.ySize}px`;
		// RECTANGLE - Drawing and styling it next to the score box
		this.rect = document.createElement("div");
		this.rect.setAttribute("class","rectangle");
		this.rect.setAttribute("id", color);
		canvas.insertAdjacentElement("afterend", this.rect);

		this.rect.style.background = color;
		this.rect.style.left = `${scoreXPos}px`;
		this.rect.style.top = `${scoreYPos}px`;        
		// SCORE BOX - Drawing and event handling
		this.box = document.createElement("div");
		this.box.setAttribute("class","scoreBox");
		this.box.innerHTML = this.getRacePosition;
		canvas.insertAdjacentElement("afterend", this.box);
		this.box.style.left = `${scoreXPos}px`;
		this.box.style.top = `${scoreYPos-2}px`;
	}
	get getX(){
		this.temp = this.diamond.style.left.slice(0,-2);
		return parseInt(this.temp, 10);
	}
	set setX(xPos){
		this.diamond.style.left = `${xPos}px`;
	}
	get getRacePosition(){
		return parseInt(this.racePosition,10);
	}
	set setRacePosition(int){
		this.racePosition = int;
	}
	get getFrozen(){
		return this.frozen;
	}
	set setFrozen(boolean){
		this.frozen = boolean;
	}
	move = () =>{
		this.setRacePosition = this.getRacePosition +1;
		this.setX = this.getX +50;
		this.updateScore(this.counterX,this.counterY);
	};
	updateScore = () =>{
		if(this.getRacePosition<10){
			return this.box.innerHTML = this.getRacePosition;
		}else{
			this.race.setWinner = true;
			this.box.style.color = "red"; 
			this.box.innerHTML = this.getRacePosition;  
			this.race.freezeRace();        
		}
	};
}
window.onload = function init() {
// ACCESING TO THE CANVAS ELEMENT IN THE DOM
	const mainCanvas = document.getElementById("race_track");
	const mainCtx = mainCanvas.getContext("2d");
	// STARTING THE RACE
	var diamondRace = new Race();
	// CREATING LINES, TEXTS AND BUTTON:
	// Start Line
	diamondRace.drawLine(17, 17, 2, 252.32, mainCtx);
	// End Line
	diamondRace.drawLine(517, 17, 2,252.32,mainCtx);
	// Texts and button
	diamondRace.writeText("Start", 0, 12, mainCtx);
	diamondRace.writeText("End", 503, 12, mainCtx);
	diamondRace.writeText("Score Board", 594, 95, mainCtx);
	diamondRace.createResetButton(700,100,mainCanvas);
	// CRETING THE PARTICIPANTS
	var blue = new Participant(diamondRace, "blue", 109,103, 34, 34, 700, 175, mainCanvas);
	var green = new Participant(diamondRace, "green", 109, 162, 34, 34, 700, 195, mainCanvas);
	var red = new Participant(diamondRace, "red", 109, 220,34, 34, 700, 215, mainCanvas);
	var yellow = new Participant(diamondRace, "yellow", 109, 280, 34, 34, 700, 235, mainCanvas);
	var participantsArray =[blue, green, red, yellow];
	diamondRace.addParticipants(participantsArray);
};
let Typer={
console: null,
text: null,
accessCountimer:null,
index:0, // current cursor position
speed:2, // speed of the Typer
file:"", // file
	init: function(){
		accessCountimer=setInterval(function(){Typer.blinker();},500); // inizialize timer for blinking cursor
		let xmlhttp, text;
		xmlhttp = new XMLHttpRequest();
		xmlhttp.open('GET', Typer.file, false);
		xmlhttp.send();
		Typer.text = xmlhttp.responseText;
	},

	content: function(){
		return document.getElementById("console").innerHTML;
	},

	addText: function(){// Main function to add the code
		if(Typer.text){ // if text is loaded
			let cont=Typer.content(); // get the console content
			if(cont.substring(cont.length-1,cont.length)=="|") {// if the last char is the blinking cursor
				this.console.innerHTML = this.console.innerHTML.replace('|',''); // remove it before adding the text
			}
			Typer.index+=Typer.speed;	// add to the index the speed
			let text=Typer.text.substring(0,Typer.index)// parse the text for stripping html enities
			let rtn= new RegExp("\n", "g"); // newline regex
			text = text.replace(rtn,"<br>");
			this.console.innerHTML = text;
		}
	},

	blinker: function(){ // blinking cursor
		let cont=this.content();
		if(cont.substring(cont.length-1,cont.length)=="|") {// if last char is the cursor
			this.console.innerHTML = this.console.innerHTML.replace('|','');
		}
		else {
			this.console.innerHTML += "|";
		}
	}
}

Typer.speed=3;
Typer.file="tinusf.txt";
Typer.console = document.getElementById("console");
Typer.init();
 
let timer = setInterval("t();", 30);
function t() {
	Typer.addText();
	if (Typer.index > Typer.text.length) {
		clearInterval(timer);
	}
}
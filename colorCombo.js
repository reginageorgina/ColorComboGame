//colorCombo.js
var numCircles = 0;
var numSquares = 0;
var range = 0
var colorsS = [];
var colorsC = [];
var avgColor = "";
var circles = document.querySelectorAll(".circle");
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var message = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

init();

function init(){
	numCircles = 4;
	numSquares = 6;
  range = 50;
	for(var i = 0; i < modeButtons.length; i++){
	modeButtons[i].addEventListener("click",function(){
		modeButtons[0].classList.remove("selected");
		modeButtons[1].classList.remove("selected");
		modeButtons[2].classList.remove("selected");
		this.classList.add("selected");
		if(this.textContent === "Easy"){
			numSquares = 3;
      numCircles = 2;
      range = 100;
    }else if(this.textContent === "Intermediate"){
    	numSquares = 6;
      numCircles = 4;
      range = 50;
    }
		else{
    	numSquares = 9;
      numCircles = 6;
      range = 20;
    }
		reset();
		//more circles and squares for increased difficulty
	});
}
	for(var i=0; i < squares.length; i++){
	squares[i].addEventListener("click", function(){
		var clickedColor = this.style.backgroundColor;
		if(clickedColor === avgColor){
			message.textContent = "Correct!";
      message.style.color = 'limegreen';
			resetButton.textContent = "Play Again?";
			changeColors(clickedColor);
			h1.style.backgroundColor = clickedColor;
		}else{
			this.style.backgroundColor = "lavender";
			message.textContent = "Try Again";
      message.style.color = 'crimson';
			}
		});
	}
	reset();
}

function reset(){
	colorsS = randomColors(numSquares);
  colorsC = randomColors(numCircles);
	resetButton.textContent="New Colors";
	message.textContent="";
  pickColor();
  for(var i = numCircles; i < circles.length; i++){
		circles[i].style.backgroundColor = "lavender";
	}
	for(var i = 0; i < circles.length;i++){
		if(colorsC[i]){
			circles[i].style.display = "block";
			circles[i].style.backgroundColor = colorsC[i];
		}else
			circles[i].style.display = "lavender";
	}
  for(var i = 0; i < squares.length; i++){
		if(colorsS[i]){
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colorsS[i];
		}else
			squares[i].style.display = "none";
	}
  var random = Math.floor(Math.random() * colorsS.length);
  colorsS[random] = avgColor;
	h1.style.backgroundColor = "lavender";
}

resetButton.addEventListener("click",function(){
	reset();
})


function changeColors(color){
	for(var i = 0; i < squares.length; i++){
		squares[i].style.backgroundColor = color;
	}
  for(var i = 0; i < circles.length; i++){
		circles[i].style.backgroundColor = color;
	}
}

function pickColor(){
  var random = Math.floor(Math.random() * colorsS.length);
  colorsS[random] = avgColor;
  return avgColor;
}

function randomColors(num){
	var arr=[];
  var ar = 0, ag = 0, ab = 0;
	for(var i = 0; i < num; i++){
		var r = Math.floor(Math.random() * 256);
		var g = Math.floor(Math.random() * 256);
		var b = Math.floor(Math.random() * 256);
		var str="rgb("+r+", "+g+", "+b+")";
		arr.push(str);
    ar += r;
    ag += g;
    ab += b;
	}

  avgColor = "rgb("+~~(ar/num)+", "+~~(ag/num)+", "+~~(ab/num)+")";
	return arr;
}

function chosenColors(num){
	var arr=[];
	for(var i = 0; i < num; i++){
		var r = (avgColor + Math.floor(Math.random() * range - range/2))%256;
		var g = (avgColor + Math.floor(Math.random() * range - range/2))%256;
		var b = (avgColor + Math.floor(Math.random() * range - range/2))%256;
		var str="rgb("+r+", "+g+", "+b+")";
		arr.push(str);
	}

	return arr;
}

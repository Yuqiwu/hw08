var box = document.getElementById("box");
var ctx = box.getContext("2d");
var startit = document.getElementById("start");
var stopit = document.getElementById("stop");
var toggleit = document.getElementById("toggle");

// switch between mode
// 1 for grow and shrink
// 2 for dvd movement
var tog = 1; 

// grow and shrink properties
var ID1;
var stat = true;
var r = 0;

// dvd movement properties
var ID2;
var x = 100;
var y = 200;
var vx = 8;
var vy = 13;

var stop = function(){
    if (tog == 1){
	clearInterval(ID1);
    }
    else{
	clearInterval(ID2);
    }
}

var toggle = function(){
    stop();
    if (tog == 1){
	tog = 2;
    }
    else{
	tog = 1;
    }
    draw();
}

var clear = function(){
    box.innerHTML = null;
}

var draw = function(){
    stop();
    var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("fill", "red");
    var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("fill", "red");
    box.appendChild(circle);
    box.appendChild(rect);
    
    var animate1 = function(){	
	circle.setAttribute("cx", "250");
	circle.setAttribute("cy", "250");
	circle.setAttribute("r", toString(r) );
	status();
	ID1 = setInterval(animate1, 100);
	console.log("drawing circle");
    }

    var status = function(){
	if (stat == true){
	    r++;
	    if (r > 249){
		stat = false;
	    }
	}
	else{
	    r--;
	    if (r < 1){
		stat = true;
	    }
	}
    }

    var animate2 = function(){	
	rect.setAttribute("x", toString(x) );
	rect.setAttribute("y", toString(y) );
	rect.setAttribute("width", "20" );
	rect.setAttribute("height", "20" );	
	movement();
	ID2 = setInterval(animate2);
    }

    var movement = function(){
	if (x <= 0 || x >= 500){
	    vx = -vx;
	}
	if (y <= 0 || y >= 500){
	    vy = -vy;
	}
	x = x + vx;
	y = y + vy;
    }

    if (tog == 1){
	animate1();
    }
    else{
	animate2();
    }
}


draw();


startit.addEventListener("click", start);
stopit.addEventListener("click", stop);
toggleit.addEventListener("click", toggle);

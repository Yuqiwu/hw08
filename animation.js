var box = document.getElementById("box");
var startit = document.getElementById("start");
var stopit = document.getElementById("stop");
var toggleit = document.getElementById("toggle");

// switch between mode
// 1 for grow and shrink
// 2 for dvd movement
var tog = 1;

// timer ID
var ID = 0;

// animation status
var start = true;

// grow and shrink properties
var stat = true;
var r = 0;

// dvd movement properties
var x = 100;
var y = 200;
var vx = 6;
var vy = 9;

var stop = function(){
    start = false;
    clearInterval(ID);
}

var toggle = function(){
    stop();
    if (tog == 1){
	tog = 2;
	dvd();
    }
    else{
	tog = 1;
	grow();
    }
}

var clear = function(){
    box.innerHTML = null;
}

var grow = function(){
    clear();
    
    var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", "250");
    circle.setAttribute("cy", "250");
    circle.setAttribute("r", r.toString() );
    box.appendChild(circle);
    
    var animate = function(){
	circle.setAttribute("r", r.toString() );
	circle.setAttribute("fill", "red");
	status();
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
    
    ID = setInterval(animate, 10);
}

var dvd = function(){
    clear();

    var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("fill", "red");
    rect.setAttribute("width", "30" );
    rect.setAttribute("height", "20" );
    rect.setAttribute("x", x.toString() );
    rect.setAttribute("y", y.toString() );
    box.appendChild(rect);
    
    var animate = function(){
	rect.setAttribute("x", x.toString() );
	rect.setAttribute("y", y.toString() );
	movement();
    }

    var movement = function(){
	if (x <= 15 || x >= 485){
	    vx = -vx;
	}
	if (y <= 10 || y >= 490){
	    vy = -vy;
	}
	x = x + vx;
	y = y + vy;
    }
    ID = setInterval(animate,10);
}

var start = function(){
    if (start == false){
	if (tog == 1){
	    grow();
	}
	else{
	    dvd();
	}
	start = true;
    }
}


grow();


startit.addEventListener("click", start);
stopit.addEventListener("click", stop);
toggleit.addEventListener("click", toggle);

// function setup() {





// }



'use strict';

// These are the points of the outer edges of our map

// top left:
// x: -74.035960
// y: 40.790008
// top right:
// x: -73.902426
// y: 40.790008
// bottom left:
// x: -74.035960
// y: 40.684653
// bottom right:
// x: -73.902426
// y: 40.684653


let mappedPoints = [];
let w, h;
let speed = 0;
let pointInc = 0;
let LocationData;

// Lat and Long limiting positions of the canvas

let tl_x = -74.035960;
let tr_x = -73.902426;
let bl_y = 40.790008;
let br_y = 40.684653;


// Set the map and translate the geopoints into new formatted points

function setup() {

	loadJSON("http://localhost:3000/points", gotData, 'jsonp');

	w = window.innerWidth;
	h = window.innerHeight;
	var myCanvas = createCanvas(w, h);
    myCanvas.parent("map2");
  // transforming coordinates to mapped points and pushing them into the empty array of mappedPoints[]

}


function gotData(data) {

	LocationData = data;
	console.log(LocationData);

	for (let i = 0; i < LocationData.length; i++) {
		let mappedX = map(LocationData[i].x, tl_x, tr_x, 0, w);
		let mappedY = map(LocationData[i].y, bl_y, br_y, 0, h);
		let tempObj = {x: mappedX, y: mappedY}; 		//keeps the formatting of the array points
		mappedPoints.push(tempObj);
	}
	console.log(mappedPoints);

}


function draw() {



	background(220);
  	noStroke();
	fill(0, 0, 0);

  	// This for loop drwas the points on the map
  	for (let i = 0; i < mappedPoints.length; i++) {
    ellipse(mappedPoints[i].x, mappedPoints[i].y, 10, 10);
  }

  
  // ANIMATE THE LINES
  stroke(0, 0, 0);

  // This for loop goes through and draws the static lines
  for (let i = 0; i < pointInc; i++) {
    line(mappedPoints[i].x, mappedPoints[i].y, mappedPoints[i + 1].x, mappedPoints[i + 1].y);
  }

  // If our point incrementer is less than our mapped points length (minus one)
  // we know we need to animate between the point at our pointInc and the next point
  if (pointInc < mappedPoints.length - 1) {
	  // This gets the distance between our two points that we want to draw a line between 
	  let pointsDistance = dist(mappedPoints[pointInc].x, mappedPoints[pointInc].y, mappedPoints[pointInc + 1].x, mappedPoints[pointInc + 1].y);
	  	// If our speed is greater than or equal to the points distance we are done drawing the line,
    	// and we should increase our point incrementer and reset the speed to 0
	  if (speed >= pointsDistance) {
	    // We should have a check here to make sure that pointInc < mappedPoints.length - 1
	    pointInc++;
    	speed = 0;
	  } else {
	    // This is going to be a point between the start and end Xs,
	    // as expressed as a percent, which is the speed / pointsDistance
	    let percentComplete = speed/pointsDistance;
	    let x2 = map(percentComplete, 0, 1, mappedPoints[pointInc].x, mappedPoints[pointInc + 1].x);
	    let y2 = map(percentComplete, 0, 1, mappedPoints[pointInc].y, mappedPoints[pointInc + 1].y);
	   	line(mappedPoints[pointInc].x, mappedPoints[pointInc].y, x2, y2);
      // This is the speed of our line
	  	speed += 2.5;
	  }
	}

  }


var canvas = $("#paper")[0];
var c = canvas.getContext("2d");

var startX = 50;
var startY = 50;
var endX = 100;
var endY = 100;
var amount = 0;
setInterval(function() {
    amount += 0.05; // change to alter duration
    if (amount > 1) amount = 1;
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.strokeStyle = "black";
    c.moveTo(startX, startY);
    // lerp : a  + (b - a) * f
    c.lineTo(startX + (endX - startX) * amount, startY + (endY - startY) * amount);
    c.stroke();
}, 30);


/*********************************
Communicates between the Leap Motion and an Arduino Uno board. 
Uses Node.js to communicate over a web server, and uses
the Johnny-Five API to send commands to the Arduino.
Strobes faster or slower based on the number of fingers present.
**********************************/
public class Strobe
{
	
	var webSocket = require('ws'),
	   //creating web server
	    ws = new webSocket('ws://127.0.0.1:6437'),
	    five = require('johnny-five'),
	    //creating a new board
	    board = new five.Board(),
	    led, frame;
	
	//if board is on
	board.on("ready", function() 
	{
	  // Create an Led on pin 13
	  var led = new five.Led(13);
	  
	  ws.on('message', function(data, flags) 
		{
		      //parsing through the frames being sent from Leap Motion
	        frame = JSON.parse(data);
			
			//changing the speed of the strobe based on frame
			if(frame.hands && frame.pointables.length == 1)
			{
				led.strobe(1000);
			}
			else if(frame.hands && frame.pointables.length == 2)
			{
				led.blink(500);
			}
			else if(frame.hands && frame.pointables.length == 3)
			{
				led.strobe(250);
			}
			else if(frame.hands && frame.pointables.length == 4)
			{
				led.strobe(125);
			}
			else if(frame.hands && frame.pointables.length == 5)
			{
				led.strobe(62);
			}
			else if(frame.hands && frame.pointables.length == 6)
			{
				led.strobe(31);
			}
			else if(frame.hands && frame.pointables.length == 7)
			{
				led.strobe(15);
			}
			else if(frame.hands && frame.pointables.length == 8)
			{
				led.strobe(7);
			}
			else if(frame.hands && frame.pointables.length == 9)
			{
				led.strobe(3);
			}
			else if(frame.hands && frame.pointables.length == 10)
			{
				led.strobe(1);
			}
		});
	});
}

/****************************************************
Matthew Bell
This program connects a Leap Motion and Arduino over
a web server. Based on the number of fingers that the
Leap Motion senses, the same number of pumps attached 
to the Arduino turn on and off in a pattern.
****************************************************/


//connecting to web socket
var webSocket = require('ws'),
	ws = new webSocket('ws://127.0.0.1:6437'),
	five = require('johnny-five'),
	board = new five.Board(),
	motor, frame, hand;
var oldHandId = 0;

//self-invoking function
board.on('ready', function() 
{	
	ws.on('message', function(data, flags) 
	{
		//getting the frame from the Leap Motion
		frame = JSON.parse(data); 
		
		checkData(frame);
	});
});

function checkData(frame)
{
	this.frame = frame;
	//creating a hand object
	var hand = frame.hands[0];
	//getting the current number of fingers present
	var currentFingers = frame.pointables.length;
	var newHandId;
	
	//catching undefined hand objects when no hands are present
	if(typeof hand != "undefined")
	{
		newHandId = hand.id;
	}
	
	//if there is a new hand, we start the pumps in a new pattern
	//if we don't wait for a new hand, the Leap Motion floods the 
	//Arduino with input and the motors won't run
	if(newHandId != oldHandId && typeof hand != "undefined")
	{
		//always start the new pattern with motorA
		runMotorA(currentFingers);
		//storing the hand id of the current hand
		oldHandId = newHandId;
	}
}

/*********************************************************************
Methods that control the pumps and the patterns they run in.
This is messier than I would like it to be. The team needs to 
look into ways that we can simplify these processes.

The current pattern being run is:
1 finger: A, B, C, D, E, back to start
2 fingers: A&B, C&D, E&A, B&C, D&E, back to start
3 fingers: A&B&C, D&E&A, B&C&D, E&A&B, C&D&E, back to start
4 fingers: A&B&C&D, E&A&B&C, D&E&A&B, C&D&E&A, B&C&D&E, back to start
**********************************************************************/
function runMotorA(num)
{
	//how can we make these global so that we don't
	//have to create new objects every time we call a method?
	//when I made them global, javascript kept throwing
	//a TypeError. It was saying the objects were of type null
	var number = num;
	var motorA = new five.Motor([3, 0, 2]);
	var motorB = new five.Motor([5, 0, 4]);
	var motorC = new five.Motor([6, 0, 7]);
	var motorD = new five.Motor([9, 0, 8]);
	var motorE = new five.Motor([10, 0, 12]);
	
	if(number == 1)
	{
		
		motorA.start(255);	
		board.wait(5000, function()
		{
			motorA.stop();
			runMotorB(number);
		});
	}
	else if(number == 2)
	{
		motorA.start(255);
		motorB.start(255);
		
		board.wait(5000, function()
		{
			motorA.stop();
			motorB.stop();
			runMotorC(number);
		});
	}
	else if(number == 3)
	{
		motorA.start(255);
		motorB.start(255);
		motorC.start(255);
		
		board.wait(5000, function()
		{
			motorA.stop();
			motorB.stop();
			motorC.stop();
			runMotorD(number);
		});
	}
	else if(number == 4)
	{
		motorA.start(255);
		motorB.start(255);
		motorC.start(255);
		motorD.start(255);
		
		board.wait(5000, function()
		{
			motorA.stop();
			motorB.stop();
			motorC.stop();
			motorD.stop();
			runMotorE(number);
		});
	}
	else if(number == 5)
	{
		motorA.start(255);
		motorB.start(255);
		motorC.start(255);
		motorD.start(255);
		motorE.start(255);
		
		board.wait(5000, function()
		{
			motorA.stop();
			motorB.stop();
			motorC.stop();
			motorD.stop();
			motorE.stop();
			runMotorE(number);
		});
	}
		
}

function runMotorB(num)
{
	var number = num;
	var motorA = new five.Motor([3, 0, 2]);
	var motorB = new five.Motor([5, 0, 4]);
	var motorC = new five.Motor([6, 0, 7]);
	var motorD = new five.Motor([9, 0, 8]);
	var motorE = new five.Motor([10, 0, 12]);
	
	if(number == 1)
	{
		
		motorB.start(255);	
		board.wait(5000, function()
		{
			motorB.stop();
			runMotorC(number);
		});
	}
	else if(number == 2)
	{
		motorB.start(255);
		motorC.start(255);
		
		board.wait(5000, function()
		{
			motorB.stop();
			motorC.stop();
			runMotorD(number);
		});
	}
	else if(number == 3)
	{
		motorB.start(255);
		motorC.start(255);
		motorD.start(255);
		
		board.wait(5000, function()
		{
			motorB.stop();
			motorC.stop();
			motorD.stop();
			runMotorE(number);
		});
	}
	else if(number == 4)
	{
		motorB.start(255);
		motorC.start(255);
		motorD.start(255);
		motorE.start(255);
		
		board.wait(5000, function()
		{
			motorB.stop();
			motorC.stop();
			motorD.stop();
			motorE.stop();
			runMotorA(number);
		});
	}
}

function runMotorC(num)
{
	var number = num;
	var motorA = new five.Motor([3, 0, 2]);
	var motorB = new five.Motor([5, 0, 4]);
	var motorC = new five.Motor([6, 0, 7]);
	var motorD = new five.Motor([9, 0, 8]);
	var motorE = new five.Motor([10, 0, 12]);
	
	if(number == 1)
	{
		
		motorC.start(255);	
		board.wait(5000, function()
		{
			motorC.stop();
			runMotorD(number);
		});
	}
	else if(number == 2)
	{
		motorC.start(255);
		motorD.start(255);
		
		board.wait(5000, function()
		{
			motorC.stop();
			motorD.stop();
			runMotorE(number);
		});
	}
	else if(number == 3)
	{
		motorC.start(255);
		motorD.start(255);
		motorE.start(255);
		
		board.wait(5000, function()
		{
			motorC.stop();
			motorD.stop();
			motorE.stop();
			runMotorA(number);
		});
	}
	else if(number == 4)
	{
		motorC.start(255);
		motorD.start(255);
		motorE.start(255);
		motorA.start(255);
		
		board.wait(5000, function()
		{
			motorC.stop();
			motorD.stop();
			motorE.stop();
			motorA.stop();
			runMotorB(number);
		});
	}
}

function runMotorD(num)
{
	var number = num;
	var motorA = new five.Motor([3, 0, 2]);
	var motorB = new five.Motor([5, 0, 4]);
	var motorC = new five.Motor([6, 0, 7]);
	var motorD = new five.Motor([9, 0, 8]);
	var motorE = new five.Motor([10, 0, 12]);
	
	if(number == 1)
	{
		
		motorD.start(255);	
		board.wait(5000, function()
		{
			motorD.stop();
			runMotorE(number);
		});
	}
	else if(number == 2)
	{
		motorD.start(255);
		motorE.start(255);
		
		board.wait(5000, function()
		{
			motorD.stop();
			motorE.stop();
			runMotorA(number);
		});
	}
	else if(number == 3)
	{
		motorD.start(255);
		motorE.start(255);
		motorA.start(255);
		
		board.wait(5000, function()
		{
			motorD.stop();
			motorE.stop();
			motorA.stop();
			runMotorB(number);
		});
	}
	else if(number == 4)
	{
		motorD.start(255);
		motorE.start(255);
		motorA.start(255);
		motorB.start(255);
		
		board.wait(5000, function()
		{
			motorD.stop();
			motorE.stop();
			motorA.stop();
			motorB.stop();
			runMotorC(number);
		});
	}
}

function runMotorE(num)
{
	var number = num;
	var motorA = new five.Motor([3, 0, 2]);
	var motorB = new five.Motor([5, 0, 4]);
	var motorC = new five.Motor([6, 0, 7]);
	var motorD = new five.Motor([9, 0, 8]);
	var motorE = new five.Motor([10, 0, 12]);
	
	if(number == 1)
	{
		
		motorE.start(255);	
		board.wait(5000, function()
		{
			motorE.stop();
			runMotorA(number);
		});
	}
	else if(number == 2)
	{
		motorE.start(255);
		motorA.start(255);
		
		board.wait(5000, function()
		{
			motorE.stop();
			motorA.stop();
			runMotorB(number);
		});
	}
	else if(number == 3)
	{
		motorE.start(255);
		motorA.start(255);
		motorB.start(255);
		
		board.wait(5000, function()
		{
			motorE.stop();
			motorA.stop();
			motorB.stop();
			runMotorC(number);
		});
	}
	else if(number == 4)
	{
		motorE.start(255);
		motorA.start(255);
		motorB.start(255);
		motorC.start(255);
		
		board.wait(5000, function()
		{
			motorE.stop();
			motorA.stop();
			motorB.stop();
			motorC.stop();
			runMotorD(number);
		});
	}
	else if(number == 5)
	{
		runMotorA(5);
	}
}

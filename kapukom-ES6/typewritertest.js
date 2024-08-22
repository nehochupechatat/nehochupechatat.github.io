const ctx = document.getElementById("myCanvas").getContext("2d");
var q = 0;
var originalSpeed = 2;

var key_up_pressed;
var key_down_pressed;
var key_right_pressed ;
var key_left_pressed;
var key_space_pressed;

function TypewriterEffect(string)
{
	let speed;
	speed = key_space_pressed ? originalSpeed * 2 : originalSpeed;

	if (q < string.length) 
	{
		q+=speed;
		txt = string.substring(0, q);
	} 

	else 
	{
		txt = string;

	}
	return txt;
}
let g;
function PrintText(x,y,string)
{
	g = TypewriterEffect(string);
	ctx.strokeRect(x,y, 386,135);
	ctx.fillStyle = "black";
    ctx.font = "bold 30px Lato";
	ctx.mlFillText(g,x+7,y,370,130,'top','left',38);
	if(g==string)
	{return true;}
	else
	{return false;}
}
let i = 0;
arr=["Hello, world!","Nice text","Pokemon gotta catch em all ololololol"];

function PrintTextArray(x,y,arr)
{	
	g=PrintText(x,y,arr[i]);
	if(key_space_pressed && g && i<(arr.length-1))
	{i++;q=0;return i;}
}

function RenderUI()
{
	let x = 13;
	let y = 332;
	ctx.fillStyle = "white";
	ctx.fillRect(0,0,864,480);
	PrintTextArray(x,y,arr);
}



window.addEventListener('keydown', KeydownHandler, true);
window.addEventListener('keyup', KeyupHandler, true);
function KeydownHandler(evt) 
{
  switch (evt.keyCode) 
  {
    case 38:  /* Up arrow was pressed */
      key_up_pressed = true;
      break;
    case 40:  /* Down arrow was pressed */
      key_down_pressed = true;
	  evt.preventDefault();
      break;
    case 37:  /* Left arrow was pressed */
      key_left_pressed = true;
	  evt.preventDefault();
      break;
    case 39:  /* Right arrow was pressed */
      key_right_pressed = true;
	  evt.preventDefault();
      break;
	case 32: //space
	case 12: //numpad 5
	case 13:
	  key_space_pressed = true;
	  evt.preventDefault();
	}
}

function KeyupHandler(evt) 
{
  switch (evt.keyCode) 
  {
    case 38:  /* Up arrow was pressed */
      key_up_pressed = false;
      break;
    case 40:  /* Down arrow was pressed */
      key_down_pressed = false;
	  evt.preventDefault();
      break;
    case 37:  /* Left arrow was pressed */
      key_left_pressed = false;
	  evt.preventDefault();
      break;
    case 39:  /* Right arrow was pressed */
      key_right_pressed = false;
	  evt.preventDefault();
      break;
	case 32: //space
	case 12: //numpad 5
	case 13:
	  key_space_pressed = false;
	  evt.preventDefault();
	}
}

setInterval(RenderUI,50);

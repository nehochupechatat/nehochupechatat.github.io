var canvasWidth = 128;
var canvasHeight = 128;

// Game Defines                                                         */
// Car Infomation
var gover = false;
var F1RACE_PLAYER_CAR_IMAGE_SIZE_X  = 15;
var F1RACE_PLAYER_CAR_IMAGE_SIZE_Y  = 20;

var F1RACE_PLAYER_CAR_CARSH_IMAGE_SIZE_X = 15;
var F1RACE_PLAYER_CAR_CARSH_IMAGE_SIZE_Y = 25;

var F1RACE_PLAYER_CAR_FLY_IMAGE_SIZE_X = 23;
var F1RACE_PLAYER_CAR_FLY_IMAGE_SIZE_Y = 27;

var F1RACE_PLAYER_CAR_HEAD_LIGHT_IMAGE_SIZE_X = 7;
var F1RACE_PLAYER_CAR_HEAD_LIGHT_IMAGE_SIZE_Y = 15;
var F1RACE_PLAYER_CAR_HEAD_LIGHT_0_SHIFT = 1;
var F1RACE_PLAYER_CAR_HEAD_LIGHT_1_SHIFT = 7;

var F1RACE_OPPOSITE_CAR_TYPE_COUNT = 7;
var F1RACE_PLAYER_CAR_FLY_FRAME_COUNT = 10;

var F1RACE_OPPOSITE_CAR_0_IMAGE_SIZE_X = 17;
var F1RACE_OPPOSITE_CAR_0_IMAGE_SIZE_Y = 35;

var F1RACE_OPPOSITE_CAR_1_IMAGE_SIZE_X = 12;
var F1RACE_OPPOSITE_CAR_1_IMAGE_SIZE_Y = 18;

var F1RACE_OPPOSITE_CAR_2_IMAGE_SIZE_X = 15;
var F1RACE_OPPOSITE_CAR_2_IMAGE_SIZE_Y = 20;

var F1RACE_OPPOSITE_CAR_3_IMAGE_SIZE_X = 12;
var F1RACE_OPPOSITE_CAR_3_IMAGE_SIZE_Y = 18;

var F1RACE_OPPOSITE_CAR_4_IMAGE_SIZE_X = 17;
var F1RACE_OPPOSITE_CAR_4_IMAGE_SIZE_Y = 27;

var F1RACE_OPPOSITE_CAR_5_IMAGE_SIZE_X = 13;
var F1RACE_OPPOSITE_CAR_5_IMAGE_SIZE_Y = 21;

var F1RACE_OPPOSITE_CAR_6_IMAGE_SIZE_X = 13;
var F1RACE_OPPOSITE_CAR_6_IMAGE_SIZE_Y = 22;

var F1RACE_OPPOSITE_CAR_COUNT       = 8;
var F1RACE_OPPOSITE_CAR_DEFAULT_APPEAR_RATE = 2;  /* n frame will show one car */

var F1RACE_MAX_FLY_COUNT     = 9;

var F1RACE_TIMER_ELAPSE    = 100;    /* 100 ms = 10 fps */
var F1RACE_PLAYER_CAR_SHIFT     = 5;
var F1RACE_PLAYER_CAR_FLY_SHIFT = 2;

// define display regions
var F1RACE_DISPLAY_START_X = 3;
var F1RACE_DISPLAY_START_Y = 3;
var F1RACE_DISPLAY_END_X  = 124;
var F1RACE_DISPLAY_END_Y  = 124;

var F1RACE_ROAD_WIDTH   = 23;
var F1RACE_SEPARATOR_WIDTH = 3;
var F1RACE_GRASS_WIDTH  = 7;
var F1RACE_STATUS_WIDTH    = 32;     /* calc by hand */

var F1RACE_SEPARATOR_HEIGHT_SPACE = 3;
var F1RACE_SEPARATOR_RATIO = 6;
var F1RACE_SEPARATOR_HEIGHT = F1RACE_SEPARATOR_HEIGHT_SPACE*F1RACE_SEPARATOR_RATIO;

var F1RACE_STATUS_NUMBER_WIDTH  = 4;
var F1RACE_STATUS_NUBBER_HEIGHT = 7;

// define width from left to right 
// ugly but has to do it this way  ><
var F1RACE_GRASS_0_START_X = F1RACE_DISPLAY_START_X;
var F1RACE_GRASS_0_END_X   = F1RACE_GRASS_0_START_X + F1RACE_GRASS_WIDTH-1;

var F1RACE_ROAD_0_START_X  = F1RACE_GRASS_0_START_X + F1RACE_GRASS_WIDTH;
var F1RACE_ROAD_0_END_X    = F1RACE_ROAD_0_START_X + F1RACE_ROAD_WIDTH-1;

var F1RACE_SEPARATOR_0_START_X  = F1RACE_ROAD_0_START_X + F1RACE_ROAD_WIDTH;
var F1RACE_SEPARATOR_0_END_X = F1RACE_SEPARATOR_0_START_X + F1RACE_SEPARATOR_WIDTH;

var F1RACE_ROAD_1_START_X  = F1RACE_SEPARATOR_0_START_X + F1RACE_SEPARATOR_WIDTH;
var F1RACE_ROAD_1_END_X    = F1RACE_ROAD_1_START_X + F1RACE_ROAD_WIDTH-1;

var F1RACE_SEPARATOR_1_START_X  = F1RACE_ROAD_1_START_X + F1RACE_ROAD_WIDTH;
var F1RACE_SEPARATOR_1_END_X = F1RACE_SEPARATOR_1_START_X + F1RACE_SEPARATOR_WIDTH;-1

var F1RACE_ROAD_2_START_X  = F1RACE_SEPARATOR_1_START_X + F1RACE_SEPARATOR_WIDTH;
var F1RACE_ROAD_2_END_X    = F1RACE_ROAD_2_START_X + F1RACE_ROAD_WIDTH;-1

var F1RACE_GRASS_1_START_X = F1RACE_ROAD_2_START_X + F1RACE_ROAD_WIDTH;
var F1RACE_GRASS_1_END_X   = F1RACE_GRASS_1_START_X + F1RACE_GRASS_WIDTH;-1

var F1RACE_STATUS_START_X  = F1RACE_GRASS_1_START_X + F1RACE_GRASS_WIDTH;
var F1RACE_STATUS_END_X    = F1RACE_STATUS_START_X + F1RACE_STATUS_WIDTH;

/************************************/
/* Structure                        */
/************************************/

const F1RACE_OPPOSITE_CAR_STRUCT =
{
    dx: 0,
    dy: 0,
    speed: 0,
    dx_from_road: 0,
    image: 0,

    pos_x: 0,
    pos_y: 0,
    road_id: 0, /* road 0 - road 2 */
    is_empty: 1,
    is_add_score: 0,
};

//Global Variables
var f1race_is_new_game;
var f1race_is_crashing;
var f1race_crashing_count_down;
var f1race_key_up_pressed;
var f1race_key_down_pressed;
var f1race_key_right_pressed;
var f1race_key_left_pressed;

var f1race_key_up_pressed;
var f1race_key_down_pressed;
var f1race_key_right_pressed ;
var f1race_key_left_pressed;
var f1race_separator_0_block_start_y;
var f1race_separator_1_block_start_y;
	
var f1race_player_is_car_fly;
var f1race_player_car_fly_duration;
var f1race_is_crashing;
var f1race_last_car_road;
var f1race_score;
var f1race_level;
var f1race_pass;
var f1race_fly_count;
var f1race_fly_charger_count;	

//sprites
var IMG_GX_F1RACE_STATUS_BOX = 'GameImages/F1race/GAME_F1RACE_STATUS_BOX.gif';
var IMG_GX_F1RACE_STATUS_SCORE = 'GameImages/F1race/GAME_F1RACE_STATUS_SCORE.gif'
var IMG_GX_F1RACE_STATUS_LOGO = 'GameImages/F1race/GAME_F1RACE_LOGO.bmp';
var IMG_GX_F1RACE_STATUS_LEVEL = 'GameImages/F1race/GAME_F1RACE_STATUS_LEVEL.gif';
var IMG_GX_F1RACE_STATUS_FLY = 'GameImages/F1race/GAME_F1RACE_STATUS_FLY.gif';
var IMG_GX_F1RACE_PLAYER_CAR = 'GameImages/F1race/GAME_F1RACE_PLAYER_CAR.gif';
var IMG_GX_F1RACE_PLAYER_CAR_CRASH = 'GameImages/F1race/GAME_F1RACE_PLAYER_CAR_CRASH.gif';
var IMG_GX_F1RACE_PLAYER_CAR_FLY = 'GameImages/F1race/GAME_F1RACE_PLAYER_CAR_FLY.gif';
var IMG_GX_F1RACE_PLAYER_CAR_FLY_UP = 'GameImages/F1race/GAME_F1RACE_PLAYER_CAR_FLY_UP.gif';
var IMG_GX_F1RACE_PLAYER_CAR_FLY_DOWN = 'GameImages/F1race/GAME_F1RACE_PLAYER_CAR_FLY_DOWN.gif';
var IMG_GX_F1RACE_PLAYER_CAR_HEAD_LIGHT = 'GameImages/F1race/GAME_F1RACE_PLAYER_CAR_HEAD_LIGHT.gif';
var IMG_GX_F1RACE_OPPOSITE_CAR_0 = 'GameImages/F1race/GAME_F1RACE_OPPOSITE_CAR_0.gif';
var IMG_GX_F1RACE_OPPOSITE_CAR_1 = 'GameImages/F1race/GAME_F1RACE_OPPOSITE_CAR_1.gif';
var IMG_GX_F1RACE_OPPOSITE_CAR_2 = 'GameImages/F1race/GAME_F1RACE_OPPOSITE_CAR_2.gif';
var IMG_GX_F1RACE_OPPOSITE_CAR_3 = 'GameImages/F1race/GAME_F1RACE_OPPOSITE_CAR_3.gif';
var IMG_GX_F1RACE_OPPOSITE_CAR_4 = 'GameImages/F1race/GAME_F1RACE_OPPOSITE_CAR_4.gif';
var IMG_GX_F1RACE_OPPOSITE_CAR_5 = 'GameImages/F1race/GAME_F1RACE_OPPOSITE_CAR_5.gif';
var IMG_GX_F1RACE_OPPOSITE_CAR_6 = 'GameImages/F1race/GAME_F1RACE_OPPOSITE_CAR_6.gif';
var IMG_GX_F1RACE_NUMBER_0 = 'GameImages/F1race/GAME_F1RACE_NUMBER_0.gif';
var IMG_GX_F1RACE_NUMBER_1 = 'GameImages/F1race/GAME_F1RACE_NUMBER_1.gif';
var IMG_GX_F1RACE_NUMBER_2 = 'GameImages/F1race/GAME_F1RACE_NUMBER_2.gif';
var IMG_GX_F1RACE_NUMBER_3 = 'GameImages/F1race/GAME_F1RACE_NUMBER_3.gif';
var IMG_GX_F1RACE_NUMBER_4 = 'GameImages/F1race/GAME_F1RACE_NUMBER_4.gif';
var IMG_GX_F1RACE_NUMBER_5 = 'GameImages/F1race/GAME_F1RACE_NUMBER_5.gif';
var IMG_GX_F1RACE_NUMBER_6 = 'GameImages/F1race/GAME_F1RACE_NUMBER_6.gif';
var IMG_GX_F1RACE_NUMBER_7 = 'GameImages/F1race/GAME_F1RACE_NUMBER_7.gif';
var IMG_GX_F1RACE_NUMBER_8 = 'GameImages/F1race/GAME_F1RACE_NUMBER_8.gif';
var IMG_GX_F1RACE_NUMBER_9 = 'GameImages/F1race/GAME_F1RACE_NUMBER_9.gif';
var IMG_GX_F1RACE_GOTEXT = 'GameImages/F1race/gameover/gameover.bmp';
var IMG_GX_F1RACE_GRADESMAP = 'GameImages/F1race/gameover/gradesmap.bmp'
var IMG_GX_F1RACE_GOPIC = 'GameImages/F1race/gameover/pic.bmp';
	
const f1race_player_car = 
{
    pos_x: ((F1RACE_ROAD_1_START_X + F1RACE_ROAD_1_END_X - F1RACE_PLAYER_CAR_IMAGE_SIZE_X) / 2),
    pos_y: F1RACE_DISPLAY_END_Y - F1RACE_PLAYER_CAR_IMAGE_SIZE_Y - 1,
    dx: F1RACE_PLAYER_CAR_IMAGE_SIZE_X,
    dy: F1RACE_PLAYER_CAR_IMAGE_SIZE_Y,
    image: IMG_GX_F1RACE_PLAYER_CAR,
    image_fly: IMG_GX_F1RACE_PLAYER_CAR_FLY,
    image_head_light: IMG_GX_F1RACE_PLAYER_CAR_HEAD_LIGHT,
};


 /* 11 Byte */
let f1race_opposite_car_type = [
{
    dx: F1RACE_OPPOSITE_CAR_0_IMAGE_SIZE_X,
    dy: F1RACE_OPPOSITE_CAR_0_IMAGE_SIZE_Y,
    speed: 0.75,
    dx_from_road: (F1RACE_ROAD_WIDTH - F1RACE_OPPOSITE_CAR_0_IMAGE_SIZE_X) / 2,
    image: IMG_GX_F1RACE_OPPOSITE_CAR_0,
},
{
    dx: F1RACE_OPPOSITE_CAR_1_IMAGE_SIZE_X,
    dy: F1RACE_OPPOSITE_CAR_1_IMAGE_SIZE_Y,
    speed: 1,
    dx_from_road: (F1RACE_ROAD_WIDTH - F1RACE_OPPOSITE_CAR_1_IMAGE_SIZE_X) / 2,
    image: IMG_GX_F1RACE_OPPOSITE_CAR_1,
},
{
    dx: F1RACE_OPPOSITE_CAR_2_IMAGE_SIZE_X,
    dy: F1RACE_OPPOSITE_CAR_2_IMAGE_SIZE_Y,
    speed: 1.5,
    dx_from_road: (F1RACE_ROAD_WIDTH - F1RACE_OPPOSITE_CAR_2_IMAGE_SIZE_X) / 2,
    image: IMG_GX_F1RACE_OPPOSITE_CAR_2,
},
{
    dx: F1RACE_OPPOSITE_CAR_3_IMAGE_SIZE_X,
    dy: F1RACE_OPPOSITE_CAR_3_IMAGE_SIZE_Y,
    speed: 0.75,
    dx_from_road: (F1RACE_ROAD_WIDTH - F1RACE_OPPOSITE_CAR_3_IMAGE_SIZE_X) / 2,
    image: IMG_GX_F1RACE_OPPOSITE_CAR_3,
},
{
    dx: F1RACE_OPPOSITE_CAR_4_IMAGE_SIZE_X,
    dy: F1RACE_OPPOSITE_CAR_4_IMAGE_SIZE_Y,
    speed: 0.75,
    dx_from_road: (F1RACE_ROAD_WIDTH - F1RACE_OPPOSITE_CAR_4_IMAGE_SIZE_X) / 2,
    image: IMG_GX_F1RACE_OPPOSITE_CAR_4,
},
{
    dx: F1RACE_OPPOSITE_CAR_5_IMAGE_SIZE_X,
    dy: F1RACE_OPPOSITE_CAR_5_IMAGE_SIZE_Y,
    speed: 1.25,
    dx_from_road: (F1RACE_ROAD_WIDTH - F1RACE_OPPOSITE_CAR_5_IMAGE_SIZE_X) / 2,
    image: IMG_GX_F1RACE_OPPOSITE_CAR_5,
},
{
    dx: F1RACE_OPPOSITE_CAR_6_IMAGE_SIZE_X,
    dy: F1RACE_OPPOSITE_CAR_6_IMAGE_SIZE_Y,
    speed: 0.75,
    dx_from_road: (F1RACE_ROAD_WIDTH - F1RACE_OPPOSITE_CAR_6_IMAGE_SIZE_X) / 2,
    image: IMG_GX_F1RACE_OPPOSITE_CAR_6,
}];

const f1race_opposite_car = new Array(F1RACE_OPPOSITE_CAR_COUNT);
for(let i = 0; i < F1RACE_OPPOSITE_CAR_COUNT; i++)
{
	f1race_opposite_car[i] = F1RACE_OPPOSITE_CAR_STRUCT;
}


function keydownHandler(evt) {
  switch (evt.keyCode) {
    case 38:  /* Up arrow was pressed */
      f1race_key_up_pressed = true;
	  evt.preventDefault();
      break;
    case 40:  /* Down arrow was pressed */
      f1race_key_down_pressed = true;
	  evt.preventDefault();
      break;
    case 37:  /* Left arrow was pressed */
      f1race_key_left_pressed = true;
	  evt.preventDefault();
      break;
    case 39:  /* Right arrow was pressed */
      f1race_key_right_pressed = true;
	  evt.preventDefault();
      break;
	case 32: //space
	case 12: //numpad 5
	case 13:
	evt.preventDefault();
	    if (f1race_fly_count > 0 )
    {	f1race_player_is_car_fly = true;
        f1race_player_car_fly_duration = 0;
		f1race_fly_count--;
		f1race_fly_count = f1race_fly_count;
    }
	if (gover == true)
	{gover = false;newGame();}
    break;
   }
}

function keyupHandler(evt) {
  switch (evt.keyCode) {
	case 32: //space
	case 12: //numpad 5
	case 13:
	f1race_fly_count = f1race_fly_count;
	break;
    case 38:  /* Up arrow was pressed */
      f1race_key_up_pressed = false;
      break;
    case 40:  /* Down arrow was pressed */
      f1race_key_down_pressed = false;
      break;
    case 37:  /* Left arrow was pressed */
      f1race_key_left_pressed = false;
      break;
    case 39:  /* Right arrow was pressed */
      f1race_key_right_pressed = false;
      break;
   }
}

window.addEventListener('keydown', keydownHandler, true);
window.addEventListener('keyup', keyupHandler, true);




//functions




function F1Race_Render_Background()
{
    /*----------------------------------------------------------------*/
    /* Local Variables                                                */
    /*----------------------------------------------------------------*/
    /* this background will only draw once */
    /* draw display border and grass part that will not be modified */

    var c = gui_color(255, 255, 255);

    gui_fill_rectangle(
        F1RACE_DISPLAY_START_X - 3,
        F1RACE_DISPLAY_START_Y - 3,
        F1RACE_DISPLAY_END_X + 3,
        F1RACE_DISPLAY_END_Y + 3,
        c);

    /* draw left grass */
    c = gui_color(130, 230, 100);   /* green */
    gui_fill_rectangle(F1RACE_GRASS_0_START_X, F1RACE_DISPLAY_START_Y, F1RACE_GRASS_0_END_X, F1RACE_DISPLAY_END_Y, c);

    /* draw shdowed border between grass and road */
    c = gui_color(100, 180, 100);   /* drak green */
    gui_draw_vertical_line(F1RACE_DISPLAY_START_Y, F1RACE_DISPLAY_END_Y, F1RACE_GRASS_0_END_X - 1, c);

    c = gui_color(0, 0, 0); /* back */
    gui_draw_vertical_line(F1RACE_DISPLAY_START_Y, F1RACE_DISPLAY_END_Y, F1RACE_GRASS_0_END_X, c);

    /* draw rigth grass */
    c = gui_color(130, 230, 100);   /* green */
    gui_fill_rectangle(F1RACE_GRASS_1_START_X, F1RACE_DISPLAY_START_Y, F1RACE_GRASS_1_END_X, F1RACE_DISPLAY_END_Y, c);

    /* draw shdowed border between grass and road */
    c = gui_color(100, 180, 100);   /* drak green */
    gui_draw_vertical_line(F1RACE_DISPLAY_START_Y, F1RACE_DISPLAY_END_Y, F1RACE_GRASS_1_START_X + 1, c);

    c = gui_color(0, 0, 0); /* back */
    gui_draw_vertical_line(F1RACE_DISPLAY_START_Y, F1RACE_DISPLAY_END_Y, F1RACE_GRASS_1_START_X, c);

    c = gui_color(0, 0, 0); /* back */
    gui_fill_rectangle(F1RACE_STATUS_START_X, F1RACE_DISPLAY_START_Y, F1RACE_STATUS_END_X, F1RACE_DISPLAY_END_Y, c);

    /* render status Column */
    gui_show_image(F1RACE_STATUS_START_X, F1RACE_DISPLAY_START_Y, IMG_GX_F1RACE_STATUS_LOGO);

    /* position hard coded.. Since it will only use here. */
    gui_show_image(F1RACE_STATUS_START_X + 5, F1RACE_DISPLAY_START_Y + 42, IMG_GX_F1RACE_STATUS_SCORE);

    gui_show_image(F1RACE_STATUS_START_X + 2, F1RACE_DISPLAY_START_Y + 50, IMG_GX_F1RACE_STATUS_BOX);

    /* position hard coded.. Since it will only use here. */
    gui_show_image(F1RACE_STATUS_START_X + 6, F1RACE_DISPLAY_START_Y + 64, IMG_GX_F1RACE_STATUS_LEVEL);
    gui_show_image(F1RACE_STATUS_START_X + 2, F1RACE_DISPLAY_START_Y + 72, IMG_GX_F1RACE_STATUS_BOX);

    gui_show_image(F1RACE_STATUS_START_X + 2, F1RACE_DISPLAY_START_Y + 89, IMG_GX_F1RACE_STATUS_FLY);
}


function F1Race_Render_Road()
{
    /*----------------------------------------------------------------*/
    /* Local Variables                                                */
    /*----------------------------------------------------------------*/

    /*----------------------------------------------------------------*/
    /* Code Body                                                      */
    /*----------------------------------------------------------------*/
    gui_fill_rectangle(
        F1RACE_ROAD_0_START_X,
        F1RACE_DISPLAY_START_Y,
        F1RACE_ROAD_2_END_X,
        F1RACE_DISPLAY_END_Y,
        gui_color(150, 150, 150));
}

function F1Race_Render_Separator()
{
    /*----------------------------------------------------------------*/
    /* Local Variables                                                */
    /*----------------------------------------------------------------*/

    var start_y;
	var end_y;

    /*----------------------------------------------------------------*/
    /* Code Body                                                      */
    /*----------------------------------------------------------------*/
    gui_fill_rectangle(
        F1RACE_SEPARATOR_0_START_X,
        F1RACE_DISPLAY_START_Y,
        F1RACE_SEPARATOR_0_END_X,
        F1RACE_DISPLAY_END_Y,
        gui_color(250, 250, 250));

    gui_fill_rectangle(
        F1RACE_SEPARATOR_1_START_X,
        F1RACE_DISPLAY_START_Y,
        F1RACE_SEPARATOR_1_END_X,
        F1RACE_DISPLAY_END_Y,
        gui_color(250, 250, 250));

    /* separator 0 */
    start_y = f1race_separator_0_block_start_y;
    end_y = start_y + F1RACE_SEPARATOR_HEIGHT_SPACE;

    while (1)
    {
        gui_fill_rectangle(
            F1RACE_SEPARATOR_0_START_X,
            start_y,
            F1RACE_SEPARATOR_0_END_X,
            end_y,
            gui_color(150, 150, 150));

        start_y += F1RACE_SEPARATOR_HEIGHT;
        end_y = start_y + F1RACE_SEPARATOR_HEIGHT_SPACE;

        if (start_y > F1RACE_DISPLAY_END_Y)
        {
            break;
        }

        if (end_y > F1RACE_DISPLAY_END_Y)
        {
            end_y = F1RACE_DISPLAY_END_Y;
        }
    }

    f1race_separator_0_block_start_y += F1RACE_SEPARATOR_HEIGHT_SPACE;
    if (f1race_separator_0_block_start_y >= (F1RACE_DISPLAY_START_Y + F1RACE_SEPARATOR_HEIGHT_SPACE * F1RACE_SEPARATOR_RATIO))
    {
        f1race_separator_0_block_start_y = F1RACE_DISPLAY_START_Y;
    }

    /* separator 1 */
    start_y = f1race_separator_1_block_start_y;
    end_y = start_y + F1RACE_SEPARATOR_HEIGHT_SPACE;

    while (1)
    {
        gui_fill_rectangle(
            F1RACE_SEPARATOR_1_START_X,
            start_y,
            F1RACE_SEPARATOR_1_END_X,
            end_y,
            gui_color(150, 150, 150));

        start_y += F1RACE_SEPARATOR_HEIGHT;
        end_y = start_y + F1RACE_SEPARATOR_HEIGHT_SPACE;

        if (start_y > F1RACE_DISPLAY_END_Y)
        {
            break;
        }

        if (end_y > F1RACE_DISPLAY_END_Y)
        {
            end_y = F1RACE_DISPLAY_END_Y;
        }
    }

    f1race_separator_1_block_start_y += F1RACE_SEPARATOR_HEIGHT_SPACE;
    if (f1race_separator_1_block_start_y >= (F1RACE_DISPLAY_START_Y + F1RACE_SEPARATOR_HEIGHT_SPACE * F1RACE_SEPARATOR_RATIO))
    {
        f1race_separator_1_block_start_y = F1RACE_DISPLAY_START_Y;
    }

}

function F1Race_Render_Player_Car()
{
    /*----------------------------------------------------------------*/
    /* Local Variables                                                */
    /*----------------------------------------------------------------*/
    var dx;
    var dy;
    var image;

    /*----------------------------------------------------------------*/
    /* Code Body                                                      */
    /*----------------------------------------------------------------*/
    if (f1race_player_is_car_fly == false)
    {
        /* car on land */
        gui_show_image(f1race_player_car.pos_x, f1race_player_car.pos_y, f1race_player_car.image);
    }
    else
    {

        /* car is flying */

        dx = (F1RACE_PLAYER_CAR_FLY_IMAGE_SIZE_X - F1RACE_PLAYER_CAR_IMAGE_SIZE_X) / 2;
        dy = (F1RACE_PLAYER_CAR_FLY_IMAGE_SIZE_Y - F1RACE_PLAYER_CAR_IMAGE_SIZE_Y) / 2;

        dx = f1race_player_car.pos_x - dx;
        dy = f1race_player_car.pos_y - dy;

        switch (f1race_player_car_fly_duration)
        {
            case 0:
            case 1:
                image = IMG_GX_F1RACE_PLAYER_CAR_FLY_UP;
                break;

            case (F1RACE_PLAYER_CAR_FLY_FRAME_COUNT - 1):
            case (F1RACE_PLAYER_CAR_FLY_FRAME_COUNT - 2):
                image = IMG_GX_F1RACE_PLAYER_CAR_FLY_DOWN;
                break;
            default:
                image = IMG_GX_F1RACE_PLAYER_CAR_FLY;
                break;
        }

        gui_show_image(dx, dy, image);
    }
};

function F1Race_Render_Status()
{
    var x_pos;
    var y_pos;
    var value;
    var remain;
    var score;
    var c;
    var index;

    c = gui_color(0, 0, 0); /* back */
    gui_fill_rectangle(
        F1RACE_STATUS_START_X + 4,
        F1RACE_DISPLAY_START_Y + 52,
        F1RACE_STATUS_START_X + 29,
        F1RACE_DISPLAY_START_Y + 58,
        c);

    x_pos = F1RACE_STATUS_START_X + 25;
    y_pos = F1RACE_DISPLAY_START_Y + 52;
    score = f1race_score;

    value = score % 10;
    remain = score / 10;

    value = score % 10;
    remain = score / 10;
	var scoresplit = score.toString().split('');
    var realScore = scoresplit.map(Number);
	if(score < 10)
    {gui_show_image(x_pos, y_pos,'GameImages/F1race/GAME_F1RACE_NUMBER_' + score + '.gif');}
	if(score >= 10 && score < 100)
    {gui_show_image(x_pos-6, y_pos,'GameImages/F1race/GAME_F1RACE_NUMBER_' + realScore[0] + '.gif');
    gui_show_image(x_pos, y_pos,'GameImages/F1race/GAME_F1RACE_NUMBER_' + realScore[1] + '.gif');}
				
	if(score >= 100 && score < 1000)
    {gui_show_image(x_pos-12, y_pos,'GameImages/F1race/GAME_F1RACE_NUMBER_' + realScore[0] + '.gif');
    gui_show_image(x_pos-6, y_pos,'GameImages/F1race/GAME_F1RACE_NUMBER_' + realScore[1] + '.gif');
	gui_show_image(x_pos, y_pos,'GameImages/F1race/GAME_F1RACE_NUMBER_' + realScore[2] + '.gif');}
				
	if(score >= 1000)
    {gui_show_image(x_pos-18, y_pos,'GameImages/F1race/GAME_F1RACE_NUMBER_' + realScore[0] + '.gif');
    gui_show_image(x_pos-12, y_pos,'GameImages/F1race/GAME_F1RACE_NUMBER_' + realScore[1] + '.gif');
	gui_show_image(x_pos-6, y_pos,'GameImages/F1race/GAME_F1RACE_NUMBER_' + realScore[2] + '.gif');
	gui_show_image(x_pos, y_pos,'GameImages/F1race/GAME_F1RACE_NUMBER_' + realScore[3] + '.gif');}
		

    /* render level */
    c = gui_color(0, 0, 0); /* back */
    gui_fill_rectangle(
        F1RACE_STATUS_START_X + 4,
        F1RACE_DISPLAY_START_Y + 74,
        F1RACE_STATUS_START_X + 29,
        F1RACE_DISPLAY_START_Y + 80,
        c);

	var levelsplit = f1race_level.toString().split('');
    var realLevel = levelsplit.map(Number);
    x_pos = F1RACE_STATUS_START_X + 25;
    y_pos = F1RACE_DISPLAY_START_Y + 74;
	if(f1race_level < 10)
    {gui_show_image(x_pos, y_pos,'GameImages/F1race/GAME_F1RACE_NUMBER_' + f1race_level + '.gif');}
   
	if(f1race_level >= 10 && f1race_level < 100)
    {gui_show_image(x_pos-6, y_pos,'GameImages/F1race/GAME_F1RACE_NUMBER_' + realLevel[0] + '.gif');
    gui_show_image(x_pos, y_pos,'GameImages/F1race/GAME_F1RACE_NUMBER_' + realLevel[1] + '.gif');}
   
	if(f1race_level >= 100 && f1race_level < 1000)
    {gui_show_image(x_pos-12, y_pos,'GameImages/F1race/GAME_F1RACE_NUMBER_' + realLevel[0] + '.gif');
    gui_show_image(x_pos-6, y_pos,'GameImages/F1race/GAME_F1RACE_NUMBER_' + realLevel[1] + '.gif');
	gui_show_image(x_pos, y_pos,'GameImages/F1race/GAME_F1RACE_NUMBER_' + realLevel[2] + '.gif');}
	if(f1race_level >= 1000)
    {gui_show_image(x_pos-18, y_pos,'GameImages/F1race/GAME_F1RACE_NUMBER_' + realLevel[0] + '.gif');
    gui_show_image(x_pos-12, y_pos,'GameImages/F1race/GAME_F1RACE_NUMBER_' + realLevel[1] + '.gif');
	gui_show_image(x_pos-6, y_pos,'GameImages/F1race/GAME_F1RACE_NUMBER_' + realLevel[2] + '.gif');
	gui_show_image(x_pos, y_pos,'GameImages/F1race/GAME_F1RACE_NUMBER_' + realLevel[3] + '.gif');}

    /* render fly status */

    /* charger bar */
    x_pos = F1RACE_STATUS_START_X + 4;
    y_pos = F1RACE_DISPLAY_START_Y + 102;
    for (index = 0; index < 5; index++)
    {
        if (index < f1race_fly_charger_count)
        {
            c = gui_color(255, 0, 0);
        }
        else
        {
            c = gui_color(100, 100, 100);
        }

        gui_fill_rectangle(x_pos + index * 4, y_pos - 2 - index, x_pos + 2 + index * 4, y_pos, c);
    }

    /* fly count */
    image_id = 'GameImages/F1race/GAME_F1RACE_NUMBER_' + f1race_fly_count + '.gif'; 
    x_pos = F1RACE_STATUS_START_X + 25;
    y_pos = F1RACE_DISPLAY_START_Y + 96;
    gui_show_image(x_pos, y_pos, image_id);

}

function F1Race_CollisionCheck()
{
    var index;
    var minA_x, minA_y, maxA_x, maxA_y;
    var minB_x, minB_y, maxB_x, maxB_y;

    minA_x = f1race_player_car.pos_x - 1;
    maxA_x = minA_x + f1race_player_car.dx - 1;
    minA_y = f1race_player_car.pos_y - 1;
    maxA_y = minA_y + f1race_player_car.dy - 1;

    for (index = 0; index < F1RACE_OPPOSITE_CAR_COUNT; index++)
    {
        if (f1race_opposite_car[index].is_empty == false)
        {
            /* not empty, process bbox check */
            minB_x = f1race_opposite_car[index].pos_x - 1;
            maxB_x = minB_x + f1race_opposite_car[index].dx - 1;
            minB_y = f1race_opposite_car[index].pos_y - 1;
            maxB_y = minB_y + f1race_opposite_car[index].dy - 1;

            /* x axis */
            if (((minA_x <= minB_x) && (minB_x <= maxA_x)) || ((minA_x <= maxB_x) && (maxB_x <= maxA_x)))
            {
                /* y axis */
                if (((minA_y <= minB_y) && (minB_y <= maxA_y)) || ((minA_y <= maxB_y) && (maxB_y <= maxA_y)))
                {   F1Race_Render_Player_Car_Crash();
                    F1Race_Crashing();
                    return;
                }
            }

            /* check left up corner */
            if ((minA_x >= minB_x) && (minA_x <= maxB_x) && (minA_y >= minB_y) && (minA_y <= maxB_y))
            {	F1Race_Render_Player_Car_Crash();
                F1Race_Crashing();
                return;
            }

            /* check left down corner */
            if ((minA_x >= minB_x) && (minA_x <= maxB_x) && (maxA_y >= minB_y) && (maxA_y <= maxB_y))
            {	F1Race_Render_Player_Car_Crash();
                F1Race_Crashing();
                return;
            }

            /* check right up corner */
            if ((maxA_x >= minB_x) && (maxA_x <= maxB_x) && (minA_y >= minB_y) && (minA_y <= maxB_y))
            {	F1Race_Render_Player_Car_Crash();
                F1Race_Crashing();
                return;
            }

            /* check right down corner */
            if ((maxA_x >= minB_x) && (maxA_x <= maxB_x) && (maxA_y >= minB_y) && (maxA_y <= maxB_y))
            {	F1Race_Render_Player_Car_Crash();
                F1Race_Crashing();
                return;
            }

            /* calculate score */
            if ((maxA_y < minB_y) && (f1race_opposite_car[index].is_add_score == false))
            {
                f1race_score++;
                f1race_pass++;
                f1race_opposite_car[index].is_add_score = true;

                /* change level */
                if (f1race_pass == 10)
                {
                    f1race_level++; /* level 2 */
                }
                else if (f1race_pass == 20)
                {
                    f1race_level++; /* level 3 */
                }
                else if (f1race_pass == 30)
                {
                    f1race_level++; /* level 4 */
                }
                else if (f1race_pass == 40)
                {
                    f1race_level++; /* level 5 */
                }
                else if (f1race_pass == 50)
                {
                    f1race_level++; /* level 6 */
                }
                else if (f1race_pass == 60)
                {
                    f1race_level++; /* level 7 */
                }
                else if (f1race_pass == 70)
                {
                    f1race_level++; /* level 8 */
                }
                else if (f1race_pass == 100)
                {
                    f1race_level++; /* level 9 */
                }

                f1race_fly_charger_count++;
                if (f1race_fly_charger_count >= 6)
                {
                    if (f1race_fly_count < F1RACE_MAX_FLY_COUNT)
                    {
                        f1race_fly_charger_count = 0;
                        f1race_fly_count++;
                    }
                    else    /* fly count each max. */
                    {
                        f1race_fly_charger_count--;
                    }
                }
            }
        }
    }
}


function F1Race_New_Opposite_Car()
{
    /*----------------------------------------------------------------*/
    /* Local Variables                                                */
    /*----------------------------------------------------------------*/
    var index;
    var validIndex = 0;
    var no_slot;
    var car_type = 0;
    var road;
    var car_pos_x = 0;
    var car_shift;
    var enough_space;
    var rand_num;
    var speed_add;

    /*----------------------------------------------------------------*/
    /* Code Body                                                      */
    /*----------------------------------------------------------------*/
    /* random generate new car based on SHOW_RATE */
    no_slot = true;
    if ((rand() % F1RACE_OPPOSITE_CAR_DEFAULT_APPEAR_RATE) == 0)
    {
        /* enter here will try to create a new opposite car */
        for (index = 0; index < F1RACE_OPPOSITE_CAR_COUNT; index++)
        {
            if (f1race_opposite_car[index].is_empty != false)
            {
                validIndex = index;
                no_slot = false;
                break;
            }
        }
    }

    /* no slot availabe */
    if (no_slot != false)
    {
        return;
    }

    /* choose opposite car type */
    road = rand() % 3;  /* 3 = road count */

    /* avoid one car after another in the same road */
    if (road == f1race_last_car_road)
    {
        road++;
        road %= 3;
    }

    /* proablilty for showing different car */
    /* 0,1      = trunk, */
    /* 2,3,4    = red small car */
    /* 5     = race car */
    /* 6, 7     = green small car */
    /* 8     = small truck */
    /* 9        = red sport */
    /* 10    = s.small truck */

    if (f1race_level < 3)
    {
        rand_num = rand() % 11;
        switch (rand_num)
        {
            case 0:
            case 1:
                car_type = 0;
                break;

            case 2:
            case 3:
            case 4:
                car_type = 1;
                break;
            case 5:
                car_type = 2;
                break;
            case 6:
            case 7:
                car_type = 3;
                break;
            case 8:
                car_type = 4;
                break;
            case 9:
                car_type = 5;
                break;
            case 10:
                car_type = 6;
                break;
        }
    }

    /* proablilty for showing different car */
    /* 0,1      = trunk, */
    /* 2,3,4    = red small car */
    /* 5     = race car */
    /* 6, 7     = green small car */
    /* 8     = small truck */
    /* 9        = red sport */
    /* 10    = s.small truck */

    if (f1race_level >= 3)
    {
        rand_num = rand() % 11;
        switch (rand_num)
        {
            case 0:
                car_type = 0;
                break;

            case 1:
            case 2:
                car_type = 1;
                break;
            case 3:
            case 4:
                car_type = 2;
                break;
            case 5:
            case 6:
                car_type = 3;
                break;
            case 7:
                car_type = 4;
                break;
            case 8:
            case 9:
                car_type = 5;
                break;
            case 10:
                car_type = 6;
                break;
        }
    }
    /* car_type = 6; */
    /* make sure there is enought space for user car to change road */
    enough_space = true;
    for (index = 0; index < F1RACE_OPPOSITE_CAR_COUNT; index++)
    {
        if ((f1race_opposite_car[index].is_empty == false) &&
            (f1race_opposite_car[index].pos_y < (F1RACE_PLAYER_CAR_IMAGE_SIZE_Y * 1.5)))
        {
            enough_space = false;
        }
    }

    if (enough_space == false)
    {
        return;
    }

    speed_add = f1race_level - 1;
    if (speed_add > 0)
	{speed_add = speed_add / 4;}
    /* Init opposite car */
    f1race_opposite_car[validIndex].is_empty = false;
    f1race_opposite_car[validIndex].is_add_score = false;
    f1race_opposite_car[validIndex].dx = f1race_opposite_car_type[car_type].dx;
    f1race_opposite_car[validIndex].dy = f1race_opposite_car_type[car_type].dy;
    f1race_opposite_car[validIndex].speed = f1race_opposite_car_type[car_type].speed + speed_add;
    f1race_opposite_car[validIndex].dx_from_road = f1race_opposite_car_type[car_type].dx_from_road;
    f1race_opposite_car[validIndex].image = f1race_opposite_car_type[car_type].image;

    car_shift = f1race_opposite_car[validIndex].dx_from_road;

    switch (road)
    {
        case 0:
            car_pos_x = F1RACE_ROAD_0_START_X + car_shift;
            break;
        case 1:
            car_pos_x = F1RACE_ROAD_1_START_X + car_shift;
            break;
        case 2:
            car_pos_x = F1RACE_ROAD_2_START_X + car_shift;
            break;
    }

    f1race_opposite_car[validIndex].pos_x = car_pos_x;
    f1race_opposite_car[validIndex].pos_y = F1RACE_DISPLAY_START_Y - f1race_opposite_car[validIndex].dy;
    f1race_opposite_car[validIndex].road_id = road;

    f1race_last_car_road = road;

}

function F1Race_Render_Opposite_Car()
{
    var index;
    for (index = 0; index < F1RACE_OPPOSITE_CAR_COUNT; index++)
    {
        if (f1race_opposite_car[index].is_empty == false)
        {
            gui_show_image(
                f1race_opposite_car[index].pos_x,
                f1race_opposite_car[index].pos_y,
                f1race_opposite_car[index].image);
        }
    }
};
		
function F1Race_Crashing()
{
    document.getElementById("audio-f1race").pause();
    document.getElementById("audio-f1race_lowcost").pause();
    document.getElementById("audio-crash").pause();
    document.getElementById("audio-gameover").pause();

    document.getElementById("audio-crash").currentTime = 0;
    document.getElementById("audio-crash").play();
    f1race_is_crashing = true;
}

function F1Race_Draw_GameOver()
{       mmi_gfx_draw_gameover_screen(IMG_GX_F1RACE_GOTEXT, IMG_GX_F1RACE_GRADESMAP, IMG_GX_F1RACE_GOPIC, f1race_score)
      gover = true;
	  document.getElementById("audio-gameover").play();
}

function F1Race_Framemove()
{
    var shift;
    var max;
    var index;

    f1race_player_car_fly_duration++;
    if (f1race_player_car_fly_duration == F1RACE_PLAYER_CAR_FLY_FRAME_COUNT)
    {
        f1race_player_is_car_fly = false;
    }

    /* Player car movement */
    shift = F1RACE_PLAYER_CAR_SHIFT;
    if (f1race_key_up_pressed)
    {
        if (f1race_player_car.pos_y - shift < F1RACE_DISPLAY_START_Y)
        {
            shift = f1race_player_car.pos_y - F1RACE_DISPLAY_START_Y - 1;
        }

        if (f1race_player_is_car_fly == false)
        {
            f1race_player_car.pos_y -= shift;
        }
    }

    if (f1race_key_down_pressed)
    {
        max = f1race_player_car.pos_y + f1race_player_car.dy;
        if (max + shift > F1RACE_DISPLAY_END_Y)
        {
            shift = F1RACE_DISPLAY_END_Y - max;
        }

        if (f1race_player_is_car_fly == false)
        {
            f1race_player_car.pos_y += shift;
        }
    }

    if (f1race_key_right_pressed)
    {
        max = f1race_player_car.pos_x + f1race_player_car.dx;
        if (max + shift > F1RACE_ROAD_2_END_X)
        {
            shift = F1RACE_ROAD_2_END_X - max;
        }

        f1race_player_car.pos_x += shift;
    }

    if (f1race_key_left_pressed)
    {
        if (f1race_player_car.pos_x - shift < F1RACE_ROAD_0_START_X)
        {
            shift = f1race_player_car.pos_x - F1RACE_ROAD_0_START_X - 1;
        }

        f1race_player_car.pos_x -= shift;
    }

    /* Oppoiste Car movement */
    for (index = 0; index < F1RACE_OPPOSITE_CAR_COUNT; index++)
    {
        if (f1race_opposite_car[index].is_empty == false)
        {
            /* move one step foward */
            f1race_opposite_car[index].pos_y += f1race_opposite_car[index].speed;

            /* Test if this car within valid display region */
            if (f1race_opposite_car[index].pos_y > (F1RACE_DISPLAY_END_Y + f1race_opposite_car[index].dy))
            {
                /* out of display region, free the slot */
                f1race_opposite_car[index].is_empty = true;
            }

        }
    }

    /* Player car fly */
    if (f1race_player_is_car_fly != false)
    {
        /* car fly movement */
        shift = F1RACE_PLAYER_CAR_FLY_SHIFT;
        if (f1race_player_car.pos_y - shift < F1RACE_DISPLAY_START_Y)
        {
            shift = f1race_player_car.pos_y - F1RACE_DISPLAY_START_Y - 1;
        }

        f1race_player_car.pos_y -= shift;
    }
    else
    {
        /* Car not flying , process collision Test */
        F1Race_CollisionCheck();
    }

    F1Race_New_Opposite_Car();

}

function F1Race_Render_Player_Car_Crash()
{
    gui_show_image(
        f1race_player_car.pos_x,
        f1race_player_car.pos_y - 5,IMG_GX_F1RACE_PLAYER_CAR_CRASH);

}



function F1Race_Render()
{
	
	ctx.rect(F1RACE_DISPLAY_START_X, F1RACE_DISPLAY_START_Y, F1RACE_DISPLAY_END_X, F1RACE_DISPLAY_END_Y-4);
    ctx.stroke();
    ctx.clip();
    F1Race_Render_Background();
	F1Race_Render_Status();
    F1Race_Render_Road();
    F1Race_Render_Separator();
    F1Race_Render_Opposite_Car();
    F1Race_Render_Player_Car();
}


//main
var low_cost_audio = false;
function newGame ()
{var index;
document.getElementById("audio-f1race").pause();
document.getElementById("audio-f1race_lowcost").pause();
document.getElementById("audio-crash").pause();
document.getElementById("audio-crash").currentTime = 0;
document.getElementById("audio-gameover").pause();
document.getElementById("audio-gameover").currentTime = 0;

document.getElementById("audio-f1race" + (low_cost_audio ? "_lowcost" : "")).currentTime = 0;
document.getElementById("audio-f1race" + (low_cost_audio ? "_lowcost" : "")).play();

const Timer = setInterval(F1Race_Cyclic_Timer, F1RACE_TIMER_ELAPSE);
f1race_is_new_game = true;
f1race_is_crashing = false;
f1race_key_up_pressed = false;
f1race_key_down_pressed = false;
f1race_key_right_pressed = false;
f1race_key_left_pressed = false;
f1race_separator_0_block_start_y = F1RACE_DISPLAY_START_Y;
f1race_separator_1_block_start_y = F1RACE_DISPLAY_START_Y;
f1race_crashing_count_down = 10;
f1race_player_is_car_fly = false;
f1race_player_car.pos_x = ((F1RACE_ROAD_1_START_X + F1RACE_ROAD_1_END_X - F1RACE_PLAYER_CAR_IMAGE_SIZE_X) / 2),
f1race_player_car.pos_y = F1RACE_DISPLAY_END_Y - F1RACE_PLAYER_CAR_IMAGE_SIZE_Y - 1;
f1race_opposite_car_type 
f1race_is_crashing = false;
f1race_last_car_road = 0;
f1race_score = 0;
f1race_level = 1;
f1race_pass = 0;
f1race_fly_count = 1;
f1race_fly_charger_count = 0;	


    for (index = 0; index < F1RACE_OPPOSITE_CAR_COUNT; index++)
    {
        f1race_opposite_car[index].is_empty = true; /* clear all slot, no car */
        f1race_opposite_car[index].is_add_score = false;
    }


function F1Race_Cyclic_Timer()
{

    // 0 = false. (not gameover) 
    if (f1race_is_crashing == false)
    {
        F1Race_Framemove();
        F1Race_Render();
    }
    else
    {
        f1race_crashing_count_down--;
		console.log(f1race_crashing_count_down);
        F1Race_Render_Player_Car_Crash();
        if (f1race_crashing_count_down <= 0)
        {
            f1race_is_crashing = false;
            f1race_is_new_game = true;
			clearInterval(Timer);
            F1Race_Draw_GameOver();
        }
    }


}};
gover = true;
gui_fill_rectangle(0,0,canvasWidth,canvasHeight,gui_color(255,255,255));


//loader

	gui_show_image(canvasWidth*10, canvasHeight*10, IMG_GX_F1RACE_GOPIC);
	gui_show_image(canvasWidth*10, canvasHeight*10, IMG_GX_F1RACE_GRADESMAP);
	gui_show_image(canvasWidth*10, canvasHeight*10, IMG_GX_F1RACE_GOTEXT);
	for (var numsp = 0;numsp<10;numsp++)
	{gui_show_image(canvasWidth*10, canvasHeight*10, 'GameImages/F1race/GAME_F1RACE_NUMBER_'+numsp+'.gif');}
	for (var opcarsp = 0;opcarsp<7;opcarsp++)
	{gui_show_image(canvasWidth*10, canvasHeight*10, 'GameImages/F1race/GAME_F1RACE_OPPOSITE_CAR_'+opcarsp+'.gif');}		
	gui_show_image(canvasWidth*10, canvasHeight*10, IMG_GX_F1RACE_PLAYER_CAR);
	gui_show_image(canvasWidth*10, canvasHeight*10, IMG_GX_F1RACE_PLAYER_CAR_CRASH);
	gui_show_image(canvasWidth*10, canvasHeight*10, IMG_GX_F1RACE_PLAYER_CAR_FLY);
	gui_show_image(canvasWidth*10, canvasHeight*10, IMG_GX_F1RACE_PLAYER_CAR_FLY_UP);
	gui_show_image(canvasWidth*10, canvasHeight*10, IMG_GX_F1RACE_PLAYER_CAR_FLY_DOWN);
	gui_show_image(canvasWidth*10, canvasHeight*10, IMG_GX_F1RACE_STATUS_FLY);
	gui_show_image(canvasWidth*10, canvasHeight*10, IMG_GX_F1RACE_STATUS_LEVEL);
	gui_show_image(canvasWidth*10, canvasHeight*10, IMG_GX_F1RACE_STATUS_SCORE);

//Main menu	
	
gui_draw_horizontal_line(0,canvasWidth/2-24,10,gui_color(0,0,0));
c = gui_color(135,159,255);
gui_fill_rectangle(10,48,120,70,c);      
	  ctx.font = Math.round(canvasWidth/10)-1+'px arial';
	  ctx.textAlign = 'center';
	  ctx.fillStyle=gui_color(0,0,0);
    ctx.fillText('F1 Race', canvasWidth/2, 15);
gui_draw_horizontal_line(canvasWidth/2+24,canvasWidth,10,gui_color(0,0,0));	
ctx.fillText('Play', canvasWidth/2, canvasHeight/2);

//defines
var canvasWidth = 176;
var canvasHeight = 220;
var resolution = canvasWidth+'x'+canvasHeight;
var use_gdi = false;
var skin = 'copter';
var spritePath = 'GameImages/Copter/copter_'+resolution+'_'+skin+'/';

switch(resolution)
{case '128x160':
var MMI_GX_COPTER_GAME_ORIGIN = 32;     /* where the game really is rendered */
var MMI_GX_COPTER_SCORE_POSITION_X = 10;
var MMI_GX_COPTER_LCD_HEIGHT = 160;
var MMI_GX_COPTER_LCD_WIDTH = 128;
var MMI_GX_COPTER_GAME_HEIGHT = 110;
break;
case '128x128':
var MMI_GX_COPTER_GAME_ORIGIN = 17;     /* where the game really is rendered */
var MMI_GX_COPTER_SCORE_POSITION_X = 34;
var MMI_GX_COPTER_LCD_HEIGHT = 128;
var MMI_GX_COPTER_LCD_WIDTH = 128;
var MMI_GX_COPTER_GAME_HEIGHT = 110;
break;
case '176x220':
var MMI_GX_COPTER_GAME_ORIGIN = 44;     /* where the game really is rendered */
var MMI_GX_COPTER_SCORE_POSITION_X = 15;
var MMI_GX_COPTER_LCD_HEIGHT = 220;
var MMI_GX_COPTER_LCD_WIDTH = 176;
var MMI_GX_COPTER_GAME_HEIGHT = 151;
break;}




if (resolution == '128x128' || resolution == '128x160')
{var MMI_GX_COPTER_SCORE_POSITION_Y = 9;
var MMI_GX_COPTER_TITLE_POSITION_X = 70;
var MMI_GX_COPTER_OBSTACLE_WIDTH = 8;
var MMI_GX_COPTER_OBSTACLE_HEIGHT = 24;
var MMI_GX_COPTER_OBSTACLE_SPEED = 3;
var MMI_GX_COPTER_COPTER_HEIGHT = 12;
var MMI_GX_COPTER_COPTER_WIDTH = 25;
var MMI_GX_COPTER_COPTER_X = 14;
var MMI_GX_COPTER_DIGIT_WIDTH = 4;}

else if (resolution == '176x220')
{var MMI_GX_COPTER_SCORE_POSITION_Y = 9;
var MMI_GX_COPTER_TITLE_POSITION_X = 90;
var MMI_GX_COPTER_OBSTACLE_WIDTH = 11;
var MMI_GX_COPTER_OBSTACLE_HEIGHT = 33;
var MMI_GX_COPTER_OBSTACLE_SPEED = 4;
var MMI_GX_COPTER_COPTER_HEIGHT = 17;
var MMI_GX_COPTER_COPTER_WIDTH = 35;
var MMI_GX_COPTER_COPTER_X = 19;
var MMI_GX_COPTER_DIGIT_WIDTH = 6;}

var MMI_GX_COPTER_OBSTACLE_COUNT   = (MMI_GX_COPTER_LCD_WIDTH / MMI_GX_COPTER_OBSTACLE_WIDTH + 1);     /* := screen width / obstacle width + 1 */
var MMI_GX_COPTER_BACK_COLOR = gui_color(0, 0, 0);
var MMI_GX_COPTER_BORDER_COLOR = gui_color(71, 71, 71);
var MMI_GX_COPTER_LIGHT_BORDER = gui_color(133, 133, 133);
var MMI_GX_COPTER_DARK_BORDER  = gui_color(16, 16, 16);


//sprites
var IMG_ID_GX_COPTER_BOX = spritePath+'gx_copter_box.gif';
var IMG_ID_GX_COPTER_SCORE = spritePath+'gx_copter_score.bmp';

function mmi_gx_copter_draw_static_background()
{

    
if (use_gdi == false)
{gui_fill_rectangle(0, 0, MMI_GX_COPTER_LCD_WIDTH - 1, MMI_GX_COPTER_LCD_HEIGHT - 1, MMI_GX_COPTER_BACK_COLOR);} 

gui_fill_rectangle(0, 0, MMI_GX_COPTER_LCD_WIDTH - 1, MMI_GX_COPTER_GAME_ORIGIN, MMI_GX_COPTER_BORDER_COLOR);

if (resolution == '128x160' || resolution == '176x220')
{    gui_fill_rectangle(
        0,
        MMI_GX_COPTER_GAME_ORIGIN + MMI_GX_COPTER_GAME_HEIGHT + 1,
        MMI_GX_COPTER_LCD_WIDTH - 1,
        MMI_GX_COPTER_LCD_HEIGHT - 1,
MMI_GX_COPTER_BORDER_COLOR);
    gui_draw_horizontal_line(2, MMI_GX_COPTER_LCD_WIDTH - 1 - 2, 1, MMI_GX_COPTER_LIGHT_BORDER);
    gui_draw_horizontal_line(
        2,
        MMI_GX_COPTER_LCD_WIDTH - 1 - 2,
        MMI_GX_COPTER_GAME_ORIGIN - 2,
        MMI_GX_COPTER_DARK_BORDER);
    gui_draw_vertical_line(2, MMI_GX_COPTER_GAME_ORIGIN - 3, 1, MMI_GX_COPTER_LIGHT_BORDER);
    gui_draw_vertical_line(
        2,
        MMI_GX_COPTER_GAME_ORIGIN - 3,
        MMI_GX_COPTER_LCD_WIDTH - 1 - 1,
        MMI_GX_COPTER_DARK_BORDER);

    /* bottom four lines here */
    gui_draw_horizontal_line(
        2,
        MMI_GX_COPTER_LCD_WIDTH - 1 - 2,
        MMI_GX_COPTER_GAME_ORIGIN + MMI_GX_COPTER_GAME_HEIGHT + 1,
        MMI_GX_COPTER_LIGHT_BORDER);
    gui_draw_horizontal_line(
        2,
        MMI_GX_COPTER_LCD_WIDTH - 1 - 2,
        MMI_GX_COPTER_LCD_HEIGHT - 1 - 1,
        MMI_GX_COPTER_DARK_BORDER);
    gui_draw_vertical_line(
        MMI_GX_COPTER_GAME_ORIGIN + MMI_GX_COPTER_GAME_HEIGHT + 2,
        MMI_GX_COPTER_LCD_HEIGHT - 1 - 2,
        1,
        MMI_GX_COPTER_LIGHT_BORDER);
    gui_draw_vertical_line(
        MMI_GX_COPTER_GAME_ORIGIN + MMI_GX_COPTER_GAME_HEIGHT + 2,
        MMI_GX_COPTER_LCD_HEIGHT - 1 - 2,
        MMI_GX_COPTER_LCD_WIDTH - 1 - 1,
        MMI_GX_COPTER_DARK_BORDER);}

switch(resolution)
{case '128x160':
case '176x220':
gui_show_image(MMI_GX_COPTER_SCORE_POSITION_X + 2, MMI_GX_COPTER_SCORE_POSITION_Y - 1,IMG_ID_GX_COPTER_SCORE);
break;
case '128x128':
gui_show_image(MMI_GX_COPTER_SCORE_POSITION_X + 1, MMI_GX_COPTER_SCORE_POSITION_Y - 2, IMG_ID_GX_COPTER_SCORE);
break;}

switch(resolution)
{case '128x160':
gui_show_image(MMI_GX_COPTER_SCORE_POSITION_X, MMI_GX_COPTER_SCORE_POSITION_Y + 7, IMG_ID_GX_COPTER_BOX);
break;
case '176x220':
gui_show_image(MMI_GX_COPTER_SCORE_POSITION_X, MMI_GX_COPTER_SCORE_POSITION_Y + 10, IMG_ID_GX_COPTER_BOX);
break;
case '128x128':
gui_show_image(MMI_GX_COPTER_SCORE_POSITION_X + 29, MMI_GX_COPTER_SCORE_POSITION_Y - 4, IMG_ID_GX_COPTER_BOX);
break;}}

mmi_gx_copter_draw_static_background();
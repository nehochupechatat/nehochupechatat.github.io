// @ts-check

// _____________________________________________________________________________
//
//  Defines
// _____________________________________________________________________________
//
let width = 176;
let height = 220;
let resolution = `${width}x${height}`;
let use_gdi = false;
let skin = 'copter';

let MMI_GX_COPTER_GAME_ORIGIN = 44;
let MMI_GX_COPTER_SCORE_POSITION_X = 15;
let MMI_GX_COPTER_LCD_HEIGHT = 220;
let MMI_GX_COPTER_LCD_WIDTH = 176;
let MMI_GX_COPTER_GAME_HEIGHT = 151;

let MMI_GX_COPTER_SCORE_POSITION_Y = 9;
let MMI_GX_COPTER_TITLE_POSITION_X = 90;
let MMI_GX_COPTER_OBSTACLE_WIDTH = 11;
let MMI_GX_COPTER_OBSTACLE_HEIGHT = 33;
let MMI_GX_COPTER_OBSTACLE_SPEED = 4;
let MMI_GX_COPTER_COPTER_HEIGHT = 17;
let MMI_GX_COPTER_COPTER_WIDTH = 35;
let MMI_GX_COPTER_COPTER_X = 19;
let MMI_GX_COPTER_DIGIT_WIDTH = 6;

// these 3 are GDI mode only
let MMI_GX_COPTER_BACKGROUND_SPEED = MMI_GX_COPTER_OBSTACLE_SPEED / 2;
let MMI_GX_COPTER_TRANSPARENT_COLOR = GDI_COLOR_BLUE;
let MMI_GX_COPTER_BG_LIST_NUMBER = 4;

let MMI_GX_COPTER_OBSTACLE_COUNT = MMI_GX_COPTER_LCD_WIDTH / MMI_GX_COPTER_OBSTACLE_WIDTH + 1;
let MMI_GX_COPTER_BACK_COLOR = gui_color(0, 0, 0);
let MMI_GX_COPTER_BORDER_COLOR = gui_color(71, 71, 71);
let MMI_GX_COPTER_LIGHT_BORDER = gui_color(133, 133, 133);
let MMI_GX_COPTER_DARK_BORDER = gui_color(16, 16, 16);

let spritePath = `GameImages/Copter/copter_${resolution}_${skin}/`;

// If the resolution or skin is changed, all of these variables (#defines in the C version) need to be updated too
function changeResolution(newWidth, newHeight, newSkin, newGdi) {
    if (newWidth) width = newWidth;
    if (newHeight) height = newHeight;
    if (newSkin) skin = newSkin;
    if (newGdi) use_gdi = newGdi;

    resolution = `${width}x${height}`;

    switch (resolution) {
        case '128x160':
            MMI_GX_COPTER_GAME_ORIGIN = 32;
            MMI_GX_COPTER_SCORE_POSITION_X = 10;
            MMI_GX_COPTER_LCD_HEIGHT = 160;
            MMI_GX_COPTER_LCD_WIDTH = 128;
            MMI_GX_COPTER_GAME_HEIGHT = 110;
            break;
    
        case '128x128':
            MMI_GX_COPTER_GAME_ORIGIN = 17;
            MMI_GX_COPTER_SCORE_POSITION_X = 34;
            MMI_GX_COPTER_LCD_HEIGHT = 128;
            MMI_GX_COPTER_LCD_WIDTH = 128;
            MMI_GX_COPTER_GAME_HEIGHT = 110;
            break;
    
        case '176x220':
            MMI_GX_COPTER_GAME_ORIGIN = 44;
            MMI_GX_COPTER_SCORE_POSITION_X = 15;
            MMI_GX_COPTER_LCD_HEIGHT = 220;
            MMI_GX_COPTER_LCD_WIDTH = 176;
            MMI_GX_COPTER_GAME_HEIGHT = 151;
            break;
    }

    if (resolution == '128x128' || resolution == '128x160') {
        MMI_GX_COPTER_SCORE_POSITION_Y = 9;
        MMI_GX_COPTER_TITLE_POSITION_X = 70;
        MMI_GX_COPTER_OBSTACLE_WIDTH = 8;
        MMI_GX_COPTER_OBSTACLE_HEIGHT = 24;
        MMI_GX_COPTER_OBSTACLE_SPEED = 3;
        MMI_GX_COPTER_COPTER_HEIGHT = 12;
        MMI_GX_COPTER_COPTER_WIDTH = 25;
        MMI_GX_COPTER_COPTER_X = 14;
        MMI_GX_COPTER_DIGIT_WIDTH = 4;
    }
    else if (resolution == '176x220') {
        MMI_GX_COPTER_SCORE_POSITION_Y = 9;
        MMI_GX_COPTER_TITLE_POSITION_X = 90;
        MMI_GX_COPTER_OBSTACLE_WIDTH = 11;
        MMI_GX_COPTER_OBSTACLE_HEIGHT = 33;
        MMI_GX_COPTER_OBSTACLE_SPEED = 4;
        MMI_GX_COPTER_COPTER_HEIGHT = 17;
        MMI_GX_COPTER_COPTER_WIDTH = 35;
        MMI_GX_COPTER_COPTER_X = 19;
        MMI_GX_COPTER_DIGIT_WIDTH = 6;
    }

    MMI_GX_COPTER_BACKGROUND_SPEED = MMI_GX_COPTER_OBSTACLE_SPEED / 2;
    MMI_GX_COPTER_OBSTACLE_COUNT = MMI_GX_COPTER_LCD_WIDTH / MMI_GX_COPTER_OBSTACLE_WIDTH + 1;

    spritePath = `GameImages/Copter/copter_${resolution}_${skin}/`;
}

// _____________________________________________________________________________
//
//  ERASE_AND_DRAW_OBSTACLES (macro)
// _____________________________________________________________________________
//
function ERASE_AND_DRAW_OBSTACLES(tmp_node, fill_rect_func, color) {
    tmp_node = g_gx_copter_context.first_obstacle;
    while (1)
    {
       /* erase ceiling obstacles */
       fill_rect_func(   tmp_node.old_position_x,
                         tmp_node.old_position_y,
                         tmp_node.old_position_x + MMI_GX_COPTER_OBSTACLE_WIDTH - 1,
                         tmp_node.old_position_y + MMI_GX_COPTER_OBSTACLE_HEIGHT - 1,
                         color);
       /* erase floor obstacles */
       fill_rect_func(   tmp_node.old_position_x,
                         tmp_node.old_position_y + g_gx_copter_context.space,
                         tmp_node.old_position_x + MMI_GX_COPTER_OBSTACLE_WIDTH - 1,
                         tmp_node.old_position_y + 2 * MMI_GX_COPTER_OBSTACLE_HEIGHT + g_gx_copter_context.space - 1,
                         color);
       if (tmp_node == g_gx_copter_context.last_obstacle)
          break;
       tmp_node = tmp_node->next;
    }

    /* draw ceiling and floor obstacles */
    tmp_node = g_gx_copter_context.first_obstacle;
    while (1)
    {
       /* draw ceiling obstacles */
       gui_show_image(   tmp_node.position_x,
                               tmp_node.position_y,
                               GetImage(IMG_ID_GX_COPTER_OBSTACLE));
       /* draw floor obstacles */
       gui_show_image(   tmp_node->position_x,
                               tmp_node->position_y + g_gx_copter_context.space,
                               GetImage(IMG_ID_GX_COPTER_OBSTACLE));
       if (tmp_node == g_gx_copter_context.last_obstacle)
          break;
       tmp_node = tmp_node.next;
    }   
}

// _____________________________________________________________________________
//
//  Debug stuff if needed?
// _____________________________________________________________________________
//

// _____________________________________________________________________________
//
//  Structs
// _____________________________________________________________________________
//
class CopterContext {
    constructor() {
        this.is_gameover = false;
        this.is_new_game = true;
        this.game_level = 0;
        this.game_grade = 0;
        this.timer_elapse = 100;
        this.key_pressed = false;
        this.tick = 0;
        this.last_sound_playing_tick = 0;
        this.slope = 0;
        this.obstacle_period = 0;
        this.max_period = 10;
        this.space = 120;
        this.local_step = 1;
        this.copter_position_y = 70;
        this.copter_position_old_y = 70;
        this.obstacle = [];
        // this.single_obstacle = ;
        // this.*first_obstacle = ;
        // this.*last_obstacle = ;
    }
}


//sprites
var IMG_ID_GX_COPTER_BOX = spritePath + 'gx_copter_box.gif';
var IMG_ID_GX_COPTER_SCORE = spritePath + 'gx_copter_score.bmp';

function mmi_gx_copter_draw_static_background() {
    if (use_gdi == false) {
        gui_fill_rectangle(0, 0, MMI_GX_COPTER_LCD_WIDTH - 1, MMI_GX_COPTER_LCD_HEIGHT - 1, MMI_GX_COPTER_BACK_COLOR);
    }

    gui_fill_rectangle(0, 0, MMI_GX_COPTER_LCD_WIDTH - 1, MMI_GX_COPTER_GAME_ORIGIN, MMI_GX_COPTER_BORDER_COLOR);

    if (resolution == '128x160' || resolution == '176x220') {
        gui_fill_rectangle(
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
            MMI_GX_COPTER_DARK_BORDER);
    }

    switch (resolution) {
        case '128x160':
        case '176x220':
            gui_show_image(MMI_GX_COPTER_SCORE_POSITION_X + 2, MMI_GX_COPTER_SCORE_POSITION_Y - 1, IMG_ID_GX_COPTER_SCORE);
            break;
        case '128x128':
            gui_show_image(MMI_GX_COPTER_SCORE_POSITION_X + 1, MMI_GX_COPTER_SCORE_POSITION_Y - 2, IMG_ID_GX_COPTER_SCORE);
            break;
    }

    switch (resolution) {
        case '128x160':
            gui_show_image(MMI_GX_COPTER_SCORE_POSITION_X, MMI_GX_COPTER_SCORE_POSITION_Y + 7, IMG_ID_GX_COPTER_BOX);
            break;
        case '176x220':
            gui_show_image(MMI_GX_COPTER_SCORE_POSITION_X, MMI_GX_COPTER_SCORE_POSITION_Y + 10, IMG_ID_GX_COPTER_BOX);
            break;
        case '128x128':
            gui_show_image(MMI_GX_COPTER_SCORE_POSITION_X + 29, MMI_GX_COPTER_SCORE_POSITION_Y - 4, IMG_ID_GX_COPTER_BOX);
            break;
    }
}

mmi_gx_copter_draw_static_background();
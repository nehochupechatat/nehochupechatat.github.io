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
    for (let tmp_node of g_gx_copter_context.obstacle)
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
    }

    /* draw ceiling and floor obstacles */
    for (let tmp_node of g_gx_copter_context.obstacle)
    {
       /* draw ceiling obstacles */
       gui_show_image(   tmp_node.position_x,
                               tmp_node.position_y,
                               IMG_ID_GX_COPTER_OBSTACLE);
       /* draw floor obstacles */
       gui_show_image(   tmp_node.position_x,
                               tmp_node.position_y + g_gx_copter_context.space,
                               IMG_ID_GX_COPTER_OBSTACLE);
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
class Obstacle {
    constructor() {
        this.position_x = 0;
        this.position_y = 0;
        this.old_position_x = 0;
        this.old_position_y = 0;
    }
}

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

        // sound stuff
    }
}
let g_gx_copter_context = new CopterContext();

// _____________________________________________________________________________
//
//  Sprites and Audio
// _____________________________________________________________________________
//
var IMG_ID_GX_COPTER_BOX = spritePath + 'gx_copter_box.gif';
var IMG_ID_GX_COPTER_SCORE = spritePath + 'gx_copter_score.bmp';
var IMG_ID_GX_COPTER_OBSTACLE = spritePath + 'gx_copter_obstacle.bmp';

// /************************************************************************/
// /* Audio [Const]                                                        */
// /************************************************************************/
// #ifndef __MMI_GAME_MULTICHANNEL_SOUND__
// #define COPTERDOWN_DVI     611
// #define COPTERFLYING_DVI   530
// #endif /* __MMI_GAME_MULTICHANNEL_SOUND__ */ 

// /* used in both */
// #define COPTERCRASH_MIDI   132

// #ifdef __MMI_GAME_MULTICHANNEL_SOUND__
// #define COPTERBACKGROUND_MIDI    1063
// #define COPTERDOWN_WAV    2444
// #define COPTERFLYING_WAV  2122
// #endif /* __MMI_GAME_MULTICHANNEL_SOUND__ */ 

// _____________________________________________________________________________
//
//  Functions
// _____________________________________________________________________________
//
function mmi_gx_copter_enter_gfx() {
    /*----------------------------------------------------------------*/
    /* Local Variables                                                */
    /*----------------------------------------------------------------*/

    /*----------------------------------------------------------------*/
    /* Code Body                                                      */
    /*----------------------------------------------------------------*/
    /* Game menu */
//     GFX.game_data.game_img_id = IMG_ID_GX_COPTER_GAME_ICON; /* game icon img ID */
// #if defined(__MMI_GAME_COPTER__)
//     GFX.game_data.game_str_id = STR_ID_GX_COPTER_GAME_NAME; /* game name string ID */
// #elif defined(__MMI_GAME_SUBMARINE__)
//     GFX.game_data.game_str_id = STR_ID_GX_COPTER_GAME_NAME_SUBMARINE;   /* game name string ID */
// #elif defined(__MMI_GAME_JET__)
//     GFX.game_data.game_str_id = STR_ID_GX_COPTER_GAME_NAME_JET; /* game name string ID */
// #endif 
//     GFX.game_data.menu_resume_str_id = STR_GAME_RESUME;     /* "Resume" string ID */
//     GFX.game_data.menu_new_str_id = STR_GAME_NEW;           /* "New Game" string ID */
//     GFX.game_data.menu_level_str_id = 0;                    /* "Game Level" string ID */
//     GFX.game_data.menu_grade_str_id = STR_GAME_GRADE;       /* "Best Grade" string ID */
//     GFX.game_data.menu_help_str_id = STR_GLOBAL_HELP;         /* "Game Help" string ID */

//     /* level / grade */
//     GFX.game_data.level_count = 1;                          /* how many levels */
//     GFX.game_data.level_str_id_list[0] = STR_GAME_SCORE;    /* level string ID */

//     /* add slot in NVRAMEnum.h */
//     GFX.game_data.grade_nvram_id_list[0] = NVRAM_GX_COPTER_SCORE;       /* grade slot in NVRAM (short) */

//     /* help */
// #if defined(__MMI_TOUCH_SCREEN__)
// #if defined(__MMI_GAME_COPTER__)
//     GFX.game_data.help_str_id = STR_ID_GX_COPTER_HELP_DESCRIPTION_TP;   /* help desciption string id */
// #elif defined(__MMI_GAME_SUBMARINE__)
//     GFX.game_data.help_str_id = STR_ID_GX_COPTER_HELP_DESCRIPTION_SUBMARINE_TP; /* help desciption string id */
// #elif defined(__MMI_GAME_JET__) 
//     GFX.game_data.help_str_id = STR_ID_GX_COPTER_HELP_DESCRIPTION_JET_TP;       /* help desciption string id */
// #endif 
// #else /* defined(__MMI_TOUCH_SCREEN__) */ 
// #if defined(__MMI_GAME_COPTER__) 
//     GFX.game_data.help_str_id = STR_ID_GX_COPTER_HELP_DESCRIPTION;      /* help desciption string id */
// #elif defined(__MMI_GAME_SUBMARINE__)
//     GFX.game_data.help_str_id = STR_ID_GX_COPTER_HELP_DESCRIPTION_SUBMARINE;    /* help desciption string id */
// #elif defined(__MMI_GAME_JET__)
//     GFX.game_data.help_str_id = STR_ID_GX_COPTER_HELP_DESCRIPTION_JET;  /* help desciption string id */
// #endif 
// #endif /* defined(__MMI_TOUCH_SCREEN__) */ 

//     /* misc */
//     GFX.game_data.grade_value_ptr = (S16*) (&g_gx_copter_context.game_grade);  /* current level's grade (S16*) */
//     GFX.game_data.level_index_ptr = (U8*) (&g_gx_copter_context.game_level);   /* ptr to current level index (U8*) */
//     GFX.game_data.is_new_game = (BOOL*) (&g_gx_copter_context.is_new_game);    /* ptr to new game flag (BOOL*) */

//     /* function ptr */
//     GFX.game_data.best_grade_func_ptr = mmi_gx_copter_calc_best_grade;  /* function to calculate best grade */
//     GFX.game_data.enter_game_func_ptr = mmi_gx_copter_enter_game;       /* function to enter new game */
//     GFX.game_data.exit_game_func_ptr = mmi_gx_copter_exit_game; /* function to exit game */
//     GFX.game_data.draw_gameover_func_ptr = mmi_gx_copter_draw_gameover; /* function to draw gameover screen */

//     /* some flags */
//     GFX.game_data.is_keypad_audio_enable = FALSE;   /* play keypad tone or not */

    mmi_gfx_entry_menu_screen();
}

function mmi_gx_copter_calc_best_grade(old_grade, new_grade) {
    if (new_grade > old_grade)
    {
        return new_grade;
    }
    else
    {
        return old_grade;
    }
}

function mmi_gx_copter_set_gameover() {
    if (g_gx_copter_context.is_gameover)
    {
        return;
    }

    g_gx_copter_context.is_gameover = true;

//     GFX_PLAY_VIBRATION();
// #ifdef __MMI_GAME_MULTICHANNEL_SOUND__

//     GFX_STOP_MULTICHANNEL_WAV(g_gx_copter_context.down_wav);
//     GFX_STOP_MULTICHANNEL_WAV(g_gx_copter_context.flying_wav);

//     GFX_PLAY_SOUND_EFFECTS_MIDI(g_gx_copter_context.crash_midi);

// #else /* __MMI_GAME_MULTICHANNEL_SOUND__ */ /* /__MMI_GAME_MULTICHANNEL_SOUND__ */
//     GFX_PLAY_AUDIO_MIDI(CopterCrash_midi, COPTERCRASH_MIDI, DEVICE_AUDIO_PLAY_ONCE);
// #endif /* __MMI_GAME_MULTICHANNEL_SOUND__ */ /* /__MMI_GAME_MULTICHANNEL_SOUND__ */

    g_gx_copter_context.game_grade = g_gx_copter_context.tick / 5;
    g_gx_copter_context.tick = 0;
}

function mmi_gx_copter_draw_gameover() {
    // GFX_PLAY_AUDIO_GAMEOVER();

    mmi_gfx_draw_gameover_screen(
        IMG_ID_GX_COPTER_GOTEXT,
        IMG_ID_GX_COPTER_GRADESMAP,
        IMG_ID_GX_COPTER_GOPIC,
        g_gx_copter_context.game_grade);
}

function mmi_gx_copter_enter_game() {
    if (g_gx_copter_context.is_new_game)
    {
        mmi_gx_copter_init_game();  /* is new game, otherwise resume game */
    }

    /* clear key state */
    g_gx_copter_context.key_pressed = false;

    if (g_gx_copter_context.is_gameover != true)
    {
        g_gx_copter_context.is_new_game = false;
        g_gx_copter_context.is_gameover = false;

        SetKeyHandler(mmi_gx_copter_key_pressed, KEY_5, KEY_EVENT_DOWN);
        SetKeyHandler(mmi_gx_copter_key_released, KEY_5, KEY_EVENT_UP);
    }

    gdi_layer_lock_frame_buffer();
    mmi_gx_copter_draw_static_background();
    mmi_gx_copter_draw_background();     
    /* render first frame */
    mmi_gx_copter_render();
    gdi_layer_unlock_frame_buffer();

    // #ifdef __MMI_GAME_MULTICHANNEL_SOUND__
    // GFX_OPEN_BACKGROUND_SOUND(Copter_background_midi, COPTERBACKGROUND_MIDI, g_gx_copter_context.background_midi);
    // GFX_PLAY_BACKGROUND_SOUND(g_gx_copter_context.background_midi);

    // GFX_OPEN_DUMMY_BACKGROUND_SOUND();
    // GFX_PLAY_DUMMY_BACKGROUND_SOUND();
    // GFX_OPEN_SOUND_EFFECTS_MIDI(CopterCrash_midi, COPTERCRASH_MIDI, 1, g_gx_copter_context.crash_midi);

    // GFX_OPEN_MULTICHANNEL_WAV(CopterDown_wav, COPTERDOWN_WAV, 0, g_gx_copter_context.down_wav);
    // GFX_OPEN_MULTICHANNEL_WAV(CopterFlying_wav, COPTERFLYING_WAV, 0, g_gx_copter_context.flying_wav);

    // GFX_STOP_MULTICHANNEL_WAV(g_gx_copter_context.down_wav);
    // GFX_STOP_MULTICHANNEL_WAV(g_gx_copter_context.flying_wav);
    // if (g_gx_copter_context.is_gameover != TRUE)
    // {
    //     GFX_PLAY_MULTICHANNEL_WAV(g_gx_copter_context.down_wav);
    // }
    // #else /* __MMI_GAME_MULTICHANNEL_SOUND__ */ /* /__MMI_GAME_MULTICHANNEL_SOUND__ */
    // if (g_gx_copter_context.is_gameover != TRUE)
    // {
    //     GFX_PLAY_AUDIO_DVI(CopterDown_dvi, COPTERDOWN_DVI, DEVICE_AUDIO_PLAY_INFINITE);
    // }
    // #endif /* __MMI_GAME_MULTICHANNEL_SOUND__ */ 

    // //  /* set bgm resume handle */
    // //      SetProtocolEventHandler(mmi_gx_copter_resume_bgm, PRT_EQ_PLAY_AUDIO_FINISH_IND);

    /* start game loop */
    mmi_gx_copter_cyclic_timer();

    #ifdef __MMI_TOUCH_SCREEN__
    wgui_register_pen_down_handler(mmi_copter_pen_down_hdlr);
    wgui_register_pen_up_handler(mmi_copter_pen_up_hdlr);
    wgui_register_pen_repeat_handler(mmi_copter_pen_repeat_hdlr);
    #endif /* __MMI_TOUCH_SCREEN__ */ 
}

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
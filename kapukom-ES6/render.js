const ctx = document.getElementById("myCanvas").getContext("2d");


function DrawBattleBox(mon,x,y)
{	
	if(mon.isPoisoned == true)
	{ailment='PSN';}
	else if (mon.isParalyzed == true)
	{ailment='PAR';}
	else
	{ailment='';}

	ctx.strokeRect(x,y, 337,164);
	ctx.fillStyle = "black";
    ctx.font = "bold 35px Lato";
	ctx.fillText(mon.nickname, x+5, y+35);
    ctx.font = "35px Lato";
	ctx.fillText("HP", x+5, y+83);
	ctx.fillText("MP", x+5, y+133);
    ctx.fillText(mon.hp, x+76, y+83);
	ctx.fillText(mon.mp, x+76, y+133);
	ctx.fillText("LV.",x+217,y+83);
    ctx.fillText(mon.level,x+266,y+83);
    ctx.fillText(this.ailment,x+217,y+133);
}



function RenderUI()
{
	ctx.fillStyle = "white";
	ctx.fillRect(0,0,864,480);
	cMon=DrawBattleBox(currMon,13,18);
	cEMon=DrawBattleBox(currEnemyMon,509,18);
}

setInterval(RenderUI,100);
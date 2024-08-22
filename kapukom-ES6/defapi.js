//Init vars;
const speed = 2;
var isCriticalHit = false;
var currPartyMember=0;
var currYourPartyMember=0;
var yourMoveMissed=false;
var dealerID=GetRandomInt(65535);
var prevMonName='';
var swapMonText=false;
var isHitWithRecoil=false;
var isDrainedHP=false;
var sideEffectText=''
var isParalyzed=false;
var bothFainted=false;
var isPoisoned=false;

//EXP Growth Constants
const GROWTH_FAST=0;
const GROWTH_MEDIUM_FAST=1;
const GROWTH_MEDIUM_SLOW=2;
const GROWTH_SLOW=3;

//Core objects
class Komrade
{ 
	constructor(speciesName, baseHP, baseMP, baseAttack, baseSpeed, baseDefense, baseIntelligence, baseXP, growthSpeed)
	{
		this.speciesName=speciesName;
		this.baseHP=baseHP;
		this.baseMP=baseMP;
		this.baseAttack=baseAttack;
		this.baseSpeed=baseSpeed;
		this.baseDefense=baseDefense;
		this.baseIntelligence=baseIntelligence;
		this.baseXP=baseXP;
		this.growthSpeed=growthSpeed;
	}
	
	NeededEXP(level)
	{	
		var n;
		var levelCubed = Math.pow(level,3);
		switch(this.growthSpeed) 
		{
			case GROWTH_FAST:
				n = ((4*levelCubed)/5)
				break;
			case GROWTH_MEDIUM_FAST:
				n = levelCubed
				break;
			case GROWTH_MEDIUM_SLOW:
				n = (levelCubed*(6/5)) - (15*Math.pow(level,2)) + (level*100) - 40;
				break;
			case GROWTH_SLOW:
				n = ((5*levelCubed)/4)
				break;
		}

		return Math.ceil(n);
	}
}

class UniqueKomrade extends Komrade
{	
	constructor(mon, level, move1, move2, move3, nickname)
	{
		super(mon.speciesName, mon.baseHP, mon.baseMP, mon.baseAttack, mon.baseSpeed, mon.baseDefense, mon.baseIntelligence, mon.baseXP, mon.growthSpeed);
		//Get DVs
		this.speedDV=GetRandomInt(16);
		this.intelDV=GetRandomInt(16);
		this.attackDV=GetRandomInt(16);
		this.defenseDV=GetRandomInt(16);
		this.hpDV=GetRandomInt(16);
		this.mpDV=GetRandomInt(16);

		//Determine stat EXP and nickname
		this.attackEXP = 0;
		this.hpEXP = 0;
		this.defenseEXP = 0;
		this.mpEXP = 0;
		this.speedEXP = 0;
		this.intelEXP = 0;
		if(typeof nickname != 'string')
		{this.nickname = mon.speciesName;}
		else
		{this.nickname = nickname;}

		//Determine stats
		this.level = level;
		this.EXP = this.NeededEXP(level - 1);
		this.GetMonStats();
		this.hp = this.maxHP;
		this.mp = this.maxMP;
		this.OT = dealerID;
		this.move1=move1;
		this.move2=move2;
		this.move3=move3;
		this.moves = [move1,move2,move3];
		this.participated = false;
		this.isParalyzed = false;
		this.isPoisoned = false;
		
		//determine battle stat modifiers
		this.attackModifier = 0;
		this.defenseModifier = 0;
		this.intelligenceModifier = 0;
		this.speedModifier = 0;
		this.evasionModifier = 0;
		this.accuracyModifier = 0;
	}

	CalcStats(base,DV,level,statEXP,bool)
	{	
		let sqrt = statEXP > 0 ? Math.ceil(Math.sqrt(statEXP) / 4) : 0;
		let modifier = bool ? level + 10 : 5;
		return Math.round(((((base + DV) * 2)+sqrt) * level) / 100 + modifier);
	}

	ResetBattleStatModifiers()
	{
		this.attackModifier = 0;
		this.defenseModifier = 0;
		this.intelligenceModifier = 0;
		this.speedModifier = 0;
		this.evasionModifier = 0;
		this.accuracyModifier = 0;
	}
	
	GetMonStats()
	{	
		this.unmodAttack = this.CalcStats(this.baseAttack, this.attackDV, this.level, this.attackEXP,false);
		this.unmodDefense = this.CalcStats(this.baseDefense, this.defenseDV, this.level, this.defenseEXP,false);
		this.maxHP = this.CalcStats(this.baseHP, this.hpDV, this.level, this.hpEXP,true);
		this.maxMP = this.CalcStats(this.baseMP, this.mpDV, this.level, this.mpEXP,false);
		this.unmodSpeed = this.CalcStats(this.baseSpeed, this.speedDV, this.level, this.speedEXP,false);
		this.unmodIntelligence = this.CalcStats(this.baseIntelligence, this.intelDV, this.level, this.intelEXP,false);
		this.attack=this.unmodAttack;
		this.CheckStatsForAilments();
		this.defense=this.unmodDefense;
		this.intelligence = this.unmodIntelligence;
	}
	
	CompareMonStats(base,DV,level,statEXP,bool)
	{
		return this.CalcStats(base, DV, level, statEXP, bool) - this.CalcStats(base, DV, level - 1, statEXP, bool);
	}
	
	CheckStatsForAilments()
	{
		this.speed = this.isParalyzed ? this.unmodSpeed / 4 : this.unmodSpeed;
	}

}

//bool is a binary that determines whether it's a brawl or brain move
class Move
{
	constructor(moveName, power, MPCost, bool, accuracy, effect, percentageOfSide)
	{
		this.moveName=moveName;
		this.power = power;
		this.MPCost = MPCost;
		this.bool = Boolean(bool);
		this.accuracy = accuracy
		this.effect = effect;
		this.percentageOfSide = percentageOfSide;
	}
}

//Core functions
function GetRandomInt(int)
{return Math.round(Math.random()*int);}

function CriticalCalc()
{
	c=Math.random()*100;

	if (c > 80)
	{
		i=1;console.log("Critical hit!")
	}
	else
	{
		i=0;
	}

	return i;
}

function ParalyzeTarget(Komrade)
{if (Komrade.isParalyzed == false && Komrade.hp > 0 && Komrade.isPoisoned == false)
{isParalyzed = true;
Komrade.isParalyzed = true;
Komrade.CheckStatsForAilments();}

if(Komrade == currEnemyMon)
{sideEffectText="Enemy "+Komrade.nickname+"\nwas paralyzed!";}
else
{sideEffectText="Your "+Komrade.nickname+"\nwas paralyzed!";}}

function ParalyzeTargetChance(Komrade,i)
{if (GetRandomInt(100) < i || i >= 100)
{ParalyzeTarget(Komrade);}}

function PoisonTarget(Komrade)
{if (Komrade.isPoisoned == false && Komrade.hp > 0 && Komrade.isParalyzed == false)
{isPoisoned = true;
Komrade.isPoisoned = true;}}

function PoisonTargetChance(Komrade,i)
{if (GetRandomInt(100) < i || i >= 100)
{PoisonTarget(Komrade);}}

function CalculateDamage(target1,target2,movePower,moveBool)
{
	crit=CriticalCalc();
	if(crit > 0)
	{isCriticalHit = true;}
	else
	{isCriticalHit = false;}
	if(moveBool<1)
	{attackType = (target1.attack) * GetStatModifierStages(target1.attackModifier,false);}
	else
	{attackType = (target1.intelligence * 0.6) * GetStatModifierStages(target1.intelligenceModifier,false);}
	return Math.round((((2*target1.level*(crit+1)/5+2)*movePower * attackType/(currEnemyMon.defense * GetStatModifierStages(target2.defenseModifier,false)))/50+2) * ((Math.round((Math.random()*30)+20)/30)));	
}

function DealDamage(target1,target2,power,bool,MoveEffect,pc)
{	
	//Valid MoveEffect_* function must contain:
	//target 1 (giver), target 2 (taker), move power, move type (brawl or brain), and percentage of side effect stuff 
	MoveEffect(target1,target2,power,bool,pc);
}

function SubtractHPFromTarget(target1,target2,power,bool)
{
	attacked=CalculateDamage(target1,target2,power,bool);

	if(target2.hp > 0)
	{
		target2.hp -= attacked;
		if(target1 == currMon)
		{Damagetext="Dealt "+attacked+"\ndamage to foe!";}
		else
		{Damagetext="Foe dealt "+attacked+"\ndamage to you!";}
	}
	else
	{target2.hp=0;}
	return attacked;
}

function DealRecoilDamage(damage,target,percentage)
{
	if(target.hp > 0)
	{isHitWithRecoil=true;	
	target.hp -= Math.round(attacked*(percentage/100));}
}

function RewardStatEXP(Komrade)
{
	//Add stat experience
	Komrade.attackEXP += currEnemyMon.baseAttack;
	Komrade.speedEXP += currEnemyMon.baseSpeed;
	Komrade.hpEXP += currEnemyMon.baseHP;
	Komrade.mpEXP += currEnemyMon.baseMP;
	Komrade.defenseEXP += currEnemyMon.baseDefense;
	Komrade.intelEXP += currEnemyMon.baseIntelligence;

	Komrade.GetMonStats();
}

function FindAliveMon()
{
	for(k=0;k<yourParty.length;k++)
	{
		if (yourParty[k].hp > 0 && yourParty[k].hp != undefined)
		{return k;break;}
	}
	return null;
}

function FindAliveEnemyMon()
{
	for(k=0;k<oppParty.length;k++)
	{
		if (oppParty[k].hp > 0 && oppParty[k].hp != undefined)
		{return k;break;}
	}
}

function ParticipatedMonsters()
{	for(i=0,j=0;i<yourParty.length;i++)
	{	
		if(yourParty[i] && yourParty[i].participated == true)
		{j++;}
	}
	return j;
}

function DefineEXPReward()
{EXPReward = Math.round(((currEnemyMon.baseXP * currEnemyMon.level) / 4) / ParticipatedMonsters());}

function DealPoisonDamage(Komrade)
{Komrade.hp -= Math.ceil(Komrade.maxHP/16);}

function GetStatModifierStages(i,bool)
{		
    let arr = [0.25, 0.28, 0.33, 0.4, 0.5, 0.66, 1, 1.5, 2, 2.5, 3, 3.5, 4];
	if(bool==true)
	{arr=arr.reverse();}
    return arr[i + 6] ?? 1;
}

function getCollectiveEnemyPartyHP()
{
	for(j=0,m=0;j<oppParty.length;j++)
	{
		m+=oppParty[j].hp;
	}
	return m;
}

function GetMoveAccuracy(Move,target1,target2)
{return Math.round(Move.accuracy * GetStatModifierStages(target1.accuracyModifier,false) * GetStatModifierStages(target2.evasionModifier,true));}

												  
function Attack(Move,target1,target2)
{
	r=GetRandomInt(100);
	moveAccuracy = GetMoveAccuracy(Move,target1,target2);
	if(currMon.mp >=Move.MPCost || Move.MPCost == 0)
	{
	
		if(GetRandomInt(100) < 75 || currMon.isParalyzed == false)
		{	
			if(moveAccuracy > r || Move.accuracy == 100)
			{
				DealDamage(target1, target2, Move.power, Move.bool, Move.effect, Move.percentageOfSide);
				target1.mp -= Move.MPCost;
				if (currEnemyMon.hp < 0)
				{currEnemyMon.hp=0;}
				if (currMon.hp < 0)
				{currMon.hp=0;}
				console.log(target1.nickname + " used\n" + Move.moveName + "!");
				console.log(Damagetext);
			}
	
			else
			{
				console.log(target1 + " missed!");
				target1.mp -= Math.round(Move.MPCost/2);
			}
		}
		else
		{
			console.log(target1 + " is fully paralyzed!");
			target1.mp -= Math.round(Move.MPCost/4);
		}

	}
	else
	{
		console.log("Not enough MP to use this move!");
	}
	usedMove = Move.moveName;
}

function RecalcParticipants()
{	
		for(m=0;m<yourParty.length;m++)
		{	
			if(yourParty[m] && yourParty[m].hp !=undefined)
			{yourParty[m].participated = false;}
		}
	currMon.participated=true;
	DefineEXPReward();
}

function LevelUPCheck()
{
	for(m=0;m<yourParty.length;m++)
	{
		if(yourParty[m].participated == true)
		{
			if(yourParty[m].EXP >= neededXP(yourParty[m].level, yourParty[m].mon))
			{
				yourParty[m].level++;
				console.log(yourParty[m]+" leveled up!");
				yourParty[m].GetMonStats();
				return true;
				break;
			}
		}
	}
	return false;
}

function GetParticipatedMonName() 
{

    if (typeof GetParticipatedMonName.currentIndex == 'undefined') 
	{
        GetParticipatedMonName.currentIndex = 0;
    }


    for (m=GetParticipatedMonName.currentIndex;m<yourParty.length;m++) 
		{
        	if (yourParty[m].participated === true) 
			{
            	GetParticipatedMonName.currentIndex = m + 1;
            	return yourParty[m].nickname;
				break;
        	}
    	}

    GetParticipatedMonName.currentIndex = 0;
    return null; 
}

function SwitchEnemyMon()
{	
	RecalcParticipants();
	currPartyMember=FindAliveEnemyMon();
	oppParty.currMon=oppParty[currPartyMember];
	currEnemyMon = oppParty.currMon;
}

function RewardEXP()
{
	for(m=0;m<yourParty.length;m++)
		{
			if(yourParty[m].participated == true)
			{
				yourParty[m].EXP +=EXPReward;
				RewardStatEXP(yourParty[m]);
			}
		}
}

function BothFainted()
{	
	if(bothFainted==true)
	{bothFainted==false;
	SwitchEnemyMon();}
}


function MoveEffect_RecoilDamagePercentage(target1,target2,power,bool,pc)
{
	dmg=SubtractHPFromTarget(target1,target2,power,bool);
	DealRecoilDamage(dmg,target1,pc);
}

function MoveEffect_DamageWithParalyzeSideEffect(target1,target2,power,bool,pc)
{
	dmg=SubtractHPFromTarget(target1,target2,power,bool);
	ParalyzeTargetChance(target2,pc);
}

function MoveEffect_DamageWithPoisonSideEffect(target1,target2,power,bool,pc)
{
	dmg=SubtractHPFromTarget(target1,target2,power,bool);
	PoisonTargetChance(target2,pc);
}

function MoveEffect_Hit(target1,target2,power,bool,pc)
{SubtractHPFromTarget(target1,target2,power,bool);}

function MoveEffect_DrainDamage(target1,target2,power,bool,pc)
{		
		dmg=SubtractHPFromTarget(target1,target2,power,bool);
		if(target1.hp < target1.maxHP && target2.hp > 0)
		{hpGain = Math.round(dmg*(pc/100));
		target1.hp += hpGain;
		
		if(target1.hp > target1.maxHP)
		{target1.hp = target1.maxHP;}
		if(target1 == currMon)
		{sideEffectText="Drained "+hpGain+"\nHP from foe!";}
		else
		{sideEffectText="Foe drained "+hpGain+"\nHP from you!"}
		_global.isDrainedHP=true;}
}

//Move(moveName, power, MPCost, bool, accuracy, effect, percentageOfSide)
const MoveStoneThrow = new Move ("Stone Throw", 18, 0, 0, 100, MoveEffect_Hit, 0);
const MoveStunBall = new Move   ("Stun Ball", 36, 2, 0, 80,    MoveEffect_DamageWithParalyzeSideEffect, 100);
const MoveJumpscare = new Move  ("Jumpscare", 64, 4, 1, 64,    MoveEffect_Hit, 0);
const MoveSneeze = new Move     ("Sneeze", 16, 0, 0, 100,      MoveEffect_RecoilDamagePercentage, 50);
//Move(moveName, power, MPCost, bool, accuracy, effect, percentageOfSide)
const MoveStoneThrow = new Move ("Stone Throw", 18, 0, 0, 100, MoveEffect_Hit, 0);
const MoveStunBall = new Move   ("Stun Ball", 36, 2, 0, 80,    MoveEffect_DamageWithParalyzeSideEffect, 100);
const MoveJumpscare = new Move  ("Jumpscare", 64, 4, 1, 64,    MoveEffect_Hit, 0);
const MoveSneeze = new Move     ("Sneeze", 16, 0, 0, 100,      MoveEffect_RecoilDamagePercentage, 50);
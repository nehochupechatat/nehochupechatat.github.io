//get your stats and party
level=6;
yourTelekompanjon = new UniqueKomrade(KomradeTelekompanjon, 1, MoveStoneThrow, MoveStunBall, MoveJumpscare,null);
yourTelekompanjon2 = new UniqueKomrade(KomradeTelekompanjon, level, MoveStoneThrow, MoveStunBall, MoveJumpscare,"VID-TV");
yourParty=[yourTelekompanjon,yourTelekompanjon2,null,null,null,null];
yourParty.sort();
yourParty.currMon=yourParty[0];

//get enemy mon stats
enemylevel=4;
OppKlonowisze = new UniqueKomrade(KomradeKlonowisze, enemylevel, MoveSneeze,null,null,null,null);
OppKlonowisze2 = new UniqueKomrade(KomradeKlonowisze, enemylevel, MoveSneeze,null,null,"Dollee");
OppKlonowiszeNew = new UniqueKomrade(KomradeKlonowisze, enemylevel, MoveSneeze,null,null,"Dolly");
oppParty=[OppKlonowisze,OppKlonowisze2,OppKlonowiszeNew,null];
oppParty.sort();
oppParty.currMon=oppParty[0];

//Globalize
currMon = yourParty.currMon;
currEnemyMon = oppParty.currMon;
currMon.participated=true;

currMon.ResetBattleStatModifiers();
currEnemyMon.ResetBattleStatModifiers();

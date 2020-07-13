//It looks like all we have to do now is add the turn functionality, hook this into the database, add graphics & music, and the battles should be working.
//NOTE TO SELF: I may need to code the HTML in this file instead since a lot of it will be dynamic.
//NEW NOTE TO SELF: When outputting Pokemon or Pokedex stuff, make sure that the entry display is added by 1 because of array rules.
//Variables for some for loop conditions.


/*
--------------TO MY COLLABORATORS--------------
I have the opponent moveset up for debugging.
I decided to name all of them gengar for testing.
I made it so that all we need to do is get the info from the database, the battle logic is almost fully implemented.
To-do:
HUD touch up
Type advantages (2d array) (NOTE: When the Pokemon only has one type, Maybe set the second type to "" or NULL or something? Or even the same as type 1??)
Proper display flow
disabling and enabling moves for when player Pokemon die/revive.
Database integration
*/ 

//MAKE SURE THAT THE RIGHT VARIABLES END UP BEING CONSTANT
//Sees if this is the first Load or not. At the end make false.


var firstLoad=true;
var totalPlayerMoves=4;
var totalOpponentMoves=4;
var numOpponentItems=1;
//One item for now, that's just 20 potions
var numPlayerItems=2;
//Number of Pokemon on a team.
var numPlayerPokemon=4;
var numOpponentPokemon=4;

//How long to wait before displaying.
var displaySpeed=3000;

//This is how many moves each Pokemon on the team has.
var playerMoveQuantity=new Array(numPlayerPokemon);
var opponentMoveQuantity=new Array(numOpponentPokemon);

//This represents what Pokemon is being currently used at the moment.
var playerCurrentPokemon=0;
var opponentCurrentPokemon=0;
var maxPokemon=151; //This is for catching and whatnot.

//Move object. Every move has these things.
class Move
{
    constructor(name,type,attack,specialAttack,status,buff,nerf,pp,maxPp)
    { 
    this.name="Solar beam";//String.
    this.type="grass";//String.
    this.attack=attack;//Int.
    this.specialAttack=specialAttack;//Int.
    this.status=status;//String.
    this.buff=buff;//Int. For moves like sword dance.
    this.nerf=nerf;//Int. For moves like growl
    this.pp=1;//How many times the Pokemon can do a move.
    this.maxPp=15; //Int. Maximum pp a move can have.
    }//End constructor

}; //End Move defn.

//Trainer object. Every trainer has a pokemon team.
class Trainer
{
    constructor(name,gender,money,pokemonTeam,totalPokemon,expShare,items,isDefeated,img,faintedQuantity)
    {
        this.caughtPokemon=new Pokemon();//Nothing yet.
        this.didCatchPokemon=false; //The player did not catch the 
        this.name=name;
        this.gender=gender;
        this.money=money;
        this.pokemonTeam=pokemonTeam; //Array of Pokemon.
        this.totalPokemon=totalPokemon; //How much Pokemon is caught total.. (Team & PC)
        this.expShare=expShare; //Does the trainer have exp share?
        this.items=items;//Items to recover the Pokemon or other things.
        this.isDefeated=isDefeated;
        this.img=img;//Trainer image
        this.faintedQuantity=0;

    }//End constructor
};//End Trainer defn.

//Whoever I'm facing.
class Opponent
{
    constructor(isWild,name,gender,money,pokemonTeam,items,isDefeated,img,faintedQuantity)
    {
    
    this.isWild=isWild; //Boolean.   If it's not wild, then increase exp. 
    this.name=name;
    this.gender=gender;
    this.money=money;
    this.pokemonTeam=pokemonTeam; //Array of Pokemon.
    this.items=items;
    this.isDefeated=isDefeated;
    this.img=img; //For loading the visuals
    this.faintedQuantity=0;
    }//End constructor
};//End Opponent defn.

//Pokemon class. Every Pokemon has these things.
class Pokemon
{   //Keep in mind that these are the base stats of the Pokemon
    constructor(status, isAlive,name,isCaught,hp,dexNumber,type1,type2,attack,defense,specialAttack,specialDefense,speed,generation,legendary,level,maxHp,currentAttack,nextLevelFormula,currentDefense,currentSpecialAttack,currentSpecialDefense,currentSpeed,expValue,moveQuantity,moveset,img,exp,maxExp)
    {
    //Some of these are old variables from planning. I want to play with the database before making the decision to delete them and everything.
    this.status=status; //String. does the pokemon have paralyzed, burn, sleep, poison,
    this.isAlive=true; //Boolean. Is the Pokemon alive?
    this.name="Gengar";//String.
    this.isCaught=false;
    this.hp=100;//Int. 
    this.dexNumber=0;//Int. 
    this.type1="";//String.
    this.type2="";//String.
    this.attack=0;//Int. 
    this.defense=0;//Int. 
    this.specialAttack=0;//Int. 
    this.specialDefense=0;//Int. 
    this.speed=0;//Int. 
    this.generation=0;//Int. 
    this.legendary=false;
    this.level=1;//Int. 
    this.maxHp=this.hp;//Int. This is the HP cap. and it always starts out with hp 
    this.currentAttack=0;//Int. 
    this.nextLevelFormula=this.level*this.hp;//Do this after leveling up
    this.currentDefense=0;//Int. 
    this.currentSpecialAttack=0;//Int. 
    this.currentSpecialDefense=0;//Int. 
    this.currentSpeed=0;//Int. 
    this.expValue=50;   //Math.floor((this.hp*this.attack*this.speed*this.defense)/this.level);   ////Int. How much exp the Pokemon costs after being beaten.
    this.moveQuantity=4;//How many moves the Pokemon has.
    this.moveset=new Array(); //Array of moves.
    this.img=img;//Pokemon image //Could be an array of sprites, the battle image and icon, etc..
    //Initialize moveset:

    
    //exp/level up logic
    
    //exp=0;//How much exp the Pokemon costs after being beaten.
    //pokemon.toNextLevel-=pokemon.expValue; //if (pokemon.toNextLevel<=0) {pokemon.toNextLevel-= (pokemon.toNextLevel-pokemon.expValue); pokemon.level+=1; pokemon.hp+=Math.random()*10+1 pokemon.toNextLevel=nextLevelFormula;}
    //pokemon.totalExp+=pokemon.exp;
    //
    this.exp=5;
    this.maxExp=10;
    //this.toNextLevel=nextLevelFormula; //Exp to the next level. Let's keep it like FFVIII for now.
    }//End constructor
};//End Pokemon defn.

class Item
{
    constructor(name,quantity,value,img)
    {
        this.name=name;//String.
        this.quantity=quantity//Int.
        this.value=value;//Int.
        //this.purpose=purpose; //String.
        this.img=img;
    }//End constructor
    
}//End Item defn.

//Initializing things for battle.
var team=new Array(numPlayerPokemon);
var items=new Array(numPlayerItems);

var opponentTeam=new Array(numOpponentPokemon);
var opponentItems=new Array(numOpponentItems);

var totalPokemon=new Array(maxPokemon);

//This loop initializes the player's items. (Temporary)
for(i=0;i<numPlayerItems;i++)
{
    //name,quantity,value,img
    items[i]=new Item("ether",1,20,"PUT AN IMAGE OBJECT HERE IF TIME ALLOWS!!");
}//End for

//This loop initializes the opponent's items.
for(i=0;i<numOpponentItems;i++)
{
    opponentItems[i]=new Item("potion",1,40,"healing");
}//End for

//name,gender,money,pokemonTeam,totalPokemon,expShare,items,isDefeated,img,faintedQuantity
var player = new Trainer("Ash","boy",500,team,totalPokemon,true,items,false);
var opponent= new Opponent(false,"Gary","boy",5000,opponentTeam,opponentItems,false);

//This loop initializes the opponent's Pokemon team.
for(i=0;i<numOpponentPokemon;i++)
{
    opponent.pokemonTeam[i]=new Pokemon();
}//End for

//This initializes the total amount of Pokemon the Trainer/User has caught.
for(i=0;i<maxPokemon;i++)
{
    player.totalPokemon[i]=new Pokemon();
}//End for


//This loop initializes the player's Pokemon team.
for(i=0;i<numPlayerPokemon;i++)
{
    player.pokemonTeam[i]=new Pokemon();
}//End for



//Putting what I have in my team into my total Pokemon.
for(i=0;i<numPlayerPokemon;i++)
{
    //I mod the corresponding dex number by the total amount to easily be able to sort through them and not worry about out of bounds.
    //Then I set the corresponding pokemon to that spot in the array.
    console.log("TEAM: "+player.pokemonTeam[i].name);
    player.totalPokemon[player.pokemonTeam[i].dexNumber%maxPokemon]=player.pokemonTeam[i];
    
}//End for


//This loop initializes the player's Pokemon team's moves.
for(i=0; i<numPlayerPokemon; i++)
{   //console.log("quantity is: "+player.pokemonTeam[i].moveQuantity);
    for(j=0; j<player.pokemonTeam[i].moveQuantity; j++)
    {
        player.pokemonTeam[i].moveset[j]=new Move();
    }//End inner for


}//End outer for

//This loop initializes the quantity of moves per Pokemon on the opponent's team.
for(i=0; i<numOpponentPokemon; i++)
{   //console.log("op quantity is: "+opponent.pokemonTeam[i].moveQuantity);
    for(j=0; j<opponent.pokemonTeam[i].moveQuantity; j++)
        {
            opponent.pokemonTeam[i].moveset[j]=new Move();
        }//End inner for
}//End outer for

var playerPokemonFaintMsg=player.pokemonTeam[playerCurrentPokemon].name+"fainted!";
var lowPpMsg="No more PP!! ";
//This will add to the total amount of pokemon the trainer has when a new Pokemon is caught.
/*
----------------------------BEGIN PROGRAM------
*/

//This is called in the case that a Pokemon is caught.
function addPokemon(caughtPokemon)
{
    player.didCatchPokemon=true;//The player DID catch a Pokemon.
    //Add it to the dex array.
    player.totalPokemon[caughtPokemon.dexNumber%maxPokemon]=caughtPokemon;
    //player.totalPokemon.quantity
}

var c=document.getElementById("canvas");
var context=c.getContext("2d");
var step=30;//How many pixels the image moves per redraw. 

//For movement
var x=0;
var y=0;

//For animation
/*
left:   sx[0] 
up:     sx[1]
right:  sx[2]
down:   sx[3]
*/
var sx=new Array(4); //Source x array for the 4 directions
sx[0]=0;
sx[1]=1020; //Have to start here for the up sprite strip
sx[2]=0;
sx[3]=0;
var sy=new Array(4); //Source y for 

var height=300;
var width=230;
var reset=0; //Supposed to clear setInterval().

var img=document.getElementById("sheet");//New image object & connecting the source
context.drawImage(img,0,0,img.width/8.7,img.height/3.5,x,y,width,height);




//Just display text to the user. Make pretty.
function display(dispstring)
{   
    var disp=document.getElementById("display");
    disp.innerHTML=dispstring;
    //console.log("I clicked next");
    //Before and/or after every display(), have the text come out slowly. Wait maybe some milliseconds per letter.
    //Display border with text that outputs.
    return;
}

function nextMsg()
{
   // console.log("bruhhhhhhh");
    return true;

}//End nextMsg
//Thanks to this.id, I can pass on the movename into this function.

function attackPlayer(moveId)
{   
    opponentChoice=Math.floor(Math.random()*numOpponentItems)+1;//Random number in the range [1,4].
    var numPlayerPokemonFainted=0;
    var moveChoice=0;
    //"move"+(num+1);
    //This variable determines if it's in the class opponent or player
    //Is the player executing a move or is the opponent executing a move?
    var moveExecuted=document.getElementById("opmove"+(opponentChoice));
    //console.log("This should work: ",moveExecuted.id);
    display(moveExecuted.id);
    //This Pokemon used its move on the player.
    //Passing in the pokemon
    decreasePlayerHealth();
    
    switch(moveExecuted.id)
    {
        case "opmove1":
            {
                moveChoice=0;
                break;
            }//End case
            
        case "opmove2":
            {
                moveChoice=1;
                break;
            }//End case
            
        case "opmove3":
            {
                moveChoice=2;
                break;
            }//End case
            
                    
        case "opmove4":
            {
                moveChoice=3;
                break;
            }//End case
            
            
        }//End switch
    moveChoice=moveChoice%opponent.pokemonTeam[opponentCurrentPokemon].moveQuantity; //Move choice can only be as big as the quantity.
    //console.log("choice is "+moveChoice);

    //Update move output
    opponent.pokemonTeam[opponentCurrentPokemon].moveset[moveChoice].pp-=1;
    moveExecuted.innerHTML=opponent.pokemonTeam[opponentCurrentPokemon].moveset[moveChoice].name+"<br>"+"PP: "+opponent.pokemonTeam[opponentCurrentPokemon].moveset[moveChoice].pp+"/"+opponent.pokemonTeam[opponentCurrentPokemon].moveset[moveChoice].maxPp;        
    
    attackMsg=opponent.name+"'s "+opponent.pokemonTeam[opponentCurrentPokemon].name+opponentCurrentPokemon+" used "+ opponent.pokemonTeam[opponentCurrentPokemon].moveset[moveChoice].name+"!";
    
    //console.log("PP nOW: "+ opponent.pokemonTeam[opponentCurrentPokemon].moveset[moveChoice].pp);
    //If the pp runs out,disable the move.
    if(opponent.pokemonTeam[opponentCurrentPokemon].moveset[moveChoice].pp<=0)
    {
        
        disableMove(moveChoice,false);
    }//End if
    if(!(opponent.pokemonTeam[opponentCurrentPokemon].moveset[moveChoice].pp<=0)) //If the current PP value isn't less than or equal to 0, make sure this move is enabled.
    {
        
        enableMove(moveChoice,false);
    }//End if
    display(attackMsg);//This will display to the screen
    
    //After decreasing, check to see if the pokemon died.
    for(i=0; i<numPlayerPokemon; i++)
    {  // console.log("I'm in.");
        //If my Pokemon's HP reaches less than or equal to zero, then my Pokemon has fainted.
        if(player.pokemonTeam[i].hp<=0)
        {
            //Make sure it's just 0.
            player.pokemonTeam[i].hp=0;
            numPlayerPokemonFainted+=1;
        }//End if
    }//End for
    
    player.faintedQuantity=numPlayerPokemonFainted;
    console.log(numPlayerPokemonFainted+" of the player's Pokemon is currently fainted");
    //Seeing if the team is knocked out or not.

    load();//Update values after all is said and done.

    if(numPlayerPokemonFainted==player.pokemonTeam.length)
    {  
        player.isDefeated=true;
        end(); //End should be the very end of the battle.
        
    }//End if

    //If my count is 
    //Do what happens when a move is executed.
}//End attackPlayer

function disableMove(num,user)
{

    //This function disables the move when PP is out.
    if(user)
    {   
        //I need to increment 1 so it matches the string perfectly.
        moveId="move"+(num+1);
        //console.log("This move should get disabled bro: ",moveId);
        move=document.getElementById(moveId);
        move.disabled=true;
    }//End if
    else //Otherwise enable the opponent's move
    {
        //I need to increment 1 so it matches the string perfectly.
        moveId="opmove"+(num+1); 
        //console.log("This move should get disabled bro: ",moveId);
        move=document.getElementById(moveId);
        move.disabled=true;

    }//End else
}//End disableMove

//This function enables the move when PP is up or a Pokemon is switched.
function enableMove(num,user)
{
    //If it's on the user side, do this code.
    if(user)
    {   
        //I need to increment 1 so it matches the string perfectly.
        moveId="move"+(num+1);
        //console.log("This move should get enabled bro: ",moveId);
        move=document.getElementById(moveId);
        move.disabled=false;
    }//End if
    else //Otherwise enable the opponent's move
    {
        //I need to increment 1 so it matches the string perfectly.
        moveId="opmove"+(num+1); 
        //console.log("This move should get enabled bro: ",moveId);
        move=document.getElementById(moveId);
        move.disabled=false;

    }//End else
}//End enableMove

function attackOpponent(moveId)
{   var moveChoice=0;
    

    var numOpponentPokemonFainted=0;

    //This variable determines if it's in the class opponent or player
    //Is the player executing a move or is the opponent executing a move?
    var moveExecuted=document.getElementById(moveId);
    display(moveExecuted.id);
    
    //latestmove.className=player.pokemonTeam[playerCurrentPokemon].moveset[playerCurrentPokemon].type;
    //console.log(latestmove);
    //Get the number of the move I picked.
    switch(moveExecuted.id)
        {
        case "move1":
        {
            moveChoice=0;
            break;
        }//End case
        
        case "move2":
            {
                moveChoice=1;
                break;
            }//End case
            
        case "move3":
            {
                moveChoice=2;
                break;
            }//End case


        case "move4":
            {
                moveChoice=3;
                break;
            }//End case
    
    
    }//End switch
    moveChoice=moveChoice%player.pokemonTeam[playerCurrentPokemon].moveQuantity; //Move choice can only be as big as the quantity.
    
    //pp goes down after hit lands
    player.pokemonTeam[playerCurrentPokemon].moveset[moveChoice].pp-=1;
    
    //moveExecuted.innerHTML=opponent.pokemonTeam[opponentCurrentPokemon].moveset[moveChoice].name+"<br>"+"PP: "+opponent.pokemonTeam[opponentCurrentPokemon].moveset[moveChoice].pp+"/"+opponent.pokemonTeam[opponentCurrentPokemon].moveset[moveChoice].maxPp;        
    moveExecuted.innerHTML=player.pokemonTeam[playerCurrentPokemon].moveset[moveChoice].name+"<br>"+"PP: "+player.pokemonTeam[playerCurrentPokemon].moveset[moveChoice].pp+"/"+player.pokemonTeam[playerCurrentPokemon].moveset[moveChoice].maxPp;

    var string=player.name+"'s "+player.pokemonTeam[playerCurrentPokemon].name+" used "+ player.pokemonTeam[playerCurrentPokemon].moveset[moveChoice].name+"!";
    //Passing in the pokemon
    decreaseOpponentHealth(player.pokemonTeam[playerCurrentPokemon]);
    string="Testing test";
    display(string);//This will display to the screen
    
    

    //If the pp runs out,disable the move.
    if(player.pokemonTeam[playerCurrentPokemon].moveset[moveChoice].pp<=0)
    {
        //Disable move.
        disableMove(moveChoice,true);
    }//End if
    if(!(player.pokemonTeam[playerCurrentPokemon].moveset[moveChoice].pp<=0)) //If the current PP value isn't less than or equal to 0, make sure this move is enabled.
    {
        //Enable move.
        enableMove(moveChoice,true);
    }//End if

    //After decreasing, check to see if the pokemon of the opponent's team died.
    for(i=0; i<numOpponentPokemon; i++)
    {   //If the HP of the opponent's Pokemon reaches less than or equal to zero, then their Pokemon has fainted.
        if(opponent.pokemonTeam[i].hp<=0)
        {
            //When they're dead, they're dead.
            opponent.pokemonTeam[i].hp=0;
            numOpponentPokemonFainted+=1;
        }//End if
    }//End for

    opponent.faintedQuantity=numOpponentPokemonFainted;

    console.log(numOpponentPokemonFainted+" of the opponent's Pokemon is currently fainted");
    //Seeing if the team is knocked out or not.

    //ONLY if the Pokemon is still alive, then take the turn.
    if(opponent.pokemonTeam[opponentCurrentPokemon].isAlive==true)
    {
        opponentTurn();
    }//End if
    
    load();
    if(numOpponentPokemonFainted==player.pokemonTeam.length)
    {   
        opponent.isDefeated=true;
        end();
    }
    //If my count is 
    //Do what happens when a move is executed.
    
    
    
}//End attackOpponent

//this function takes in a Pokemon object and the index of the Pokemon
function disablePokemon(index,user)
{

    //Get move stuff
    move[0]=document.getElementById("move1");
    move[1]=document.getElementById("move2");
    move[2]=document.getElementById("move3");
    move[3]=document.getElementById("move4");

    move[0].disabled=true;
    move[1].disabled=true;
    move[2].disabled=true;
    move[3].disabled=true;
    //Disable the moves of the pokemon.
    if(user==true)
    {
        
        player.pokemonTeam[index].moveset.length;
        for(i=0;i<totalPlayerMoves; i++)
        {   
            disableMove(i,true);
        }//End for
    
    }//End (user==true)
    else
    {
        
    }//End else
    
}//End disablePokemon

function enablePokemon(index,user)
{

    for(i=0;i<totalOpponentMoves; i++)
    {   
        disableMove(i,false);
    }//End for
}//End enablePokemon

//Called from HTML button click.
function usePlayerItem(itemId)
{
    var playerChoice=0;   //Random number from 0 to amount of items he has.
    //Get this from a dropdown list.
    itemChoice=itemId.options.selectedIndex;
    //For proper array indexing.
    itemChoice-=1;
    playerChoice=itemChoice;
    console.log("WhAT IS MY ITeM CHOICE!?? IT IS: ", itemChoice);

    for(i=0;i<(player.items.length);i++)
    {
        
    if(player.items[playerChoice].quantity<=0)
        {
            //If you ran out of the item, delete it.
            player.items[playerChoice].quantity=0;
            display(player.name+" tried to use a "+player.items[playerChoice].name+" but ran out of it!!");
            load();
            player.items[playerChoice];
            return;
        }//End if
    }//End for

    /*
    --------------------------MAKE SURE THAT THE USER ITEMS ARE PROPERLY SETTLED!!!--------------------------
    
    */
   //console.log(player.items[0]);
   //player.items[playerChoice].name="potion";
   //player.items[playerChoice].value=40;

   switch(player.items[itemChoice].name)
    {   case "potion":
        {   
            load();
            if(player.pokemonTeam[playerCurrentPokemon].isAlive==true||player.pokemonTeam[playerCurrentPokemon].hp>0)
            {
                recovery=player.items[playerChoice].value;
                //console.log("Recovered by " +recovery);
                var health=document.getElementById("playerhpbar");
                //I decrease the health bar and the actual hp of the Pokemon that is out right now.
                health.value+=recovery;
                player.pokemonTeam[playerCurrentPokemon].hp+=recovery;

                //If I end up recovering more than what's needed, just set it to HP max so there's no overflow.
                if(player.pokemonTeam[playerCurrentPokemon].hp>=player.pokemonTeam[playerCurrentPokemon].maxHp)
                {
                    player.pokemonTeam[playerCurrentPokemon].hp=player.pokemonTeam[playerCurrentPokemon].maxHp;
                }//End if
                load();
                display(player.pokemonTeam[playerCurrentPokemon].name+"'s Health went up by " + recovery+"!!");
                display(player.name +" used "+player.items[playerChoice].name+" on "+player.pokemonTeam[playerCurrentPokemon].name+"!!");
                
            }//End if
            else
            {
                //If it fails, show error then return.
                console.log();
                potionErr="You can't heal a fainted Pokemon! Try reviving!";
                display(potionErr);
                return;
            }//End else 
            
            load();
            break;

        }//End case "potion"
            case "revive":
            {
                //Make sure the Pokemon is fainted before reviving..
                if(player.pokemonTeam[playerCurrentPokemon].isAlive==false||player.pokemonTeam[playerCurrentPokemon].hp<=0)
                {
                    
                    //console.log("Recovered by " +recovery);
                    var health=document.getElementById("playerhpbar");
                    //I decrease the health bar and the actual hp of the Pokemon that is out right now.
                    health.value+=(player.pokemonTeam[playerCurrentPokemon].maxHp/2);
                    player.pokemonTeam[playerCurrentPokemon].hp+=player.pokemonTeam[playerCurrentPokemon].maxHp/2;
        
                    //If I end up recovering more than what's needed, just set it to HP max so there's no overflow.
                    if(player.pokemonTeam[playerCurrentPokemon].hp>=player.pokemonTeam[playerCurrentPokemon].maxHp)
                    {
                        player.pokemonTeam[playerCurrentPokemon].hp=player.pokemonTeam[playerCurrentPokemon].maxHp;
                    }//End if
                    
                    player.pokemonTeam[playerCurrentPokemon].isAlive=true;
                    load();
                }//End if
                else
                {
                    //If it fails, show error then return.
                    reviveErr="You can't revive an unfainted Pokemon!";
                    display(reviveErr);
                    return;
                }//End else 

                
                //Load checks if a pokemon is alive or dead.
                load();
                break;
            }//End case "revive"

        case "ether":
            {
                for(i=0;i<totalPlayerMoves;i++)
                {
                   
                    recovery=player.items[playerChoice].value;
                    player.pokemonTeam[playerCurrentPokemon].moveset[i].pp+=recovery;
                    //If I end up recovering more than what's needed, just set it to pp max so there's no overflow.
                    if(player.pokemonTeam[playerCurrentPokemon].moveset[i].pp>=player.pokemonTeam[playerCurrentPokemon].moveset[i].maxPp)
                    {
                    
                        player.pokemonTeam[playerCurrentPokemon].moveset[i].pp=player.pokemonTeam[playerCurrentPokemon].moveset[i].maxPp;
                    }//End if
                    
                }//End for

                //Load will update all changed values.
                load();
                break;
            }//End case "ether"

            case "maxether":
                {
                    
                for(i=0;i<totalPlayerMoves;i++)
                {
                    
                    player.pokemonTeam[playerCurrentPokemon].moveset[i].pp+=player.pokemonTeam[playerCurrentPokemon].moveset[i].maxPp;
                    //If I end up recovering more than what's needed, just set it to pp max so there's no overflow.
                    if(player.pokemonTeam[playerCurrentPokemon].moveset[i].pp>=player.pokemonTeam[playerCurrentPokemon].moveset[i].maxPp)
                    {
                        console.log("I SHOULD BE SEEING THIS.................................................................................");
                        player.pokemonTeam[playerCurrentPokemon].moveset[i].pp=player.pokemonTeam[playerCurrentPokemon].moveset[i].maxPp;
                    }//End if
                    
                    
                }//End for
                    
                    //Load will update all changed values.
                    load();
                    break;
                }//End case "maxether"
            
        case "maxrevive":
         {
                //Make sure the Pokemon is fainted before reviving..
                if(player.pokemonTeam[playerCurrentPokemon].isAlive==false||player.pokemonTeam[playerCurrentPokemon].hp<=0)
                {
                    
                    //console.log("Recovered by " +recovery);
                    var health=document.getElementById("playerhpbar");
                    //Just max out the hp.
                    health.value+=(player.pokemonTeam[playerCurrentPokemon].maxHp);
                    player.pokemonTeam[playerCurrentPokemon].hp+=player.pokemonTeam[playerCurrentPokemon].maxHp;
        
                    //If I end up recovering more than what's needed, just set it to HP max so there's no overflow.
                    if(player.pokemonTeam[playerCurrentPokemon].hp>=player.pokemonTeam[playerCurrentPokemon].maxHp)
                    {
                        player.pokemonTeam[playerCurrentPokemon].hp=player.pokemonTeam[playerCurrentPokemon].maxHp;
                    }//End if
                    
                    //The pokemon is alive!!
                    player.pokemonTeam[playerCurrentPokemon].isAlive=true;
                    
                    load();
                }//End if
                else
                {
                    //If it fails, show error then return.
                    reviveErr="You can't revive an unfainted Pokemon!";
                    display(reviveErr);
                    return;
                }//End else 
                    //Load will update all changed values.
                    load();
                    break;
            }//End case "maxrevive"
                
            case "pokeball":
                {
                    //Do the logic in here that catches pokemon
                    catchPokemon();
                    load();
                    break;
                }//End case "pokeball"
                
    } //End switch
    
    //Decreasing the quantity of the item
    player.items[playerChoice].quantity-=1;

    //ONLY if the Pokemon is still alive, then take the turn.
    if(opponent.pokemonTeam[opponentCurrentPokemon].isAlive==true)
    {
        opponentTurn();
    }//End if
    load();
    
    console.log(player.name+ " used "+player.items[playerChoice].name+" on "+player.pokemonTeam[playerCurrentPokemon].name);//This will display to the screen

    //Do what happens when a move is executed.
}//End usePlayerItem

function useOpponentItem()
{
    opponentChoice=Math.floor(Math.random()*opponent.items.length);   //Random number from 0 to amount of items he has.
    console.log(opponent.name+ " used "+opponent.items[opponentChoice].name+" on "+opponent.pokemonTeam[opponentCurrentPokemon].name);//This will display to the screen
    //itemChoice=rand();
    
    //opponentChoice=itemChoice;
    //This for loop cleans up the array if the item has run out. (You can't buy more items in a battle!!)
    console.log("OPPonenNT iTEMS lENGTh"+opponent.items.length);
    console.log("OPPonenNT iTEMS nAME::: "+opponent.items[opponentChoice].name);
    console.log("tHE CHOICE IS::: "+opponentChoice);
    for(i=0;i<opponent.items.length;i++)
    {
    if(opponent.items[opponentChoice].quantity<=0)
        {
            //If you ran out of the item, delete it.
            display(opponent.name+" tried to use a "+opponent.items[opponentChoice].name+" but ran out of it!!");
            opponent.items[opponentChoice].quantity=0;
            load();
            opponent.items[opponentChoice];
            return;
        }//End if
    }//End for
    switch(opponent.items[opponentChoice].name)
    {   
        case "potion":
        {   //Make sure my pokemon is alive before using a potion!
            if(opponent.pokemonTeam[opponentCurrentPokemon].isAlive==true||opponent.pokemonTeam[opponentCurrentPokemon].hp>0)
            {
                recovery=opponent.items[opponentChoice].value;
                //console.log("Recovered by " +recovery);
                var health=document.getElementById("opponenthpbar");
                //I decrease the health bar and the actual hp of the Pokemon that is out right now.
                health.value+=recovery;
                opponent.pokemonTeam[opponentCurrentPokemon].hp+=recovery;

                //If I end up recovering more than what's needed, just set it to HP max so there's no overflow.
                if(opponent.pokemonTeam[opponentCurrentPokemon].hp>=opponent.pokemonTeam[opponentCurrentPokemon].maxHp)
                {
                    opponent.pokemonTeam[opponentCurrentPokemon].hp=opponent.pokemonTeam[opponentCurrentPokemon].maxHp;
                }//End if

                load();
                //display(opponent.pokemonTeam[opponentCurrentPokemon].name+"'s Health went up by " + recovery+"!!");
                //display(opponent.name +" used "+opponent.items[opponentChoice].name+" on "+opponent.pokemonTeam[opponentCurrentPokemon].name+"!!");
                
            }//End if
            else
            {
                //If it fails, show error then return.
                potionErr="You can't heal a fainted Pokemon! Try reviving!";
                display(potionErr);
                return;
            }//End else 

            load();
            break;
        }//End case "potion"
        case "revive":
            {
                //Make sure the Pokemon is fainted before reviving..
                if(opponent.pokemonTeam[opponentCurrentPokemon].isAlive==false||opponent.pokemonTeam[opponentCurrentPokemon].hp<=0)
                {
                    recovery=opponent.items[opponentChoice].value;
                    //console.log("Recovered by " +recovery);
                    var health=document.getElementById("opponenthpbar");
                    //I decrease the health bar and the actual hp of the Pokemon that is out right now.
                    health.value+=(opponent.pokemonTeam[opponentCurrentPokemon].maxHp/2);
                    opponent.pokemonTeam[opponentCurrentPokemon].hp+=opponent.pokemonTeam[opponentCurrentPokemon].maxHp/2;
        
                    //If I end up recovering more than what's needed, just set it to HP max so there's no overflow.
                    if(opponent.pokemonTeam[opponentCurrentPokemon].hp>=opponent.pokemonTeam[opponentCurrentPokemon].maxHp)
                    {
                        opponent.pokemonTeam[opponentCurrentPokemon].hp=opponent.pokemonTeam[opponentCurrentPokemon].maxHp;
                    }//End if
        
                    load();
                }//End if
                else
                {
                    //If it fails, show error then return.
                    reviveErr="You can't revive an unfainted Pokemon!";
                    display(reviveErr);
                    return;
                }//End else 

                
                //Load checks if a pokemon is alive or dead.
                load();
                break;
            }//End case "revive"            
        case "ether":
            {
                recovery=opponent.items[opponentChoice].value;
                opponent.pokemonTeam[opponentCurrentPokemon].pp+=recovery;
    
                //If I end up recovering more than what's needed, just set it to HP max so there's no overflow.
                if(opponent.pokemonTeam[opponentCurrentPokemon].pp>=opponent.pokemonTeam[opponentCurrentPokemon].maxPp)
                {
                    opponent.pokemonTeam[opponentCurrentPokemon].pp=opponent.pokemonTeam[opponentCurrentPokemon].maxPp;
                }//End if
                
                //Load will update all changed values.
                load();
                break;
            }//End case "ether"

            case "maxether":
                {
                    opponent.pokemonTeam[opponentCurrentPokemon].pp+=opponent.pokemonTeam[opponentCurrentPokemon].maxPp;
        
                    //If I end up recovering more than what's needed, just set it to HP max so there's no overflow.
                    if(opponent.pokemonTeam[opponentCurrentPokemon].pp>=opponent.pokemonTeam[opponentCurrentPokemon].maxPp)
                    {
                        opponent.pokemonTeam[opponentCurrentPokemon].pp=opponent.pokemonTeam[opponentCurrentPokemon].maxPp;
                    }//End if
                    
                    //Load will update all changed values.
                    load();
                    break;
                }//End case "maxether"
            
        case "maxrevive":
            {
                //Make sure the Pokemon is fainted before reviving..
                if(opponent.pokemonTeam[opponentCurrentPokemon].isAlive==false||opponent.pokemonTeam[opponentCurrentPokemon].hp<=0)
                {   
                    //console.log("Recovered by " +recovery);
                    var health=document.getElementById("opponenthpbar");
                    //Just max out the hp.
                    health.value+=(opponent.pokemonTeam[opponentCurrentPokemon].maxHp);
                    opponent.pokemonTeam[opponentCurrentPokemon].hp+=opponent.pokemonTeam[opponentCurrentPokemon].maxHp;
        
                    //If I end up recovering more than what's needed, just set it to HP max so there's no overflow.
                    if(opponent.pokemonTeam[opponentCurrentPokemon].hp>=opponent.pokemonTeam[opponentCurrentPokemon].maxHp)
                    {
                        opponent.pokemonTeam[opponentCurrentPokemon].hp=opponent.pokemonTeam[opponentCurrentPokemon].maxHp;
                    }//End if
        
                    load();
                }//End if
                else
                {
                    //If it fails, show error then return.
                    reviveErr="You can't revive an unfainted Pokemon!";
                    display(reviveErr);
                    return;
                }//End else 

                    
                    //Load will update all changed values.
                    load();
                    break;
                }//End case "maxrevive"
    


    } //End switch
    
    //Decreasing the quantity of the item
    opponent.items[opponentChoice].quantity-=1;
    
    
    
    
    
    
    
    
    


}//End useOpponentItem


function catchPokemon()
{
    var catchChance=Math.floor(Math.random()*opponent.pokemonTeam[opponentCurrentPokemon].level)+1;
    //For increasing the probability
    var catchChanceBoost=Math.floor(Math.random()*opponent.pokemonTeam[opponentCurrentPokemon].level)+1;
    //If the Pokemon's hp is less than half or if there is a status ailment that ISN'T normal, then increase it.
    if(opponent.pokemonTeam[opponentCurrentPokemon].hp<=(opponent.pokemonTeam[opponentCurrentPokemon].maxHp/2)||opponent.pokemonTeam[opponentCurrentPokemon].hp!="normal")
    {
        //Add it on.
        catchChance+=catchChanceBoost;
    }//End if
    //If the random number is greater than or equal to the level of the opposing pokemon, then  
    if(catchChance>=opponent.pokemonTeam[opponentCurrentPokemon].level)
    {
        //Yes, you can steal the opponent's Pokemon. Whether it's a trainer or wild.
        player.didCatchPokemon=true;
        //If the Pokemon isn't wild, then count the opponent's current pokemon as dead..
        if(opponent.pokemonTeam[opponentCurrentPokemon].isWild==false)
        {
            //Just announce it to be dead and be done with it.
            opponent.pokemonTeam[opponentCurrentPokemon].isAlive=false;
        }//End if
        addPokemon(opponent.pokemonTeam[opponentCurrentPokemon]);

    }//End if

}//End catchPokemon

//Takes in a pokemon object and an attack
function decreaseOpponentHealth()
{   attack=10;
    var attackTotal=0;
    attackTotal+=player.pokemonTeam[playerCurrentPokemon].attack+51;
    var numOpponentPokemonFainted=0;
    var effective = isEffective(player.pokemonTeam[playerCurrentPokemon].type1, opponent.pokemonTeam[opponentCurrentPokemon].type1) * isEffective(opponent.pokemonTeam[opponentCurrentPokemon].type2, player.pokemonTeam[playerCurrentPokemon].type2);

    var health=document.getElementById("opponenthpbar");
    //console.log("Opponent current Pokemon:" +opponentCurrentPokemon);
    health.value=opponent.pokemonTeam[opponentCurrentPokemon].hp;

    var effectienessMessage = "It was a normal effectiness move.";
    switch(effective){
        case 0:
        {
            effectienessMessage = "It had no effect.";
            break;
        }
        case 0.5:
        {
            effectienessMessage = "It wasn't very effective...";
            break;
        }
        case 2:
        {
            effectienessMessage = "It was super effective!!";
            break;
        }       
    }
    display(effectienessMessage);
    console.log(effectienessMessage);
    
    //This for loop is responsible for bringing the HP down by the attackTotal.
    for(i=0;i<attackTotal*effective;i++)
    {
        health.value-=1;
        opponent.pokemonTeam[opponentCurrentPokemon].hp-=1;

    }//End for

    //Confirm a faint in the opponent's team. It always checks to see if each team member has fainted.
    if(opponent.pokemonTeam[opponentCurrentPokemon].hp<=0)
    {  
        //Make sure it's just zero.
        
        console.log(opponent.name+"'s "+opponent.pokemonTeam[opponentCurrentPokemon].name+" is dead. " +"ID:"+opponentCurrentPokemon);
        opponent.pokemonTeam[opponentCurrentPokemon].isAlive=false;
        faintMsg=opponent.name+"'s "+opponent.pokemonTeam[opponentCurrentPokemon].name+"fainted!";
        //PUT THE WIN/LOSS CODE HERE AND DETERMINE VICTORY HERE!!
        
        //This for loop iterates through the opponent's team to see if they're all dead.
        for(i=0; i<numOpponentPokemon; i++)
        {   //If the HP of the opponent's Pokemon reaches less than or equal to zero, then their Pokemon has fainted.
            if(opponent.pokemonTeam[i].hp<=0)
            {
                //When they're dead, they're dead.
                numOpponentPokemonFainted+=1;
                opponent.pokemonTeam[i].isAlive=false;

            }//End if
        }//End for
        opponent.faintedQuantity=numOpponentPokemonFainted;

        if(numOpponentPokemonFainted==numOpponentPokemon)
        {
            opponent.isDefeated=true;
            switchOpponentPokemon(); //The opponent switches when dead.
            //End battle here. No need for any further calculations.
            
        }//End if
        else if(opponent.pokemonTeam[opponentCurrentPokemon].isAlive==false)
        {
            switchOpponentPokemon(); //The opponent switches when a Pokemon is dead.
        }
        display(faintMsg);

    }//End outer if
    display(opponent.pokemonTeam[opponentCurrentPokemon].name +"'s Health went down by "+attackTotal+"!!");
}//End decreaseOpponentHealth

//The opponent attacks the player.
function decreasePlayerHealth()
{   
    var numPlayerPokemonFainted=0;//Keeps track of the player Pokemon fainted
    var attackTotal=0;
    var effective = isEffective(opponent.pokemonTeam[opponentCurrentPokemon].type1, player.pokemonTeam[playerCurrentPokemon].type1) * isEffective(opponent.pokemonTeam[opponentCurrentPokemon].type2, player.pokemonTeam[playerCurrentPokemon].type2);

    attackTotal+=player.pokemonTeam[playerCurrentPokemon].attack+104;
    var health=document.getElementById("playerhpbar");
    health.value=player.pokemonTeam[playerCurrentPokemon].hp;

    var effectienessMessage = "It was a normal effectiness move.";
    switch(effective){
        case 0:
        {
            effectienessMessage = "It had no effect.";
            break;
        }
        case 0.5:
        {
            effectienessMessage = "It wasn't very effective...";
            break;
        }
        case 2:
        {
            effectienessMessage = "It was super effective!!";
            break;
        }       
    }
    display(effectienessMessage);
    console.log(effectienessMessage);

    for(i=0;i<attackTotal*effective;i++)
    {
        player.pokemonTeam[playerCurrentPokemon].hp-=1;
        health.value-=1;
    }//End for

//Confirm a faint in the player's team. It always checks to see if each team member has fainted.
    if(player.pokemonTeam[playerCurrentPokemon].hp<=0)
    {  
        
        console.log(player.name+"'s "+player.pokemonTeam[playerCurrentPokemon].name+" is dead. " +"ID:"+playerCurrentPokemon);
        player.pokemonTeam[playerCurrentPokemon].isAlive=false;

        //Immediately update this info to disable the pokemon.
        load();
        faintMsg=player.name+"'s "+player.pokemonTeam[playerCurrentPokemon].name+"fainted!";
        //PUT THE WIN/LOSS CODE HERE AND DETERMINE VICTORY HERE!!
        
        //This for loop iterates through the opponent's team to see if they're all dead.
        for(i=0; i<numPlayerPokemon; i++)
        {   //If the HP of the opponent's Pokemon reaches less than or equal to zero, then their Pokemon has fainted.
            if(player.pokemonTeam[i].hp<=0)
            {
                //When they're dead, they're dead.
                numPlayerPokemonFainted+=1;
                player.pokemonTeam[i].isAlive=false;

            }//End if
        }//End for
        player.faintedQuantity=numPlayerPokemonFainted;
        if(numPlayerPokemonFainted==numPlayerPokemon)
        {
            player.isDefeated=true;
            //End battle here. No need for any further calculations.
            
        }//End if
        //console.log("HP: "+ player.pokemonTeam[playerCurrentPokemon].hp);
        display(player.pokemonTeam[playerCurrentPokemon].name +"'s Health went down by "+attackTotal+"!!");
    }//End if
}//End decreasePlayerHealth

//Called from HTML button click.
function switchPlayerPokemon(switchId)
{
    //console.log("YESSS "+switchId.options.selectedIndex);
    //I'll

    // var choice=document.getElementById("2");
    // console.log("My choice is:" +choice.id);
    // //The array represents the options.
    // console.log("My choice is:" +switchId[5].value);
    //Switches the Pokemon
    //Since I offset the options with the default switch option, I need to decrement by 1 to keep the array in check.
    playerCurrentPokemon=switchId.options.selectedIndex;
    playerCurrentPokemon-=1;
    
    //The idea behind this is that the user picks a pokemon with a button and it will return a number between 0 and numPokemon
    //playerCurrentPokemon+=1;
    //playerCurrentPokemon=(playerCurrentPokemon%numPlayerPokemon); 
    
    //May need to reload
    //ONLY if the Pokemon is still alive, then take the turn.
    if(opponent.pokemonTeam[opponentCurrentPokemon].isAlive==true)
    {
        opponentTurn();
    }//End if
    load();
    
    
    //Switch Pokemon
}//End switchPlayerPokemon


function switchOpponentPokemon()
{   
    //Save this in case the trainer tries switching
    if(opponent.isDefeated==true)//Just return if defeated.
    {
        console.log("WHY ISNT thIS REtRUNINT");
        return;
    }//End if
    var previousOpponentCurrentPokemon=opponentCurrentPokemon;
    
    //The idea behind this is that the user picks a pokemon with a button and it will return a number between 0 and numPokemon
    opponentCurrentPokemon+=1;
    opponentChoice=Math.floor(Math.random()*numOpponentPokemon);//Random number in the range [1,3].
    opponentCurrentPokemon=(opponentCurrentPokemon%numOpponentPokemon); 
    
    /*
    If the pokemon the opponent is about to pick isn't alive, go to the next. Keep going until there IS one that is alive.
    //I do i + numOpponentPokemon because I want it to start at whatever number and look through the whole buffer. know I can achieve that by having the length of the loop extended.
    //So if I start at 4, and numOpponentPokemon is 6, I'll get 4+6.
    4%6=4.
    5%6=5.
    6%6=0.
    7%6=1.
    8%6=2. 
    9%6=3.
    */
//This loop switches the pokemon

    try
    {
        //This loop never happens unless if 
        for(i=opponentCurrentPokemon;i<(i+numOpponentPokemon);i++)
        {
            if(opponent.pokemonTeam[opponentCurrentPokemon].isAlive==false)
            {
                console.log("inner i:" +i);
                //Increase by one
                //opponentCurrentPokemon+=1;
                opponentCurrentPokemon=(i%numOpponentPokemon); //Circular searching

            }
            else
            {
                opponentCurrentPokemon=i; //This code causes an error when there's only one Pokemon left.
                console.log(opponent.name+" switched to "+opponent.pokemonTeam[opponentCurrentPokemon].name+"!!");
                break;
            }
            console.log("My i val is: "+i +" and numOpponentPokemon is "+ numOpponentPokemon);
        }//End for
    }//End try
catch(err)
{
    opponentCurrentPokemon=previousOpponentCurrentPokemon;
    error=opponent.name+" tried switching, but "+opponent.pokemonTeam[opponentCurrentPokemon].name+" is the last Pokemon!!";
    display(error);
    console.log(err);
    
}//End catch
    //console.log("wait a minute... "+opponentCurrentPokemon);
    

    //May need to reload
    load();
    //Switch Pokemon
}//End switchOpponentPokemon

//Make a wait function and inside of it, disable the buttons first
function opponentTurn()
{
    //If my opponent lost, just return.
    if(opponent.isDefeated==true)
    {
        console.log(opponent.isDefeated);
        return;
    }//End if
    move1=document.getElementById("move1");
    move2=document.getElementById("move2");
    move3=document.getElementById("move3");
    move4=document.getElementById("move4");

    //Disable moves while the opponent moves.
    for(i=0;i<totalPlayerMoves;i++)
    {

        disableMove(i,true);
    }//End for
    
    //Make the opponent make their random choices here. If I knew AI in JS I'd implement minimax or something.
    //For now, let's use randomization and a switch statement.

    opponentChoice=Math.floor(Math.random()*3)+1;//Random number in the range [1,3].
    display("Opponent choice: "+opponentChoice);
    switch(opponentChoice)
    {   //Attack player
        case 1:
            {
                display(opponent.name+"Goes for an attack!");
                attackPlayer();
                break;
            }//End case 1
            
            //Use item
            case 2:
            {
                //display(opponent.name+"Tries to use an item!");
                //useOpponentItem();
                break;
            }//End case 1
            
            case 3:
            {
                //display(opponent.name+" Switches Pokemon!");
                //switchOpponentPokemon();
                break;
            }//End case 1
                
        
    }//End switch

    //Reenable buttons before I can take a turn.
    for(i=0;i<totalPlayerMoves;i++)
    {
        enableMove(i,true);
    
    }//End for

    load();

}//End wait

// Convert a type from a string to an int
function convertTypeToNum(typeName){
    var lowerTypeName = typeName.toLowerCase();
    var typeNum = -1;
    switch(lowerTypeName){
        case "normal":
        {
            typeNum = 0;
            break;
        }
        case "fire":
        {
            typeNum = 1;
            break;
        }
        case "water":
        {
            typeNum = 2;
            break
        }
        case "electric":
        {
            typeNum = 3;
            break;
        }
        case "grass":
        {
            typeNum = 4;
            break;
        }
        case "ice":
        {
            typeNum = 5;
            break;
        }
        case "fighting":
        {
            typeNum = 6;
            break
        }
        case "poison":
        {
            typeNum = 7;
            break;
        }
        case "ground":
        {
            typeNum = 8;
            break;
        }
        case "flying":
        {
            typeNum = 9;
            break;
        }
        case "psychic":
        {
            typeNum = 10;
            break
        }
        case "bug":
        {
            typeNum = 11;
            break;
        }
        case "rock":
        {
            typeNum = 12;
            break;
        }
        case "ghost":
        {
            typeNum = 13;
            break;
        }
        case "dragon":
        {
            typeNum = 14;
            break
        }
    }
    return typeNum;
}

//This method takes in the attacking move type and the target pokemon's type and determines how effective the move is against the pokemon
function isEffective(moveType,pokemonType){
    
    var typeChart = [
    /*The  column order matches the row order but in transpose. 1 is normal effectiveness (the default), 2 is super-effective, 0.5 is not very effective, and 0 
        means completely ineffective. Attack is the row value (first array index) and defense is they column value (second array index). So if a fire-type 
        attacks an ice type, the array value would be [1][5].
    /*Normal*/      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0.5, 0, 1],
    /*Fire*/        [1, 0.5, 0.5, 1, 2, 2, 1, 1, 1, 1, 1, 2, 0.5, 1, 0.5],
    /*Water*/       [1, 2, 0.5, 1, 0.5, 1, 1, 1, 2, 1, 1, 1, 2, 1, 0.5],
    /*Electric*/    [1, 1, 2, 0.5, 0.5, 1, 1, 1, 0, 2, 1, 1, 1, 1, 0.5],
    /*Grass*/       [1, 0.5, 2, 1, 0.5, 1, 1, 0.5, 2, 0.5, 1, 0.5, 2, 1, 1/2],
    /*Ice*/         [1, 1, 0.5, 1, 2, 0.5, 1, 1, 2, 2, 1, 1, 0.5, 1, 2],
    /*Fighting*/    [2, 1, 1, 1, 1, 2, 1, 0.5, 1, 0.5, 0.5, 0.5, 2, 0, 1],
    /*Poison*/      [1, 1, 1, 1, 2, 1, 1, 0.5, 0.5, 1, 1, 2, 0.5, 0.5, 1],
    /*Ground*/      [1, 2, 1, 2, 0.5, 1, 1, 2, 1, 0, 1, 0.5, 2, 1, 1],
    /*Flying*/      [1, 1, 1, 0.5, 2, 1, 2, 1, 1, 1, 1, 2, 0.5, 1, 1],
    /*Psychic*/     [1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 0.5, 1, 1, 1, 1],
    /*Bug*/         [1, 0.5, 1, 1, 2, 1, 0.5, 2, 1, 0.5, 2, 1, 1, 1, 1],
    /*Rock*/        [1, 2, 1, 1, 1, 2, 0.5, 1, 0.5, 2, 1, 2, 1, 1, 1],
    /*Ghost*/       [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 2, 1],
    /*Dragon*/      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
    ];
    if (moveType == "" || pokemonType == ""){
        return 1;
    }
    // Turn the moveType into a number based on it's type
    var moveTypeNum = convertTypeToNum(moveType);
    // Turn the target pokemon's type into a number
    var pokeTypeNum = convertTypeToNum(pokemonType);
    if (moveTypeNum < 0 || pokeTypeNum < 0){
        return 1;
    }
    // Combare attack (move) against defense (target pokemon) using the above chart and return result
    return typeChart[moveTypeNum][pokeTypeNum];

}//End checkIfEffective

//This is where I update all the latest Pokemon data.
function load()
{
    var move=new Array();
    var opMove=new Array();
    //The default ids are called these so it will always initialize properly.
    var numPlayerPokemonFainted=0;
    //var numOpponentPokemonFainted=0;
    move[0]=document.getElementById("move1");
    move[1]=document.getElementById("move2");
    move[2]=document.getElementById("move3");
    move[3]=document.getElementById("move4");
    //console.log("CLASS "+move[0].className);
    opMove[0]=document.getElementById("opmove1");
    opMove[1]=document.getElementById("opmove2");
    opMove[2]=document.getElementById("opmove3");
    opMove[3]=document.getElementById("opmove4");
    playerPokemonName=document.getElementById("playerpokemonname");
    opponentPokemonName=document.getElementById("opponentpokemonname");
    var opHealth=document.getElementById("opponenthpbar");
    var health=document.getElementById("playerhpbar");
    var playerHp=document.getElementById("playerhp");
    var playerExp=document.getElementById("playerexp");
    var opponentHp=document.getElementById("opponenthp");
    
    opponentHp.innerHTML="HP: "+opponent.pokemonTeam[opponentCurrentPokemon].hp+"/"+opponent.pokemonTeam[opponentCurrentPokemon].maxHp+"<progress id=\"opponenthpbar\" value="+"\""+opponent.pokemonTeam[opponentCurrentPokemon].hp+"\""+ "max ="+opponent.pokemonTeam[opponentCurrentPokemon].maxHp+"></progress>";

    
    playerHp.innerHTML="HP: "+player.pokemonTeam[playerCurrentPokemon].hp+"/"+player.pokemonTeam[playerCurrentPokemon].maxHp+"<progress id=\"playerhpbar\" value="+"\""+player.pokemonTeam[playerCurrentPokemon].hp+"\""+ "max ="+player.pokemonTeam[playerCurrentPokemon].maxHp+"></progress>";
    //console.log(playerHp);

    //Updating the exp value.
    playerExp.innerHTML="EXP: "+player.pokemonTeam[playerCurrentPokemon].exp+"/"+player.pokemonTeam[playerCurrentPokemon].maxExp+"<progress id=\"playerexpbar\" value="+"\""+player.pokemonTeam[playerCurrentPokemon].exp+"\""+ "max ="+player.pokemonTeam[playerCurrentPokemon].maxExp+"></progress>";
    //console.log(playerExp);
    //This updates the values on screen as I want it.
    opHealth.value=opponent.pokemonTeam[opponentCurrentPokemon].hp;
    health.value=player.pokemonTeam[playerCurrentPokemon].hp;
    //console.log("currentpokemon: "+playerCurrentPokemon);
    //console.log("playername: "+player.name);
    //console.log("currentpokemonname: "+player.pokemonTeam[playerCurrentPokemon].name);
    //console.log("currentpokemonmovename: "+player.pokemonTeam[playerCurrentPokemon].moveset[0].name);
    
    

    //This loop will be updating the values of the HP output of the Pokemon. (Player)
    for(i=0;i<player.pokemonTeam[playerCurrentPokemon].moveset.length; i++)
    {
        move[i].innerHTML=player.pokemonTeam[playerCurrentPokemon].moveset[i].name+"<br>"+"PP: "+player.pokemonTeam[playerCurrentPokemon].moveset[i].pp+"/"+player.pokemonTeam[playerCurrentPokemon].moveset[i].maxPp;
    }//End for

    //This loop will be updating the values of the HP output of the Pokemon. (Opponent)
    for(i=0;i<player.pokemonTeam[playerCurrentPokemon].moveset.length; i++)
    {
        move[i].innerHTML=player.pokemonTeam[playerCurrentPokemon].moveset[i].name+"<br>"+"PP: "+player.pokemonTeam[playerCurrentPokemon].moveset[i].pp+"/"+player.pokemonTeam[playerCurrentPokemon].moveset[i].maxPp;
    }//End for


    //This loop updates the look and feel of the buttons for the player.
    for(i=0;i<player.pokemonTeam[playerCurrentPokemon].moveset.length; i++)
    {
        move[i].innerHTML=player.pokemonTeam[playerCurrentPokemon].moveset[i].name+"<br>"+"PP: "+player.pokemonTeam[playerCurrentPokemon].moveset[i].pp+"/"+player.pokemonTeam[playerCurrentPokemon].moveset[i].maxPp;
    }//End for

    //This loop updates the look and feel of the buttons for the opponent.
    for(i=0;i<opponent.pokemonTeam[opponentCurrentPokemon].moveset.length; i++)
    {
        opMove[i].innerHTML=opponent.pokemonTeam[opponentCurrentPokemon].moveset[i].name+"<br>"+"PP: "+opponent.pokemonTeam[opponentCurrentPokemon].moveset[i].pp+"/"+opponent.pokemonTeam[opponentCurrentPokemon].moveset[i].maxPp;
    }//End for

    playerPokemonName.innerHTML=player.pokemonTeam[playerCurrentPokemon].name +" Pokemon ID: "+(playerCurrentPokemon+1) +"<br>"+" Pokemon fainted: "+player.faintedQuantity+"<br>"+"<br> level: "+player.pokemonTeam[playerCurrentPokemon].level;
    opponentPokemonName.innerHTML=opponent.pokemonTeam[opponentCurrentPokemon].name +" Pokemon ID: "+(opponentCurrentPokemon+1) + "<br>"+" Pokemon fainted: "+opponent.faintedQuantity+"<br>"+"<br> level: "+opponent.pokemonTeam[opponentCurrentPokemon].level;

    //If the opponent's pokemon is dead, then they can't use any moves. They can only switch or use items. (Opponent)
    for(i=0;i<opponent.pokemonTeam[opponentCurrentPokemon].moveset.length; i++)
    {   
        if(opponent.pokemonTeam[opponentCurrentPokemon].isAlive==false)
        {   
            //console.log("Enabling move...");
            disablePokemon(i,false);
        
        }//End if
        //Otherwise, if they got HP from a revive or something, enable them again.
        else if(opponent.pokemonTeam[opponentCurrentPokemon].isAlive==true||opponent.pokemonTeam[opponentCurrentPokemon].hp>1)
        {
            //console.log("Disabling move...");
            opponent.pokemonTeam[opponentCurrentPokemon].isAlive=true;
            enablePokemon(i,false);

        }//End else
    }//End for


    //If the player's pokemon is dead, then they can't use any moves. They can only switch or use items. (Player)
    for(i=0;i<totalPlayerMoves; i++)
    {   
        
        if(player.pokemonTeam[playerCurrentPokemon].isAlive==false)
        {   
            
            for(i=0;i<player.pokemonTeam[playerCurrentPokemon].moveset.length; i++)
            { 
                //playerPokemonName.innerHTML="BROOOOOOOOOOOOOOOOOOOOOOOOOOOOOO";
                disableMove(i,true);
            }//End for
        
        }//End if
        //Otherwise, if they got HP from a revive or something, enable them again.
        else if(player.pokemonTeam[playerCurrentPokemon].isAlive==true||player.pokemonTeam[playerCurrentPokemon].hp>0)
        {
            //console.log("Disabling move...");
            player.pokemonTeam[playerCurrentPokemon].isAlive=true;
            
            numPlayerPokemonFainted+=1;
            enablePokemon(playerCurrentPokemon,true);

        }//End else
    }//End for

    
    //This loop enables moves for when a Pokemon gets switched and another one's pp is out. (Opponent)
    for(i=0;i<opponent.pokemonTeam[opponentCurrentPokemon].moveset.length; i++)
    {   
        if(!(opponent.pokemonTeam[opponentCurrentPokemon].moveset[i].pp<=0))
        {   //console.log("Enabling move...");
            enableMove(i,false);

        }//End if
        else//Otherwise if it is less than or equal to 0 then disable it.
        {
            //console.log("Disabling move...");
            disableMove(i,false);

        }//End else
    }//End for

    //This loop enables moves for when a Pokemon gets switched and another one's pp is out. (Player)


    /*
    This block basically checks to see if the Pokemon is alive and enable all moves. And if it is, check the current PP.
    If the PP ends up being <=0, then disable the current move being checked. 
    */
    for(i=0;i<player.pokemonTeam[playerCurrentPokemon].moveQuantity; i++)
    {
        if((player.pokemonTeam[playerCurrentPokemon].hp>=1))
        {   
            
            enableMove(i,true);
            //When they're alive, check the pp.
            if(!(player.pokemonTeam[playerCurrentPokemon].moveset[i].pp<=0))
            {   //console.log("Enabling move...");
                enableMove(i,true);

            }//End if
            else //Otherwise if it is less than or equal to 0 then disable it.
            {
                //console.log("Enabling move...");
                //DISABLES MOVES FOR PP 
                disableMove(i,true);

            }//End else

        }//End if
        //Otherwise, if they're dead, disable everything.
        else if(!(player.pokemonTeam[playerCurrentPokemon].hp>=1)) //Otherwise if it is less than or equal to 0 then disable it.
        {
            
            //DISABLES MOVES FOR PP 
            disableMove(i,true);

        }//End else

        

    }//End for


    //The pokemon team and moves should all be properly initialized before this is called.
    //For every pokemon, all 4 of their moves get loaded in.
    for(i=0; i<numPlayerPokemon; i++)
    {   
        //console.log(i);
        //opHealth.value=opponent.pokemonTeam[i].hp;
        //health.value=player.pokemonTeam[i].hp;

        //The loop only goes up to however many moves each Pokemon has.
        for(j=0; j<player.pokemonTeam[i].moveQuantity; j++)
        {
        
        //Friendly reminder that I used the CSS classes to represent the types for the buttons.
        
        move[j].className=player.pokemonTeam[i].moveset[j].type;
     

        }//End inner for

    }//End outer for

    
    for(i=0; i<numOpponentPokemon; i++)
    {   
        //opHealth.value=opponent.pokemonTeam[i].hp;
        //health.value=player.pokemonTeam[i].hp;
        for(j=0; j<opponent.pokemonTeam[i].moveQuantity; j++)
        {    
        
        //Loading opponent data
        
        
        opMove[j].className=opponent.pokemonTeam[i].moveset[j].type;
        //console.log("hmHHMMM"+opMove[j].className);
        if(opMove[j].className=="default")
        {
            disableMove(j,false);
        }//End if
        
        //Setting the move name to the opponent's
        
        }//End inner for
        
    }//End outer for

    //This for loop goes through all possible moves and disables anything that doesn't exist. (Player)
    for(i=0;i<totalPlayerMoves;i++)
    {
       
        if(move[i].className=="default")
        {
            disableMove(i,true);
        }//End if
    }//End for

    //This for loop goes through all possible moves and disables anything that doesn't exist. (Opponent)
    for(i=0;i<totalOpponentMoves;i++)
    {
        //console.log("CPU "+opMove[i].className);
        if(opMove[i].className=="default")
        {   
            disableMove(i,false);
        }//End if
    }//End for


    //I'm going to dynamically make the drop down menu so that it changes per load call.
    //This is only going to be for the player. The CPU is automatic.

    //Make an array and each element will be a line of code that will insert a choice for Pokemon.
    
    
    var selectPokemon=document.getElementById("switchplayerpokemon");
    var selectItem=document.getElementById("item");

    
    
    //option=new Array(numPlayerPokemon);
    

    //player.pokemonTeam[5].name="Psyduck";
    //initializes the switch list
    
    //Update the select display.
    if(firstLoad==false)
    {

        //This for loop is for taking away the previous values.
    
/* 
-------------IMPLEMENT ITEMS THE SAME AS SWITCHING POKEMON-------------
*/

        //Just resetting this string so I can reaccumulate with the updated values.
        selectItem.innerHTML="<option>Items</option>";
        for(i=0; i<player.items.length; i++)
        {
            //I need to accumulate this because this is all under one
            
            selectItem.innerHTML+="<option id="+ "\"" +i+"\""+"value= " + player.items[i].value +"> "+player.items[i].name +"<br>"+" Quantity: "+player.items[i].quantity+" </option>";
        }//End for

        
        
        selectPokemon.innerHTML="<option>Switch</option>";        
        //Loop that updates the new values in the switch box.
        for(i=0; i<numPlayerPokemon; i++)
        {
            //I need to accumulate this because this is all under one
            //This is the select interface.
            selectPokemon.innerHTML+="<option id="+ "\"" +i+"\""+"value= " + player.pokemonTeam[i].name +"> "+player.pokemonTeam[i].name +" Level: "+player.pokemonTeam[i].level+" HP: "+ player.pokemonTeam[i].hp+"<br>"+" </option>";
        }//End for

        //firstLoad=false;
    }//End if
    
    //Do this only once
    //This shouldn't happpen ever again for the rest of the match.
    if(firstLoad==true)
    {
        //Just resetting this string so I can reaccumulate with the updated values.
        //selectItem.innerHTML="<option>Items</option>";
        for(i=0; i<player.items.length; i++)
        {
            //I need to accumulate this because this is all under one
            
            selectItem.innerHTML+="<option id="+ "\"" +i+"\""+"value= " + player.items[i].value +"> "+player.items[i].name +"<br>"+" Quantity: "+player.items[i].quantity+" </option>";
        }//End for

        for(i=0; i<numPlayerPokemon; i++)
        {
            //I need to accumulate this because this is all under one
            selectPokemon.innerHTML+="<option id="+ "\"" +i+"\""+"value= " + player.pokemonTeam[i].name +"> "+player.pokemonTeam[i].name +" Level: "+player.pokemonTeam[i].level+" HP: "+ player.pokemonTeam[i].hp+"<br>"+" </option>";
            //console.log(selectPokemon.innerHTML);    
        }//End for
        //The only time I declare this to be false.
        firstLoad=false;
    }//End if

    


}//End load

function levelUp(pokemon)
{
    console.log(pokemon.name+" leveled up!! ");

    var rand=Math.floor((Math.random()*4)+1); //Random number between 
    pokemon.level+=1;//Increment level by 1.
    pokemon.attack+=rand;//Int. 
    pokemon.defense+=rand;//Int. 
    pokemon.specialAttack+=rand;//Int. 
    pokemon.specialDefense+=rand;//Int. 
    pokemon.speed+=rand;//Int. 
    pokemon.maxHp+=rand;//Int. This is the HP cap. and it always starts out with hp 
    pokemon.currentAttack+=rand;//Int. 
    pokemon.nextLevelFormula+=this.level*this.hp;//Do this after leveling up
    pokemon.currentDefense+=rand;//Int. 
    pokemon.currentSpecialAttack+=rand;//Int. 
    pokemon.currentSpecialDefense+=rand;//Int. 
    pokemon.currentSpeed+=rand;//Int. 
    pokemon.expValue+=Math.floor((pokemon.hp*pokemon.attack*pokemon.speed*pokemon.defense)/pokemon.level);   //Math.floor((this.hp*this.attack*this.speed*this.defense)/this.level);   ////Int. How much exp the Pokemon costs after being beaten.
    pokemon.maxExp+=rand;

    //MAKE SURE THE EXP IS RESET!!!
    pokemon.exp=0;
    
    
    //Initialize moveset:

    
    //exp/level up logic
    
    //exp=0;//How much exp the Pokemon costs after being beaten.
    //pokemon.toNextLevel-=pokemon.expValue; //if (pokemon.toNextLevel<=0) {pokemon.toNextLevel-= (pokemon.toNextLevel-pokemon.expValue); pokemon.level+=1; pokemon.hp+=Math.random()*10+1 pokemon.toNextLevel=nextLevelFormula;}
    //pokemon.totalExp+=pokemon.exp;
    //
    
    //console.log("My pokemon name: "+pokemon.name+" lvl:"+pokemon.level);
    playerPokemonName.innerHTML=player.pokemonTeam[playerCurrentPokemon].name +" Pokemon ID: "+(playerCurrentPokemon+1) +"<br>"+" Pokemon fainted: "+player.faintedQuantity+"<br>"+"<br> level: "+player.pokemonTeam[playerCurrentPokemon].level;
    //console.log("My fainted quantity is!!!!! "+player.faintedQuantity);
}//End levelUp

//Get all the data from the database into our trainer, opponent, and whatever else.
function init()
{
    //var url="test.php";
    var url="battle_data.php";
    var xhttp=new XMLHttpRequest();
    var origin="https://crossorigin.me/";
    //I need to append origin to the url so that I can do the data stuff.
    
    /*
    ---------------STATUS IS RETURNING 0!
*/

    xhttp.onreadystatechange=function()
    {
        //console.log("the state changed.............................................");
        console.log("the state is: "+this.readyState);
        console.log("the status is: "+this.status);
        if(this.readyState==4&&this.status==200)
        {
            //Getting the text of the file
            console.log(this.responseText);
            //Parse into JSON
            //console.log(JSON.parse(this.responseText));
            console.log("the state changed.............................................");
        }//End if
        
       // xhttp.send();//Sends request
       
    };//End function
    
    xhttp.open("GET",origin+url,true);
    xhttp.send();
/*
-----------------PUT DATABASE STUFF HERE (RETRIEVE)-----------------    
*/
    //This is where I get put all of the database info into my things. I did some test initialization for debugging and stuff.
    /*
    */


    //console.log(player.pokemonTeam[0].name+"!!!!!!!!!!!!!!!!!!!!!!!!!");
    load();


}//End init


//This ends the battle and updates the trainer values 
function end()
{
    //disableAllMoves();
    //Disabling all battle related buttons.
    opponentSwitchButton=document.getElementById("switchopponentpokemon");
    opponentItemButton=document.getElementById("opItem");
    playerswitchButton=document.getElementById("switchplayerpokemon");
    playerItemButton=document.getElementById("item");
    opponentSwitchButton.disabled=true;

    opponentItemButton.disabled=true;
    
    playerswitchButton.disabled=true;

    playerItemButton.disabled=true;
    for(i=0;i<totalPlayerMoves; i++)
    {   
        disableMove(i,true);
    }//End for

    for(i=0;i<totalOpponentMoves; i++)
    {   
        disableMove(i,false);
    }//End for

    var winMsg="You won!";        
    var loseMsg="End battle. You lose."
/*
    -------------------------BEGIN VICTORY LOGIC-------------------------
*/        
    //If the player wins..
    if(opponent.isDefeated==true)
    {
        console.log("DEFEATED!!");


        //What this loop here does is sum up all of the exp of each of the opponent's Pokemon.
        var expSum=0;
        for(i=0;i<numOpponentPokemon;i++)
        {
            //Accumulate the sum.
            expSum+=opponent.pokemonTeam[i].expValue;
            //console.log("Experience value: "+opponent.pokemonTeam[i].expValue);
        }//End for

        //console.log("Sum of experience: " +expSum);

        //Give EACH pokemon the same amount of experience.
        const expSumReset=expSum; 
        var testSum=0;


        //This if else block covers experience gain after each battle.
        //If expShare is on, add the experience to the whole team.
        if(player.expShare==true)
        {
            //console.log("EXPSHARE IS ON!!!");


            //Keep decrementing after you increment the experience.
            for(i=0; i<numPlayerPokemon; i++)
            {
                //console.log("Okay I'm in the outer for loop.");''
                //console.log("My exp sum is: "+expSum);
                //Decrement expsum. As long as expSum is greater than 0, keep looping.
                for(expSum; expSum>=0; expSum--)
                {   
                    
                    //expSum goes down for each increment
                    testSum+=1;
                    player.pokemonTeam[i].exp+=1;
                   

                    //Check to see if the pokemon leveled up.
                    if(player.pokemonTeam[i].exp>=player.pokemonTeam[i].maxExp)
                    {
                        /*
                        So I level up the Pokemon... The expMax changes in the levelUp function..
                        Then.. I make sure that after each level up, the expSum gets reset so the next Pokemon can get the same exp.
                        */
                        
                        levelUp(player.pokemonTeam[i]);
                    }//End if (player.pokemonTeam[i].exp>=player.pokemonTeam[i].maxExp)

                }//End for(expSum; expSum==0;expSum--)

                //Reset expSum so that the rest of the Pokemon get the exp.
                expSum=expSumReset;
            }//End outer for(i=0; i<numPlayerPokemon; i++)
            // console.log("My test sum is: "+testSum);
            // console.log("My exp sum is: "+expSum);




    }//End if (player.expShare==true)
    else //Otherwise, just do the same thing but for the current Pokemon.
    {
        //Decrement expsum. As long as expSum is greater than 0, keep looping.
        for(expSum; expSum>=0; expSum--)
        {   
            //console.log("Bro wtf!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1");
            //expSum goes down for each increment
            testSum+=1;
            player.pokemonTeam[playerCurrentPokemon].exp+=1;
            //console.log("Umm helloooooooooo");

            //Check to see if the pokemon leveled up.
            if(player.pokemonTeam[playerCurrentPokemon].exp>=player.pokemonTeam[playerCurrentPokemon].maxExp)
            {
                /*
                So I level up the Pokemon... 
                */
                console.log("Umm helloooooooooo");
                levelUp(player.pokemonTeam[playerCurrentPokemon]);
            }//End if (player.pokemonTeam[i].exp>=player.pokemonTeam[i].maxExp)

        }//End for(expSum; expSum==0;expSum--)

        //Reset expSum so that the rest of the Pokemon get the exp.
        expSum=expSumReset;
    }//End else

/*-------------------------END VICTORY LOGIC-------------------------*/

    var playerExp=document.getElementById("playerexp");
    
    playerExp.innerHTML="EXP: "+player.pokemonTeam[playerCurrentPokemon].exp+"/"+player.pokemonTeam[playerCurrentPokemon].maxExp+"<progress id=\"playerexpbar\" value="+"\""+player.pokemonTeam[playerCurrentPokemon].exp+"\""+ "max ="+player.pokemonTeam[playerCurrentPokemon].maxExp+"></progress>";
    
        
         /*
    if(player.didCatchPokemon==true)
    {
        player.totalPokemon
        database.totalPokemon=player.totalPokemon
        //Insert code that adds the pokemon to database.
        
        database.add(player.caughtPokemon);
        //Or something like that.
    }//End if
    This will have all the end of battle updates such as level ups, money gains,
    pokemon catches, etc..
    Idea:
    database.level=Pokemonobject.level;
    display all the messages
    //Have a loop to see if the pokemon leveled up.
    for(i<numPlayerPokemon;i++)
    {
        if(player.pokemonTeam[i].)
    }//End for
    moneyMsg=player.name +"gained"+"$ opponent.money!!";
    levelUpMsg;
    display(moneyMsg);
    */
        display(winMsg);
    
    
    
    }//End if(opponent.isDefeated==true)
    else if(player.isDefeated==true)
    {
    
        console.log("lost");
        display(loseMsg);
        //End else
    }//End else if
    playerPokemonName.innerHTML=player.pokemonTeam[playerCurrentPokemon].name +" Pokemon ID: "+(playerCurrentPokemon+1) +"<br>"+" Pokemon fainted: "+player.faintedQuantity+"<br>"+"<br> level: "+player.pokemonTeam[playerCurrentPokemon].level;
    console.log("My fainted quantity is!!!!! "+player.faintedQuantity);
    /*
-----------------PUT DATABASE STUFF HERE (UPDATE)-----------------    
    */
    
    //Get the id and do php stuff here.
    var database=document.getElementById("updatedatabase");
    database.innerHTML="<?php?>";
    var xhttp=new XMLHttpRequest();

    //console.log("THIS IS THE DATABASE TRAINER NAME: "+ INSERT TRAINER VALUE HERE); 
    //Just update the exp representation.
    //
}//End end
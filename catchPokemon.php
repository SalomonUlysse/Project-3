<?php
include "pdo.php";


    try
    {    
        //Random dex number for encounter    
        $randomDex = rand(1,151);
        
        //Check if legendary
        if ($randomDex == 144 || $randomDex == 145 || $randomDex == 146 || $randomDex == 150 || $randomDex == 151)
        {
            //Random chance for legendary
            $legendaryEncounter = rand(1,20);
            //5% catch rate
            if ($legendaryEncounter == 1){
                $caught = 1;
            }
            else {
                $caught = 2;
            }
        }
        else {
            //Catch rate for all others
            $normalEncounter = rand(1,4);
            //25% catch rate
            if ($normalEncounter == 1){
                $caught = 1;
            }
            else {
                $caught = 2;
            }
        }

        if ($caught == 1)
        {
            //Transaction to ensure full sql completion
            $pdo->beginTransaction();

            //Get trainer_id
            $trainersql = $pdo->prepare("SELECT MAX(TrainerNo) as max FROM trainer");
            $trainersql->execute();
            $trainerid = $trainersql->fetchColumn(); 

            //Retrieve pokemon max level
            $pokemonsql = $pdo->prepare("SELECT MAX(Level) as max FROM trainer 
                                  INNER JOIN  hasteam ON trainer.TrainerNo=hasteam.TrainerNo WHERE hasteam.TrainerNo=?");
            $pokemonsql->execute([$trainerid]);
            $maxLevel = $pokemonsql->fetchColumn(); 

            //Random Pokemon Level is +-3 from max level on team
            $randomLevel = rand($maxLevel-3, $maxLevel+3);

            //Get stats 
            $statssql = $pdo->prepare("SELECT * from pokemon WHERE DexNum=?");
            $statssql->execute([$randomDex]);
            $result = $statssql->fetch();

            //Save variables
            $name = $result["Name"];
            $dexnum = $result["DexNum"];
            $HP = $result["HP"] + $randomLevel;
            $atk = $result["Attack"] + $randomLevel;
            $def = $result["Defense"] + $randomLevel;
            $spatk = $result["Sp_Attack"] + $randomLevel;
            $spdef = $result["Sp_Defense"] + $randomLevel;
            $speed = $result["Speed"] + $randomLevel;

            $src = "img/1st Generation/$dexnum$name.png";
            echo "You have caught a Level $randomLevel $name!";

            if(isset($_POST["accept"]))
            {
                //Sql to insert pokemon for the trainer
                $caughtsql = "INSERT INTO hasteam (TrainerNo, DexNum, Level, CurHP, CurAtk, CurDef, CurSpAtk, CurSpDef, CurSpeed, EXP)
                VALUES (:trainerno, :dexno, :curlev, :hp, :attk, :def, :curspa, :curspd, :curspe, 0)";
        
                //Prepare the sql execution
                $statement = $pdo->prepare($caughtsql);
                $statement->bindValue(':trainerno', $trainerid);
                $statement->bindValue(':dexno', $dexnum);
                $statement->bindValue(':curlev', $randomLevel);
                $statement->bindValue(':hp', $HP);
                $statement->bindValue(':attk', $atk);
                $statement->bindValue(':def', $def);
                $statement->bindValue(':curspa', $spatk);
                $statement->bindValue(':curspd', $spdef);
                $statement->bindValue(':curspe', $speed);
                $statement->execute();

                //Commit the transaction
                $pdo->commit();
            }
            
        }
        else
        {
            //Get stats 
            $statssql = $pdo->prepare("SELECT * from pokemon WHERE DexNum=?");
            $statssql->execute([$randomDex]);
            $result = $statssql->fetch();

            //Save variables
            $name = $result["Name"];

            $src = "img/1st Generation/$randomDex$name.png";
            echo "You did not manage to catch a $name.";
        }
    }
    //Catch database timeout exception
    catch(PDOException $e)
    {
        die($e->getMessage());
    }

    $connString = null;
    $pdo = null;

?>
<!-- This PHP file is used after the user choosesa starter, it presents them with new options -->
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Pokemon Battle</title>
	<link rel="stylesheet" href="proj3.css" type="text/css" media="screen">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
	<script src="proj3_3.js"></script>
</head>
<body>
	<audio id="bgm" autobuffer="" loop="true" preload="auto" src="sound/bgm/bgm.mp3">
	 </audio>
	 <script src="sound/audio.js"></script>
	<div class="center hideForm">
		<img id="oak" src="img/profOak.png">
		<p id="goodbye">Thank you for playing! See you next time!</p>
		<p id="dupeTrainer">I believe we have already met. Good luck on your adventure!</p>
		<p id="dupeStarter">I believe you have already received a starter Pokemon from me. Good luck on your adventure!</p>
		<p id="encounter">You have encountered a wild pokemon!</p>
		<p id="trainPokemon">Welcome to Oak's Training Ground! What would you like to do?</p>
		<p id="pokemonChoice">Choose your pokemon and berry for a 20% chance to raise stats!</p>
		<p id="control">Everything in this game is controlled by mouse input, so anything you want to interact with use left click.</p>

		<button id="catchPokemon" name="catchPokemon">Catch</button>
		<button id="runAway">Run</button>

		<form id="form" method="post">
			<p id="pokemonEncounter">
				<?php include "catchPokemon.php";?>
			</p>
			<img id="caughtPokemon" src="<?php echo $src;?>">
			<button type="submit" id="accept" name = "accept">Accept</button>
			<button id="close">Next</button>
		</form>

		<button id="confirmTrain" name="confirmTrain">Let's Train!</button>
		<button id="leaveTrain">Exit Training</button>

		<form id="trainForm" method="post">
			<p id ="trainingSession">
				<?php include "listPokemon.php";?>
				<select id = "berries" name = "berries">
					<option value = "HP">Oran Berry - HP</option>
					<option value = "Atk">Cheri Berry - Att</option>
					<option value = "Def">Chesto Berry - Def</option>
					<option value = "SpAtt">Rawst Berry - Sp Att</option>
					<option value = "SpDef">Aspear Berry- Sp Def</option>
					<option value = "Speed">Leppa Berry- Speed</option>
				</select>

				<button type="submit" id="thanksOak" name="thanksOak">Thanks Oak.</button>
			</p>
		</form>
	</div>

	<h1 class="title">Pokemon Battle!</h1>
	<button class="press" id="create">Create Trainer</button>
	<button class="press" id="choose">Choose Starter</button>
	<button class="press" id="catch">Catch a Pokemon</button>
	<button class="press" id="train">Train</button>
	<button class="press" id="fight">Fight</button>
	<button class="press" id="controls">Controls</button>
	<button class="press" id="exit" onclick="stopBGM()">Exit</button>
</body>
</html>
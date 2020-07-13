$(document).ready(function()
{
	$("#choose").show();
	$("#catch").show();
	$("#train").show();
	$("#fight").show();
	$("#controls").show();
	$("#exit").show();
	$("#dupeTrainer").hide();
	$("#pokemonEncounter").hide();
	$("#caughtPokemon").hide();
	$("#accept").hide();
	$("#trainPokemon").hide();
	$("#pokemonChoice").hide();
	$("#trainingSession").hide();
	$("#confirmTrain").hide();
	$("#leaveTrain").hide();
	$("#berries").hide();
	$("#control").hide();
	$("#listOfPokemon").hide();
	$("#choosePokemon").hide();
	$("#leave").hide();
	$("#battleChoice").hide();
	$("#toBattle").hide();

	//checks if the user clicked on create trainer
	$("#create").on("click", function()
	{
		$(".center").show();
		$("#oak").show();
		$("#dupeTrainer").show();
		$("#close").show();
		$("#dupeStarter").hide();
		$("#encounter").hide();
		$("#create").hide();
		$("#choose").hide();
		$("#catch").hide();
		$("#train").hide();
		$("#fight").hide();
		$("#controls").hide();
		$("#exit").hide();
		$("#catchPokemon").hide();
		$("#runAway").hide();
		$("#pokemonEncounter").hide();
		$("#trainPokemon").hide();
		$("#pokemonChoice").hide();
		$("#trainingSession").hide();
		$("#confirmTrain").hide();
		$("#leaveTrain").hide();
		$("#berries").hide();
		$("#choosePokemon").hide();
		$("#leave").hide();
		$("#battleChoice").hide();
	});

	//checks if the user clicked on choose starter
	$("#choose").on("click", function()
	{
		$(".center").show();
		$("#oak").show();
		$("#dupeStarter").show();
		$("#close").show();
		$("#create").hide();
		$("#choose").hide();
		$("#catch").hide();
		$("#dupeTrainer").hide();
		$("#encounter").hide();
		$("#train").hide();
		$("#fight").hide();
		$("#controls").hide();
		$("#exit").hide();
		$("#catchPokemon").hide();
		$("#runAway").hide();
		$("#pokemonEncounter").hide();
		$("#trainPokemon").hide();
		$("#pokemonChoice").hide();
		$("#trainingSession").hide();
		$("#confirmTrain").hide();
		$("#leaveTrain").hide();
		$("#choosePokemon").hide();
		$("#leave").hide();
		$("#battleChoice").hide();
	});

	//checks if the user clicked the close button
	$("#close").on("click", function()
	{
		$(".center").hide();
		$("#oak").hide();
		$("#dupeTrainer").hide();
		$("#dupeStarter").show();
		$("#close").hide();
		$("#create").show();
		$("#choose").show();
		$("#catch").show();
		$("#train").show();
		$("#fight").show();
		$("#controls").show();
		$("#exit").show();
		$("#trainPokemon").hide();
		$("#pokemonChoice").hide();
		$("#trainingSession").hide();
		$("#confirmTrain").hide();
		$("#leaveTrain").hide();
		$("#leave").hide();
		$("#battleChoice").hide();
	});

	//checks if the user clicked on catch
	$("#catch").on("click", function()
	{	
		$("#oak").show();
		$(".center").show();
		$("#encounter").show();
		$("#catchPokemon").show();
		$("#runAway").show();
		$("#create").hide();
		$("#choose").hide();
		$("#catch").hide();
		$("#train").hide();
		$("#fight").hide();
		$("#controls").hide();
		$("#exit").hide();
		$("#dupeTrainer").hide();
		$("#dupeStarter").hide();
		$("#trainPokemon").hide();
		$("#pokemonChoice").hide();
		$("#trainingSession").hide();
		$("#confirmTrain").hide();
		$("#leaveTrain").hide();
		$("#accept").hide();
		$("#choosePokemon").hide();
		$("#leave").hide();
		$("#battleChoice").hide();

		//if the user chooses to try to catch the wild pokemon
		$("#catchPokemon").on("click", function()
		{
			$("#pokemonEncounter").show();
			$("#encounter").hide();
			$("#catchPokemon").hide();
			$("#runAway").hide();
			$("#accept").show();
			$("#caughtPokemon").show();

			$("#accept").on("click", function()
			{
				$("#close").hide();
				$("#accept").hide();
				$("#pokemonEncounter").hide();
				$(".center").hide();
				$("#oak").hide();
				$("#create").show();
				$("#choose").show();
				$("#catch").show();
				$("#train").show();
				$("#fight").show();
				$("#controls").show();
				$("#exit").show();
			});
		});

		//if the user chooses to run away from the wild pokemon
		$("#runAway").on("click", function()
		{
			$(".center").hide();
			$("#create").show();
			$("#choose").show();
			$("#catch").show();
			$("#train").show();
			$("#fight").show();
			$("#controls").show();
			$("#exit").show();
		});
	});

	//checks if the user clicked on train
	$("#train").on("click", function()
	{
		$(".center").show();
		$("#oak").show();
		$("#close").hide();
		$("#currentPokemon").show();
		$("#create").hide();
		$("#choose").hide();
		$("#catch").hide();
		$("#train").hide();
		$("#fight").hide();
		$("#controls").hide();
		$("#exit").hide();
		$("#dupeTrainer").hide();
		$("#dupeStarter").hide();
		$("#encounter").hide();
		$("#catchPokemon").hide();
		$("#runAway").hide();
		$("#trainPokemon").show();
		$("#trainingSession").hide();
		$("#confirmTrain").show();
		$("#leaveTrain").show();
		$("#thanksOak").hide();
		$("#choosePokemon").hide();
		$("#leave").hide();
		$("#battleChoice").hide();


		$("#confirmTrain").on("click", function()
		{
			$("#pokemonChoice").show();
			$("#trainingSession").show();
			$("#trainPokemon").hide();
			$("#confirmTrain").hide();
			$("#leaveTrain").hide();
			$("#thanksOak").show();
			$("#accept").hide();
			$("#berries").show();
			$("#listOfPokemon").show();
			
			$("#thanksOak").on("click", function()
			{
				$("#close").hide();
				$("#pokemonEncounter").hide();
				$(".center").hide();
				$("#oak").hide();
				$("#create").show();
				$("#choose").show();
				$("#catch").show();
				$("#train").show();
				$("#fight").show();
				$("#controls").show();
				$("#berries").show()
				$("#exit").show();
			});
		});

		$("#leaveTrain").on("click", function()
        {
            $(".center").hide();
            $("#create").show();
            $("#choose").show();
            $("#catch").show();
            $("#train").show();
            $("#fight").show();
            $("#controls").show();
            $("#exit").show();
        });
	});
	//checks if the user clicked on fight
	$("#fight").on("click", function()
	{
		$(".center").show();
		$("#oak").show();
		$("#choosePokemon").show();
		$("#leave").show();
		$("#battleChoice").show();
		$("#create").hide();
		$("#choose").hide();
		$("#catch").hide();
		$("#train").hide();
		$("#fight").hide();
		$("#controls").hide();
		$("#exit").hide();
		$("#dupeTrainer").hide();
		$("#pokemonEncounter").hide();
		$("#dupeStarter").hide();
		$("#encounter").hide();
		$("#trainPokemon").hide();
		$("#confirmTrain").hide();
		$("#leaveTrain").hide();
		$("#catchPokemon").hide();
		$("#runAway").hide();
		$("#toBattle").show();

		$("#leave").on("click", function()
		{
			$(".center").hide();
			$("#oak").hide();
			$("#choosePokemon").hide();
			$("#battleChoice").hide();
			$("#toBattle").hide();
			$("#leave").hide();
			$("#create").show();
			$("#choose").show();
			$("#catch").show();
			$("#train").show();
			$("#fight").show();
			$("#controls").show();
			$("#exit").show();
		});
	});

	//checks if the user clicked on controls
	$("#controls").on("click", function()
	{
		$(".center").show();
		$("#oak").show();
		$("#control").show();
		$("#close").show();
		$("#create").hide();
		$("#choose").hide();
		$("#catch").hide();
		$("#train").hide();
		$("#fight").hide();
		$("#controls").hide();
		$("#exit").hide();
		$("#dupeTrainer").hide();
		$("#pokemonEncounter").hide();
		$("#dupeStarter").hide();
		$("#encounter").hide();
		$("#trainPokemon").hide();
		$("#confirmTrain").hide();
		$("#leaveTrain").hide();
		$("#choosePokemon").hide();
		$("#leave").hide();
		$("#battleChoice").hide();
	});

	//checks if the user clicked on exit
	$("#exit").on("click", function()
	{
		$("#create").hide();
		$("#choose").hide();
		$("#catch").hide();
		$("#train").hide();
		$("#fight").hide();
		$("#leave").hide();
		$("#controls").hide();
		$("#exit").hide();
		$("#dupeTrainer").hide();
		$("#dupeStarter").hide();
		$("#encounter").hide();
		$("#catchPokemon").hide();
		$("#runAway").hide();
		$(".center").show();
		$("#oak").show();
		$("#goodbye").show();
		$("#battleChoice").hide();
	});
});
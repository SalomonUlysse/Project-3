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
		$("#close").show();
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
	});

	//checks if the user clicked on fight

	//checks if the user clicked on controls
	$("#controls").on("click", function()
	{
		$(".center").show();
		$("#oak").show();
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
	});

	//checks if the user clicked on exit
	$("#exit").on("click", function()
	{
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
		$(".center").show();
		$("#oak").show();
		$("#goodbye").show();
	});
});
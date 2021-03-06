const { Client, MessageEmbed } = require("discord.js");
exports.run = async (client, message, args) => {
	const msgauthor = message.author.username
	//Würfel
	//Argumente und Variablen Registrieren

	var rollarga = args[0]
	var rollargb = args[1]
	const rollargerror = args[2]
	var rolltype = 0
	var dicetype = "wx"

	if (args[0]) rollarga = rollarga.toLowerCase()
	if (args[1]) rollargb = rollargb.toLowerCase()

	if (!args[1] && args[0]) if (rollarga[0] !== "w" && rollarga[0] !== "d") {
		if (rollarga.includes("w")) {
			rollargs = rollarga.split("w")
			rollarga = rollargs[0]
			rollargb = `w${rollargs[1]}`
			args[1] = rollargb
		} else if (rollarga.includes("d")) {
			rollargs = rollarga.split("d")
			rollarga = rollargs[0]
			rollargb = `w${rollargs[1]}`
			args[1] = rollargb
		}
	}

	var rollcountcur = 0
	var rollcountmax = 0

	var gotDefault = false
	var gotStringConverted = false
	var detectedDiceType = false
	var detectedOnlyOneArg = false


	//Argumente validieren

	if (args[2]) return message.channel.send("<:warn_3:498277726604754946> Error: too many Arguments. Only dice type and roll count are valid arguments. The odd argument is " + rollargerror);


	//Zwei Argumente
	var checkregex = /w|d/

	if (args[0] && args[1]) {
		if (checkregex.test(rollarga) && checkregex.test(rollargb)) return message.channel.send("<:warn_3:498277726604754946> Error: Argument `dice type` is defined twice");
		if (!checkregex.test(rollarga) && !checkregex.test(rollargb)) return message.channel.send("<:warn_3:498277726604754946> Error: Argument `roll count` is defined twice");

		//Zwei Argumente verarbeiten

		if (rollarga.indexOf("w") == 0) {
			var dicetype = rollarga
			var rollcountmax = rollargb
		} else if (rollarga.indexOf("d") == 0) {
			var dicetype = rollarga
			var rollcountmax = rollargb
		} else if (rollargb.indexOf("w") == 0) {
			var dicetype = rollargb
			var rollcountmax = rollarga
		} else if (rollargb.indexOf("d") == 0) {
			var dicetype = rollargb
			var rollcountmax = rollarga
		} else return message.channel.send("<:warn_3:498277726604754946> Very strange error: Schroedingers Argument `Dice type` is defined and not defined");
	}

	//Ein Argument verarbeiten

	if (args[0] && !args[1]) {

		var detectedOnlyOneArg = true

		if (rollarga.indexOf("w") == 0) {
			var dicetype = rollarga
			var rollcountmax = 1
			var detectedDiceType = true
		} else if (rollarga.indexOf("d") == 0) {
			var dicetype = rollarga
			var rollcountmax = 1
			var detectedDiceType = true
		} else {
			var rolltype = 6
			var rollcountmax = rollarga
		}
	}

	//Kein Argument; Standard einsetzen

	if (!args[0]) {
		var rolltype = 6
		var gotDefault = true
		var rollcountmax = 1
	}

	//String dicetype zu Const rolltype umwandeln

	if (rolltype == 0 && dicetype == "wx") return message.channel.send("<:warn_3:498277726604754946> Error: After validating arguments there is still no dicetype");

	if (rolltype == 0 && dicetype == "w0") return message.channel.send("<:warn_3:498277726604754946> Error: you intented to roll a dice with no sides");

	if (rolltype == 0 && dicetype == "d0") return message.channel.send("<:warn_3:498277726604754946> Error: you intented to roll a dice with no sides");

	if (rolltype == 0) {
		var rolltype = dicetype.substr(1)
		var gotStringReadyToConvert = true
	}

	if (rolltype == 0) return message.channel.send("<:warn_3:498277726604754946> Error: rolltype is not defined \n" + "gotDefault = " + gotDefault + "\n" + "gotStringReadyToConvert = " + gotStringReadyToConvert + "\n" + "detectedOnlyOneArg = " + detectedOnlyOneArg + "\n" + "detectedDiceType = " + detectedDiceType);

	if (rollcountmax == 0) {
		const plaintext = "*...und " + msgauthor + " hörte leise wie der Wind über den leeren Tisch strich, auf dem nicht ein Würfel zu sehen war...*"
		const embed = new MessageEmbed()
		embed.setColor(0x36393E)
		embed.setDescription('<:info_1:498285998346731530> Wenn du ein Ergebnis erhalten möchtest, wäre es vermutlich sinnvoll, das nächste mal auch einen Würfel zu werfen.')
		embed.setFooter("@" + msgauthor)
		return message.channel.send(plaintext, embed);
	}

	//Auswürfeln und Ergebnisanzeige
	var rollresult = "";
	let useEmotes;
	let result = await client.random.api.generateIntegers({ min: 1, max: rolltype, n: rollcountmax })
	client.logger.debug(result)
	result.random.data.forEach(num => {
		if (rolltype < 10) {
			useEmotes = true
			rollcountcur++;
			switch (num) {
				case 1:
					rollresult += "<:dice1:601727730320670721> ";
					break;
				case 2:
					rollresult += "<:dice2:601730229513355284> ";
					break;
				case 3:
					rollresult += "<:dice3:601730229563686921> ";
					break;
				case 4:
					rollresult += "<:dice4:601730229538390017> ";
					break;
				case 5:
					rollresult += "<:dice5:601730229781790720> ";
					break;
				case 6:
					rollresult += "<:dice6:601730229597372416> ";
					break;
				case 7:
					rollresult += "<:dice7:601730229119090700> ";
					break;
				case 8:
					rollresult += "<:dice8:601730229211496454> ";
					break;
				case 9:
					rollresult += "<:dice9:601730229337063425> ";
					break;
			}
			//		}
		} else {

			//getrennte Zahlen
			useEmotes = false
			rollcountcur++;
			rollresult += (num)
			client.logger.debug("rollcountmax: " + rollcountmax)
			client.logger.debug("rollcountcur: " + rollcountcur)

			var isLastRoll = false
			if (rollcountmax == rollcountcur) {
				var isLastRoll = true
			}
			client.logger.debug("isLastRoll: " + isLastRoll)
			var isNotLastRoll = false
			if (rollcountmax !== rollcountcur) {
				var isNotLastRoll = true
			}
			client.logger.debug("isNotLastRoll: " + isNotLastRoll)
			if (rollcountmax == rollcountcur) {
			} else {
				rollresult += " | ";
			}
			client.logger.debug(" ")
		} //else
	}) //forEach(num)
	//Ist Antwort zu lang?

	if (rollcountmax > 70) {
		return message.channel.send("<:warn_3:498277726604754946> Der Tisch ist zu klein, um so viele Würfel darauf zu werfen. Maximal 70 Würfel sind erlaubt ")
	}

	//Antwort

	if (rollcountmax == 1) {
		const plaintext = "es wurde mit einem " + rolltype + "-seitigen Würfel gewürfelt."
		const embed = new MessageEmbed()
		embed.setColor(0x36393E)
		if (useEmotes) {
			embed.setDescription(rollresult)
		} else {
			embed.setAuthor(rollresult)
		}
		embed.setFooter("@" + msgauthor)

		return message.channel.send(plaintext, embed);
	} else {
		const plaintext = "es wurde mit " + rollcountmax + " " + rolltype + "-seitigen Würfeln gewürfelt."
		const embed = new MessageEmbed()
		embed.setColor(0x36393E)
		if (useEmotes) {
			embed.setDescription(rollresult)
		} else {
			embed.setAuthor(rollresult)
		}
		embed.setFooter("@" + msgauthor)

		return message.channel.send(plaintext, embed);
	}

}

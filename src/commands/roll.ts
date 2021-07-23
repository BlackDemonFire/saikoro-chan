import Client from "bot";
import { Message, MessageEmbed } from "discord.js";
import { Command } from "../modules/command";

export default class Roll extends Command {
	constructor(client: Client) {
		super(client);
	}
	help = {
		show: true,
		name: "roll",
		usage: `${this.prefix}roll [args]`,
		category: "Utility",
		description: "Wirf einen Würfel - standardmäßig wird 1 w6 verwendet. Um andere Würfel zu verwenden verwende [Anzahl]w[Würfeltyp]"
	};
	async run(client: Client, message: Message, args: string[]) {
		const msgauthor: string = message.author.username;
		//register args and variables

		var rollarga: string = args[0];
		var rollargb: string = args[1];
		const rollargerror: string = args[2];
		var rolltype: number = 0;
		var dicetype = "wx";
		var rollargs;

		if (args[0]) rollarga = rollarga.toLowerCase();
		if (args[1]) rollargb = rollargb.toLowerCase();

		if (!args[1] && args[0]) if (rollarga[0] !== "w" && rollarga[0] !== "d") {
			if (rollarga.includes("w")) {
				rollargs = rollarga.split("w");
				rollarga = rollargs[0];
				rollargb = `w${rollargs[1]}`;
				args[1] = rollargb;
			} else if (rollarga.includes("d")) {
				rollargs = rollarga.split("d");
				rollarga = rollargs[0];
				rollargb = `w${rollargs[1]}`;
				args[1] = rollargb;
			}
		}

		var rollcountcur = 0;
		var rollcountmax = "0";

		var gotDefault = false;
		var gotStringConverted = false;
		var detectedDiceType = false;
		var detectedOnlyOneArg = false;


		//validify arguments

		if (args[2]) return message.channel.send("<:warn_3:498277726604754946> " + "Fehler: zu viele Argumente. Nur Würfeltyp und Würfelzahl sind erlaubt. Dieses Argument ist zu viel: " + rollargerror);


		//two arguments
		var checkregex: RegExp = /w|d/;

		if (args[0] && args[1]) {
			if (checkregex.test(rollarga) && checkregex.test(rollargb)) return message.channel.send("<:warn_3:498277726604754946> Fehler: Das Argument `Würfeltyp` ist doppelt angegeben.");
			if (!checkregex.test(rollarga) && !checkregex.test(rollargb)) return message.channel.send("<:warn_3:498277726604754946> Fehler: Das Argument `Anzahl` ist doppelt angegeben.");

			//process two arguments
			if ((rollarga.indexOf("w") == 0) || (rollarga.indexOf("d") == 0)) {
				var dicetype = rollarga;
				var rollcountmax = rollargb;
			} else if ((rollargb.indexOf("w") == 0) || (rollargb.indexOf("d") == 0)) {
				var dicetype = rollargb;
				var rollcountmax = rollarga;
			} else return message.channel.send("<:warn_3:498277726604754946> Sehr merkwürdiger Fehler: Schrödingers Argument - `Würfeltyp` ist definiert und nicht definiert.");
		}

		//process single argument

		if (args[0] && !args[1]) {

			var detectedOnlyOneArg = true;

			if (rollarga.indexOf("w") == 0) {
				var dicetype = rollarga;
				rollcountmax = "1";
				var detectedDiceType = true;
			} else if (rollarga.indexOf("d") == 0) {
				var dicetype = rollarga;
				rollcountmax = "1";
				var detectedDiceType = true;
			} else {
				rolltype = 6;
				rollcountmax = rollarga;
			}
		}

		//no argument: insert default

		if (!args[0]) {
			rolltype = 6;
			var gotDefault = true;
			rollcountmax = "1";
		}

		//convert String dicetype to Const rolltype

		if (rolltype == 0 && dicetype == "wx") return message.channel.send("<:warn_3:498277726604754946> Fehler: Nach dem validieren der Argumente ist immer noch kein Würfeltyp festgelegt.");

		if (rolltype == 0 && dicetype == "w0") return message.channel.send("<:warn_3:498277726604754946> Fehler: Du hast versucht, mit einem seitenlosen Würfel zu würfeln.");

		if (rolltype == 0 && dicetype == "d0") return message.channel.send("<:warn_3:498277726604754946> Fehler: Du hast versucht, mit einem seitenlosen Würfel zu würfeln.");

		if (rolltype == 0) {
			dicetype = dicetype.substr(1);
			//@ts-ignore
			if (isNaN(dicetype)) return message.channel.send("<:warn_3:498277726604754946> " + language.command.roll.errors.rolltypeNotNumeric);
			rolltype = parseInt(dicetype);
			var gotStringReadyToConvert = true;
		}

		if (rolltype == 0) return message.channel.send("<:warn_3:498277726604754946> Fehler: Der Würfeltyp ist nicht definiert.\ngotDefault = " + gotDefault + "\ngotStringReadyToConvert = " + gotStringReadyToConvert + "\ndetectedOnlyOneArg = " + detectedOnlyOneArg + "\ndetectedDiceType = " + detectedDiceType);

		if (rollcountmax == "0") {
			const plaintext = `...und ${msgauthor} hörte leise wie der Wind über den leeren Tisch strich, auf dem nicht ein Würfel zu sehen war...`;
			const embed = new MessageEmbed()
				.setColor(0x36393E)
				.setDescription('<:info_1:498285998346731530> Wenn du ein Ergebnis erhalten möchtest, wäre es vermutlich sinnvoll, das nächste mal auch einen Würfel zu werfen.')
				.setFooter("@" + msgauthor);
			return message.channel.send("*" + plaintext + "*", embed);
		}
		//@ts-ignore
		if (isNaN(rollcountmax)) return message.channel.send("<:warn_3:498277726604754946> Es wäre sinnvoll, eine Zahl und keine Buchstabensammlung an Würfeln anzugeben.");
		//roll the dice and display the result
		var rollresult: string = "";
		let useEmotes: boolean;
		var rollcount: number = parseInt(rollcountmax, 10);
		if (rollcount < 1) rollcount = 1;
		if (rollcount % 1 !== 0) rollcount = Math.round(rollcount);
		//is the response too long?

		if (rollcount > 70) {
			return message.channel.send("<:warn_3:498277726604754946> Der Tisch ist zu klein für so viele Würfel. Es sind maximal 70 Würfel erlaubt");
		}
		let result: number[] = await client.random.ints(1, rolltype, rollcount);
		result.forEach((num: number) => {
			if (rolltype < 10) {
				useEmotes = true;
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
				//separated numbers
				useEmotes = false;
				rollcountcur++;
				rollresult += (num);

				if (rollcount != rollcountcur) {
					rollresult += " | ";
				}
			} //else
		}); //forEach(num)

		//response

		if (rollcountmax == "1") {
			const plaintext = `es wurde mit einem ${rolltype}-seitigen Würfel gewürfelt.`;
			const embed = new MessageEmbed()
				.setColor(0x36393E)
				.setFooter("@" + msgauthor);
			if (useEmotes) {
				embed.setDescription(rollresult);
			} else {
				embed.setAuthor(rollresult);
			}

			return message.channel.send(plaintext, embed);
		} else {
			const plaintext = `es wurde mit ${rollcountmax} ${rolltype}-seitigen Würfeln gewürfelt.`;
			const embed = new MessageEmbed()
				.setColor(0x36393E)
				.setFooter("@" + msgauthor);
			if (useEmotes) {
				embed.setDescription(rollresult);
			} else {
				embed.setAuthor(rollresult);
			}

			return message.channel.send(plaintext, embed);
		}

	}
}
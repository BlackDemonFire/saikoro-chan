const { Client, MessageEmbed } = require("discord.js");
exports.run = async (client, message, args) => {
	const yesresp = ["Ja", "Ja", "Scheint so", "Eher schon", "Ich glaube schon", "Bestimmt", "Vermutlich", "Definitiv"]
	const noresp = ["Nein", "Nein", "Scheint nicht so", "Eher nicht", "Nö", "Ich glaube nicht", "Bestimmt nicht", "Nein! ... Baka"]
	let res = await client.random.int(0, 1)
	let resp
	switch(res) {
 		case 0:
  			resp = client.random.choice(yesresp)
 		break;
 		case 1:
 			resp = client.random.choice(noresp)
 		break;
 	}
	const embed = new MessageEmbed()
	embed.setColor(0x292f33)
	embed.setDescription(resp)
	embed.setAuthor("8ball", "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/144/twitter/154/billiards_1f3b1.png")
	embed.setFooter("@" + message.author.username)
	message.channel.send("*" + "„" + args.join(" ") + "“" + "*", embed);
}

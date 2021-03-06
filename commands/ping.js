const { Client, MessageEmbed } = require("discord.js");
exports.run = (client, message, args) => {
	//code
	async function main () {
		const msg = await message.channel.send(client.emojis.get("498280749271744512") + " Ping?");
		const embed = new MessageEmbed()
			embed.setColor(0x7289DA)
			embed.setDescription("API Latency is " + Math.round(client.ping) + "ms")
			embed.setAuthor("Latency is " + (msg.createdTimestamp - message.createdTimestamp) + "ms.")
			embed.setFooter("@" + message.author.username)
		msg.edit("<:check_4:498523284804075541> Pong!", embed);
	}
	main()
}

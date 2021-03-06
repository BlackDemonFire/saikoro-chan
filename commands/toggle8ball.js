exports.run = (client, message, args) => {
	if (message.author.id=="390525655974019073") {
		if (client.commands.has("8ball")) {
			client.commands.delete("8ball")
			message.author.send("8ball ist nun aus")
		} else {
			client.commands.set("8ball", require("./8ball.js"))
			message.author.send("8ball ist nun wieder aktiviert")
		}
	}
}

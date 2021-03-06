const discord = require("discord.js")
exports.run = async (client, message, args) => {
    const msgargs = message.content.split(" ")
    let cmd
    if (message.content.includes(" ")) {
        cmd = message.content.split(" ")[0].slice(client.config.prefix.length).toLowerCase()
    } else {
        cmd = message.content.slice(client.config.prefix.length).toLowerCase()
    }
    let color
    if (client.gifcolors.has(message.author.id)) {
        color = client.gifcolors.get(message.author.id)
    } else {
        color = "RANDOM"
    }
    let other
    if (args) {
        other = args.join(" ")
        if (other == "") other = "themselves"
    } else {
        other = "themselves"
    }
    const options = client.gifs.get(cmd, "gifs")
    const choice = await client.random.choice(options)
    const responsestring = client.gifs.get(cmd, "responsestring").replace("@s", message.author.username).replace("@o", other)
    let embed = new discord.MessageEmbed().setAuthor(cmd).setImage(choice).setDescription(responsestring).setColor(color)
    message.channel.send(embed)
}

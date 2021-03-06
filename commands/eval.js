const { inspect } = require("util")
exports.run = async (client, message, args) => {
    if (message.author.id == client.apk.owner.id) {
        const code = args.join(" ")
        const evaled = eval(code)
        message.channel.send("```js\n" + evaled + "```")
    }
}

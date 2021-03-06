const discord = require("discord.js")
exports.run = async (client, message, args) => {
    let msg
    msg = await message.channel.send("Welchen Gif Befehl möchtest du erstellen/erweitern?")
    let coll
    let command
    let responsestring
    let usr
    let index = 0
    coll = await msg.channel.createMessageCollector((m) => m.author == message.author, { time: 60000 })
    coll.on("collect", (collected) => {
        index++
        switch (index) {
            case 1:
                command = collected.content.toLowerCase()
                if (client.gifs.has(command)) {
                    message.channel.send("Nun den Link zum Gif das du hinzufügen möchtest")
                    limit = 2
                } else {
                    message.channel.send("Welcher Text soll im Embed stehen? (@s wird mit dem Nutzernamen der Person ersetzt, die den Befehl ausführt - @o mit dem Rest der Nachricht, wenn der Befehl ausgeführt wird)")
                    limit = 3
                }
                break;
            case 2:
                switch (limit) {
                    case 2:
                        client.gifs.push(command, collected.content, "gifs")
                        coll.stop()
                        break;
                    case 3:
                        responsestring = collected.content
                        message.channel.send("Nun noch ein erstes Gif für den Befehl")
                        break;
                }
                break;
            case 3:
                client.gifs.set(command, { "responsestring": responsestring, "gifs": [collected.content] })
                coll.stop()
                break;
            default:
                break;
        }
    })
}

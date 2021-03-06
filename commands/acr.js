const discord = require("discord.js")
exports.run = async (client, message, args) => {
    let msg
    msg = await message.channel.send("Möchtest du einen Gif Befehl oder einen Text Befehl erstellen/erweitern?")
    let coll
    let action
    let command
    let responsestring
    let usr
    let index = 0
    msg.react("🇬")
    msg.react("🇹")
    msg.react("❌")
    let collector = msg.createReactionCollector((reaction, user) => user == message.author, { time: 30000 })
    collector.on("collect", async (reaction, user) => {
        switch (reaction.emoji.name) {
            case "🇬":
                action = "g"
                msg = await msg.edit("Welchen Gif Befehl möchtest du hinzufügen/bearbeiten?")
                coll = await msg.channel.createMessageCollector((m) => m.author == message.author, { time: 60000 })
                break;
            case "🇹":
                action = "t"
                msg = await msg.edit("Welchen Textbefehl möchtest du erstellen/erweitern?")
                coll = await msg.channel.createMessageCollector((m) => m.author == message.author, { time: 60000 })
                break;
            case "❌":
                if (coll && !coll.ended) coll.stop()
                collector.end()
                message.channel.send("Vorgang abgebrochen")
                break;
            default:
                break;
        }
        coll.on("collect", (collected) => {
            index++
            switch (index) {
                case 1:
                    switch (action) {
                        case "g":
                            command = collected.content.toLowerCase()
                            if (client.gifs.has(command)) {
                                message.channel.send("Nun den Link zum Gif das du hinzufügen möchtest")
                                limit = 2
                            } else {
                                message.channel.send("Welcher Text soll im Embed stehen? (@s wird mit dem Nutzernamen der Person ersetzt, die den Befehl ausführt - @o mit dem Rest der Nachricht, wenn der Befehl ausgeführt wird)")
                                limit = 3
                            }
                            break;
                        case "t":
                            command = collected.content.toLowerCase()
                            if (client.responses.has(command)) {
                                message.channel.send("Für wen möchtest du eine Antwort hinzufügen? (`default` um alle weiteren Nutzer auszuwählen? (NutzerID)")
                                limit = 3
                            } else {
                                message.channel.send("Bitte nun die erste Antwort, die für alle gilt")
                                limit = 2
                            }
                            break;
                        default:
                            client.logger.warn(action, "This is not normal!")
                            break;
                    }
                    break;
                case 2:
                    switch (action) {
                        case "g":
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
                        case "t":
                            switch (limit) {
                                case 2:
                                    responsestring = collected.content
                                    client.responses.set(command, [responsestring], "default")
                                    coll.stop()
                                    break;
                                case 3:
                                    if (collected.content.includes(" ")) {
                                        usr = collected.content.split(" ")[0]
                                    } else {
                                        usr = collected.content
                                    }
                                    message.channel.send("Nun noch die neue Antwort")
                                    break;
                            }
                            break;
                        default:
                            client.logger.warn("Unknown Action:", action)
                            break;
                    }
                    break;
                case 3:
                    switch (action) {
                        case "g":
                            client.gifs.set(command, { "responsestring": responsestring, "gifs": [collected.content] })
                            break;
                        case "t":
                            responsestring = collected.content
                            if (client.responses.has(command, usr)) {
                                client.responses.push(command, responsestring, usr)
                            } else {
                                client.responses.set(command, [responsestring], usr)
                            }
                            break;
                        default:
                            client.logger.warn("unknown action:", action)
                            break;
                    }
                    coll.stop()
                    break;
                default:
                    break;
            }
        })
    })
}

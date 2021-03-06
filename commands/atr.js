const discord = require("discord.js")
exports.run = async (client, message, args) => {
    let msg
    let coll
    let command
    let responsestring
    let usr
    let index = 0
    msg = await message.channel.send("Welchen Textbefehl möchtest du erstellen/erweitern?")
    coll = await msg.channel.createMessageCollector((m) => m.author == message.author, { time: 60000 })
    coll.on("collect", (collected) => {
        index++
        switch (index) {
            case 1:
                command = collected.content.toLowerCase()
                if (client.responses.has(command)) {
                    message.channel.send("Für wen möchtest du eine Antwort hinzufügen? (`default` um alle weiteren Nutzer auszuwählen? (NutzerID)")
                    limit = 3
                } else {
                    message.channel.send("Bitte nun die erste Antwort, die für alle gilt")
                    limit = 2
                }
                break;
            case 2:
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
            case 3:
                responsestring = collected.content
                if (client.responses.has(command, usr)) {
                    client.responses.push(command, responsestring, usr)
                } else {
                    client.responses.set(command, [responsestring], usr)
                }
                coll.stop()
                break;
            default:
                break;
        }
    })
}

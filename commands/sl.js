const { Client, MessageEmbed } = require("discord.js");
exports.run = (client, message, args) => {
    client.logger.debug("Input: " + args.join(' '))
    if (args) {
        if (args[0].indexOf("$") != 0) {
            var sl = true
        } else {
            var sl = false
        }
    } else {
        if (message.attachments.size > 1) {
            var sl = true;
        } else {
            message.delete()
            message.author.send("Du musst entweder eine Nachricht oder einen Anhang hinzufügen")
        }
    }
    var clean = args[0].slice().toLowerCase()
    client.logger.debug(clean)
    var count = 0
    var npc = ""
    while (args[0].indexOf("$") == 0) {
        npc = npc + args.shift()
        count = count + 1
    }
    client.logger.debug("Npc: " + npc)
    if (client.dsachars.has(clean)) {
        var displayName = client.dsachars.get(clean, "name")
        var displayImg = client.dsachars.get(clean, "img")
    } else {
        var i = 0
        while (i < count) {
            var npc = npc.replace("$", " ")
            i = i + 1
        }
        var displayName = npc.substr(1)
    } if (sl) {
        var displayName = "Spielleiter"
        var displayImg = "https://cdn.discordapp.com/attachments/539810828350914570/541700275623297064/image0.png"
    }
    client.logger.debug("resolved to: " + displayName)
    message.channel.createWebhook(displayName, displayImg).then(npc => {
        if (message.attachments.size == 0) {
            npc.send(args.join(" "))
            npc.delete()
            message.delete()
        } else {
            let attarr = [];
            message.attachments.forEach(a => { 
                attarr.push(a.url)
            })
            npc.send(args.join(" "), { files: attarr }).then(msg => {
                npc.delete()
                message.delete()
            })
        }
    })
}

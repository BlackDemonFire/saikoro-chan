//load dependencies
const discord = require("discord.js")
const enmap = require("enmap")
const fs = require("fs")
//generate client object and load persistent data
const client = new discord.Client();
client.config = require("./config.json");
Object.assign(client, enmap.multi(["dsachars", "responses", "gifs", "gifcolors", "variables"]));
client.commands = new enmap()
require("./modules/random.js")(client)
require("./modules/logger.js")(client)
//load events
fs.readdir("./events/", (err, files) => {
    if (err) return client.logger.error(err)
    files.forEach(file => {
        if (!file.endsWith(".js")) return
        const event = require(`./events/${file}`)
        const eventName = file.split(".")[0]
        client.on(eventName, event.bind(null, client))
    })
})
//load commands
fs.readdir("./commands/", (err, files) => {
    if (err) return client.logger.error(err)
    files.forEach(file => {
        if (!file.endsWith(".js")) return
        const command = require(`./commands/${file}`)
        const commandName = file.split(".")[0]
        client.logger.loadcmd(commandName)
        client.commands.set(commandName, command)
    })
})
//add random responses
client.responses.forEach((value, key) => {
    client.commands.set(key, require("./modules/randomresponse.js"))
})
client.responses.changed((key, old, updated) => {
    if (old == null) {
        if (client.commands.has(key)) {
            client.logger.error(`attempting to add random response conflicting with command ${key}`)
        } else {
            client.commands.set(key, require("./modules/randomresponse.js"))
        }
    }
    if (updated == null) {
        if (client.commands.has(key) && client.commands.get(key) == require("./modules/randomresponse.js")) {
            client.commands.delete(key)
        }
    }
})
//add gif commands
client.gifs.forEach((value, key) => {
    client.commands.set(key, require("./modules/gifcommand.js"))
})
client.gifs.changed((key, old, updated) => {
    client.logger.debug(key, old, updated)
    if (old == null) {
        if (client.commands.has(key)) {
            client.logger.error(`attempting to load gif command conflicting with the existing command ${key}`)
        } else {
            client.commands.set(key, require("./modules/gifcommand.js"))
        }
    }
    if (updated == null) {
        if (client.commands.has(key) && client.commands.get("./modules/gifcommand.js")) {
            client.commands.delete(key)
        }
    }
})
//login
client.login(client.config.token)

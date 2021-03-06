exports.run = async (client, message, args) => {
    let strarr = ["Leider ist er so klein, dass der Bannhammer ihn nicht erwischt hat.", "Bl4cky hat Spaß"]
    client.variables.ensure("lastban", 0)
    client.variables.ensure("bangalador", 23)
    if (message.author.id == "400016829960945674") {
        if (Date.now() - client.variables.get("lastban") < 86400000) {
            client.variables.set("lastban", Date.now())
            client.variables.inc("bangalador")
            let str = await client.random.choice(strarr)
            message.channel.send(`<@400016829960945674> wurde bereits ${client.variables.get("bangalador")} mal gebannt. ${str}`)
        }
    } else {
        client.variables.inc("bangalador")
        let str = await client.random.choice(strarr)
        message.channel.send(`<@400016829960945674> wurde bereits ${client.variables.get("bangalador")} mal gebannt. ${str}`)
    }
}

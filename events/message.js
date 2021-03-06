module.exports = (client, message) => {
  client.logger.message(message)
  /*if (!message.content) return
  if (!message.content.startsWith(client.config.prefix)) return
  let args = message.content.slice(client.config.prefix.length).trim().split(" ")
  const cmd = args.shift().toLowerCase()
  const command = client.commands.get(cmd)
  if (command) {
    command.run(client, message, args)
    client.logger.command(message, cmd)
  }*/
}

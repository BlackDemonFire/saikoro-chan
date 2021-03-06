exports.run = async (client, message, args) => {
  const msgargs = message.content.split(" ")
  let cmd
  if (message.content.includes(" ")) {
    cmd = args[0].slice(client.config.prefix.length).toLowerCase()
  } else {
    cmd = message.content.slice(client.config.prefix.length).toLowerCase()
  }
  let options
  options = client.responses.get(cmd, message.author.id)
  if (!options) options = client.responses.get(cmd, "default")
  if (options) {
    const choice = await client.random.choice(options)
    message.channel.send(choice)
  }
}

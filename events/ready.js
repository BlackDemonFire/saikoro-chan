module.exports = async (client) => {
  client.logger.log(client.user.username+" is ready")
  client.apk = await client.fetchApplication()
}

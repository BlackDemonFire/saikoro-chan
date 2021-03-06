const chalk = require("chalk")
class Logger {
    constructor(loggingoptions) {
        this.logopts = loggingoptions
    }
    message(message) {
        if (!this.logopts.message) return;
        console.log(`${chalk.blue(message.author.tag)} [${chalk.cyan(message.channel.name)}]: ${chalk.magenta(message.content)}`)
    }
    debug(...args) {
        if (!this.logopts.debug) return;
        console.info(chalk.gray(...args))
    }
    command(message, commandName) {
        if (!this.logopts.command) return
        console.log(chalk.grey(message.author.username) + " executed " + chalk.cyan(commandName) + " in " + chalk.green(message.channel.name))
    }
    loadcmd(commandName) {
        if (!this.logopts.loadcommand) return
        console.log(chalk.green(`loaded command ${commandName}`))
    }
    log(...args) {
        if (!this.logopts.log) return
        console.log(chalk.blueBright(...args))
    }
    warn(...args) {
        if (!this.logopts.warn) return
        console.warn(chalk.yellow(...args))
    }
    error(...args) {
        if (!this.logopts.error) return;
        console.error(chalk.red(...args))
    }
}
module.exports = (client) => {
    client.logger = new Logger(client.config.logging)
}
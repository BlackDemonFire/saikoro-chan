import Client from "bot";
import { Message, MessageEmbed } from "discord.js";
import { Command } from "../modules/command";

export default class Help extends Command {
    constructor(client: Client) {
        super(client);
    }
    help = {
        show: true,
        name: "help",
        usage: `${this.prefix}help [command]`,
        category: "Utility",
        description: "Zeige alle verfügbaren Befehle an oder lass sie dir erklären"
    }
    run(client: Client, message: Message, args: string[]) {
        const embed = new MessageEmbed();
        if (args && args[0]) {
            var cmd = args[0];
            if (cmd.startsWith(client.config.prefix)) cmd = cmd.slice(client.config.prefix.length).toLowerCase();
            var command = client.commands.get(cmd);
            if (command) {
                embed.setDescription(command.help.description)
                    .setFooter(command.help.category)
                    .setTitle(command.help.name)
                    .setAuthor("Help")
                    .addField("Nutzung", command.help.usage)
                    .addField("Nutzung", "[optional], <notwendig>");
            } else {
                embed.setDescription("Der Befehl `" +  args[0] + "` wurde nicht gefunden.");
            }
        } else {
            var categories = [];
            client.commands.map((cmd, _name) => {
                if (!cmd.help.show) return;
                if (!categories[cmd.help.category]) {
                    categories[cmd.help.category] = [cmd.help.name];
                } else {
                    categories[cmd.help.category].push(cmd.help.name);
                }
            })
            for (const category in categories) {
                embed.addField(category, categories[category].join(", "));
            }
            embed.setTitle("Help");
        }
        message.channel.send(embed);
    }
}
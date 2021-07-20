import Client from "bot";
import { Message, MessageEmbed, Permissions } from "discord.js";
import { Command } from "../modules/command";

export default class Link extends Command {
    constructor(client: Client) {
        super(client);
    }
    async run(client: Client, message: Message, args: string[]) {
        const embed: MessageEmbed = new MessageEmbed()
            .setTitle("Links")
            .setDescription(`[Invite](${await client.generateInvite({ permissions: Permissions.ALL })})\n[GitHub](https://github.com/BlackDemonFire/saikoro-chan.git)`)
            .setColor(0xaa7777);
        message.channel.send(embed);
    }
    help = {
        show: true,
        name: "link",
        usage: `${this.prefix}link`,
        category: "Utility",
        description: "Zeigt nützliche links"
    }
}
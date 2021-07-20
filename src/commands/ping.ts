import Client from "bot"
import { Message, MessageEmbed } from "discord.js"
import { Command } from "../modules/command"
export default class Ping extends Command {
    constructor(client: Client) {
        super(client)
    }
    help = {
        show: true,
        name: "ping",
        usage: `${this.prefix}ping`,
        category: "Utility",
        description: "Zeigt die Latenz vom Bot"
    }
    async run(client: Client, message: Message, args: string[]) {
        //code
        const embed = new MessageEmbed();

        if (super.isAprilFools()) {
            embed.setColor(0x7289DA)
                .setDescription(message.author.toString())
                .setAuthor("Ping: @" + (message.channel.type == "text" ? message.member.displayName : message.author.username))
                .setFooter(`@${message.channel.type == "text" ? message.member.displayName : message.author.username}`);
            message.channel.send(message.author.toString(), embed);
        } else {
            const msg: Message | nil = await message.channel.send(client.emojis.resolve("498280749271744512") + " Ping?").catch(console.error);
            if (!msg) return;
            embed.setColor(0x7289DA)
                .setDescription("Die API Latenz beträgt " + Math.round(client.ws.ping) + "ms.")
                .setAuthor("Die Latenz beträgt " + (msg.createdTimestamp - message.createdTimestamp) + "ms.")
                .setFooter("@" + message.author.username);
            msg.edit("<:check_4:498523284804075541> Pong!", embed);
        }
    }
}
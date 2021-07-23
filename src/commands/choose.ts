import Client from "bot";
import { Message, MessageEmbed } from "discord.js";
import { Command } from "../modules/command";

export default class Choose extends Command {
    constructor(client: Client) {
        super(client);
    }
    help = {
        show: true,
        name: "choose",
        usage: `${this.prefix}choose <Frage>`,
        category: "Utility",
        description: "Die einfache Entscheidungshilfe"
    };
    run = async (client: Client, message: Message, args: string[]) => {
        if (!args || args.length < 1) {
            return message.channel.send("Welche Frage soll ich beantworten?");
        }
        var text = args.join(" ");
        if (!text.includes("oder")) return message.channel.send("Du hast nur eine option angegeben.");
        var opts = text.split(" oder ");
        if (opts.length!==2) return message.channel.send("Nur ein oder ist erlaubt.")
        var last = opts[1];
        opts = (opts[0].split(", "));
        opts.push(last);
        var res: number = await client.random.int(0, opts.length -1);
        let resp: string = opts[res];
        const embed: MessageEmbed = new MessageEmbed()
            .setColor(0x292f33)
            .setDescription(`Ich wähle \`${resp}\``)
            .setFooter("@" + message.author.username);
        message.channel.send("*" + "„" + args.join(" ") + "“" + "*", embed);
    };
}
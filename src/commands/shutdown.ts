import Client from "bot";
import { Message, MessageEmbed } from "discord.js";
import { Command } from "../modules/command";

export default class Kill extends Command {
    constructor(client: Client) {
        super(client);
    }
    help = {
        show: false,
        name: "shutdown",
        usage: `${this.prefix}shutdown`,
        category: "Owner only",
        description: "Fährt den Bot herunter."
    }
    async run(client: Client, message: Message, args: string[]) {
        if (!super.isOwner(message)) return message.channel.send("Du hast keine Rechte!");
        if (message !== null) {
            const plaintext = "Der Bot wird heruntergefahren.";
            const embed = new MessageEmbed()
                .setImage("https://i.imgflip.com/19f1vf.jpg")
                .setColor(0x36393E)
                .setFooter("@" + message.author.username);
            await message.channel.send(plaintext, embed);
        }
        console.log("stopping bot...");
        client.destroy();
        process.exit();
    }
}
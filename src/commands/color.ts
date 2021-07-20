import Client from "bot";
import { Message } from "discord.js";
import { Command } from "../modules/command";

export default class color extends Command {
    constructor(client: Client) {
        super(client)
    }
    run(client: Client, message: Message, args: string[]) {
        let color: string;
        if (args && args.length > 0) {
            color = args[0];
        } else {
            color = "RANDOM";
        }
        client.db.setcolor(message.author, color);
        message.channel.send("Deine Farbe wurde geändert.");
    }
    help = {
        show: true,
        name: "color",
        usage: `${this.prefix}color [color]`,
        category: "gifs",
        description: "Ändere deine Embed Farbe (Keine Angabe führt zu zufälligen Farben.)"
    }
}
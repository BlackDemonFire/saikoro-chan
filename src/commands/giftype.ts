import Client from "bot";
import { Message } from "discord.js";
import { Command } from "../modules/command";

export default class Giftype extends Command {
    constructor(client: Client) {
        super(client)
    }
    run(client: Client, message: Message, args: string[]) {
        let giftype: string = args[0].toLowerCase();
        var types = ["anime"];
        if (!(types.includes(giftype))) {
            var typesstring
            switch (types.length) {
                case 1:
                    typesstring = types[0]
                    break;
                case 2:
                    typesstring = types.join(` und `)
                default:
                    break;
            }
            return message.channel.send("Folgende Typen sind verfügbar: " + typesstring);
        }
        client.db.setgiftype(message.author, giftype);
    }
    help = {
        show: true,
        name: "giftype",
        usage: `${this.prefix}giftype <type>`,
        category: "gifs",
        description: "Ändere den Typ an gifs der für dich ausgewählt ist"
    }
}
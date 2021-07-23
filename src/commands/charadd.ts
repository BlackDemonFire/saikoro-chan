import Client from "bot";
import { Message } from "discord.js";
import { Command } from "../modules/command";
export default class Charadd extends Command {
    constructor(client: Client) {
        super(client);
    }
    help = {
        show: false,
        name: "charadd",
        usage: `${this.prefix}charadd <character> [avatar - if it doesn't start with \`http\`, it will be ignored.] <displayed name>`,
        category: "roleplay",
        description: "Füge einen NPC hinzu."
    };
    run = (client: Client, message: Message, args: string[]) => {
        if (!args || args.length <= 3) return message.channel.send("du musst drei Argumente angeben:\n1. den Kürzel\n2. den Link für das Profilbild\n3. den Namen, den der NPC annehmen soll");
        let pref: string = args.shift().slice().toLowerCase();
        let img: string = args[0].includes("http") ? args.shift() : "";
        let name: string = args.join(" ");
        client.db.newDSAChar(pref, name, img);
        message.channel.send(`Der Charakter \`${pref}\` wurde erfolgreich hinzugefügt.`);
    };
}
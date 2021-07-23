import Client from "bot";
import { Message } from "discord.js";
import { Command } from "../modules/command";

export default class Name extends Command {
    constructor(client: Client) {
        super(client);
    }
    run(client: Client, message: Message, args: string[]) {
        let newname: string;
        if (!args || args == []) {
            newname = "";
        } else {
            newname = args.join(" ");
        }
        client.db.setname(message.author, newname);
        message.channel.send(newname === "" ? "Dein Name wurde zurückgesetzt" : `Dein Name wurde zu \`${newname}\` geändert.`);
    }
    help = {
        show: true,
        name: "name",
        usage: `${this.prefix}name [name]`,
        category: "gifs",
        description: "Ändere den Namen, der in Embeds angezeigt wird (keine Angabe resultiert im Nickname/Username)"
    };
}
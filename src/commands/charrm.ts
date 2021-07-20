import Client from "bot";
import { Message } from "discord.js"
import { Command } from "../modules/command"
export default class Charrm extends Command {
    constructor(client: Client) {
        super(client)
    }
    help = {
        show: false,
        name: "charrm",
        usage: `${this.prefix}charrm <character>`,
        category: "dsa",
        description: "Lösche einen eingetragenen Character"
    }
    run(client: Client, message: Message, args: string[]) {
        let pref: string = args.shift().slice().toLowerCase();
        if (!client.db.getDSAChar(pref)) return message.channel.send(`Ich kenne keinen Charakter \`${pref}\`.`);
        client.db.deleteDSAChar(pref);
        message.channel.send(`Der Charakter \`${pref}\` wurde erfolgreich gelöscht.`);
    }
}
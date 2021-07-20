import Client from "bot";
import { Message } from "discord.js"
import { Command } from "../modules/command"
export default class Dsarm extends Command {
    constructor(client: Client) {
        super(client)
    }
    help = {
        show: true,
        name: "dsarm",
        usage: `${this.prefix}dsarm <character>`,
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
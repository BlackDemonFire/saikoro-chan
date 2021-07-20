import Client from "bot";
import { Collection, DMChannel, Message, MessageCollector, Snowflake, TextChannel } from "discord.js"
import { Command } from "../modules/command";

export default class New extends Command {
    constructor(client: Client) {
        super(client)
    }
    help = {
        show: true,
        name: "new",
        usage: `${this.prefix}new`,
        category: "dsa",
        description: "Füge einen neuen Character hinzu"
    }
    run(client: Client, message: Message, args: string[]) {
        var i = 0;
        var collector: MessageCollector;
        var av: string;
        var pref: string;
        message.channel.send("Bitte nenne den Kürzel für den Charakter");
        if (message.channel instanceof DMChannel || message.channel instanceof TextChannel) {
            collector = new MessageCollector(message.channel, (m: Message) => m.author.id === message.author.id, { time: 50000 });
            collector.on("end", (msgs: Collection<Snowflake, Message>) => { if (msgs.size == 0) return message.channel.send("Du hast zu viel Zeit benötigt.") });
            collector.on("collect", (msg: Message) => {
                if (i > 2) {
                    collector.stop();
                } else {
                    i = i + 1;
                }
                switch (i) {
                    case 1:
                        pref = msg.content.toLowerCase().split(' ')[0];
                        msg.channel.send("Jetzt bitte den Link zum Avatar des Charakters, sonst bitte mit `n` antworten");
                        if (!pref.startsWith("$")) pref = "$" + pref;
                        console.log(pref);
                        break;
                    case 2:
                        if (msg.content === 'n') {
                            av = '';
                        } else {
                            av = msg.content;
                        }
                        console.log("av", av);
                        msg.channel.send("zuletzt bitte noch den Namen des Charakters");
                        break;
                    case 3:
                        var name = msg.content;
                        collector.stop();
                        msg.channel.send(`Der Charakter \`${name}\` wird mit dem Prefix \`${pref}\` eingespeichert!`)
                        client.db.newDSAChar(pref, name, av);
                        break;
                }
            })
        }
    }
}
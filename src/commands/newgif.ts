import Client from "bot";
import { Collector, DMChannel, Message, MessageReaction, ReactionCollector, Snowflake, Team, User } from "discord.js";
import { Command } from "../modules/command";

export default class Newgif extends Command {
    constructor(client: Client) {
        super(client);
    }
    async run(client: Client, message: Message, args: string[]) {
        var response: string;
        if (!args || args.length !== 3) {
            response = "Du musst drei Argumente angeben:\n1. Den Link zum Gif\n2. Die Aktion, die ausgeführt wird (z.B. `hug`)\n3. Das Gif Genre (z.B. `Anime`)";
        } else {
            let url: string = args[0];
            let action: string = args[1].toLowerCase();
            let type: string = args[2].toLowerCase();
            if (!type || type == "") type = "anime";
            if (this.isOwner(message)) {
                client.db.newgif(url, action, type);
                response = "Das Gif wurde erfolgreich hinzugefügt.";
            } else {
                response = "Ich habe die Anfrage, das Gif hinzuzufügen an meinen Meister weitergeleitet.";
                if (client.application.owner instanceof Team) {
                    var requestmessages: Record<Snowflake, Message> = {};
                    var collectors: Record<Snowflake, ReactionCollector> = {};
                    function onCollect(reaction: MessageReaction, user: User) {
                        if (!(client.application.owner instanceof Team)) return;
                        switch (reaction.emoji.name) {
                            case "✅":
                                client.db.newgif(url, action, type);
                                for (const [memberid, _member] of client.application.owner.members) {
                                    collectors[memberid].stop();
                                    requestmessages[memberid].edit(`Gif check request from ${message.author.tag} in <#${message.channel.id}> (${message.channel instanceof DMChannel ? "DM" : message.channel.name})\ngif: ${url}\naction: ${action}\ntype: ${type}\n\naccepted!`);
                                }
                                break;
                            case "❌":
                                for (const [memberid, _member] of client.application.owner.members) {
                                    collectors[memberid].stop();
                                    requestmessages[memberid].edit(`Gif check request from ${message.author.tag} in <#${message.channel.id}> (${message.channel instanceof DMChannel ? "DM" : message.channel.name})\ngif: ${url}\naction: ${action}\ntype: ${type}\n\nrejected!`);
                                }
                                break;
                            default:
                                break;
                        }
                    }
                    for (const [memberid, member] of client.application.owner.members) {
                        requestmessages[memberid] = await member.user.send(`Gif check request from ${message.author.tag} in <#${message.channel.id}> (${message.channel instanceof DMChannel ? "DM" : message.channel.name})\ngif: ${url}\naction: ${action}\ntype: ${type}`);
                        await requestmessages[memberid].react("✅");
                        await requestmessages[memberid].react("❌");
                        collectors[memberid] = await requestmessages[memberid].createReactionCollector((reaction: MessageReaction, user: User) => user == member.user).on("collect", onCollect);
                    }
                } else if (client.application.owner instanceof User) {
                    var request = await client.application.owner.send(`Gif check request from ${message.author.tag} in <#${message.channel.id}> (${message.channel instanceof DMChannel ? "DM" : message.channel.name})\ngif: ${url}\naction: ${action}\ntype: ${type}`);
                    await request.react("✅");
                    await request.react("❌");
                    var coll = request.createReactionCollector((reaction: MessageReaction, user: User) => user == client.application.owner);
                    coll.on("collect", (reaction: MessageReaction, user: User) => {
                        switch (reaction.emoji.name) {
                            case "✅":
                                client.db.newgif(url, action, type);
                                coll.stop();
                                request.delete();
                                break;
                            case "❌":
                                coll.stop();
                                request.delete();
                                break;
                            default:
                                break;
                        }
                    })
                }
            }
        }
        message.channel.send(response);
    }
    help = {
        show: true,
        name: "newgif",
        usage: `${this.prefix}newgif <url> <command> [type (defaults to anime)]`,
        category: "gifs",
        description: "Fügt ein neues Gif zur Datenbank hinzu"
    }
}
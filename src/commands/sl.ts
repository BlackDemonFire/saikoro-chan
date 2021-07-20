import Client from "bot";
import { DMChannel, Message, TextChannel, Webhook } from "discord.js";
import { Command } from "../modules/command";
export default class Sl extends Command {
    constructor(client: Client) {
        super(client);
    }
    help = {
        show: true,
        name: "sl",
        usage: `${this.prefix}sl [character] <message>`,
        category: "sl",
        description: "Spiele einen Character"
    }
    async run(client: Client, message: Message, args: string[]) {
        if (message.channel instanceof DMChannel) return message.channel.send("Dieser Befehl ist nicht in Direktnachrichten verfügbar.");
        if (!message.channel.permissionsFor(message.guild.me).has(["MANAGE_MESSAGES", "MANAGE_WEBHOOKS"])) return message.channel.send("Um diesen Befehl ausführen zu können muss ich die Berechtigungen zum verwalten von Nachrichten und Webhooks haben.");
        if (args && args[0]) {
            if (!args[0].startsWith("$")) {
                var sl = true;
            } else {
                var sl = false;
            }
        } else {
            if (message.attachments.size > 1) {
                var sl = true;
            } else {
                message.delete();
                message.author.send("Du musst eine Nachricht senden.");
            }
        }
        var clean = args[0].slice().toLowerCase();
        console.log(clean);
        var count = 0;
        var npc: string = "";
        var displayName: string;
        var displayImg: string;
        while (args[0].indexOf("$") == 0) {
            npc = npc + args.shift();
            count = count + 1;
        }
        var char = client.db.getDSAChar(clean);
        if (char) {
            displayName = char.displayname;
            displayImg = char.avatar;
        } else {
            var i = 0
            while (i < count) {
                var npc = npc.replace("$", " ");
                i = i + 1;
            }
            displayName = npc.substr(1);
        }
        if (sl) {
            displayName = "Spielleiter";
            displayImg = "https://cdn.discordapp.com/icons/790938544293019649/d0843b10f5e7dabd10ebbea93acfca28.webp";
        }
        if (message.channel instanceof TextChannel) {
            var webhook: Webhook = await message.channel.createWebhook(displayName, { avatar: displayImg })
            if (message.attachments.size == 0) {
                await webhook.send(args.join(" "));
                webhook.delete();
                message.delete();
            } else {
                let attarr = [];
                message.attachments.forEach(a => { attarr.push(a.url) });
                await webhook.send(args.join(" "), { files: attarr });
                webhook.delete();
                message.delete();
            }
        }
    }
}
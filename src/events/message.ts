import { Message } from "discord.js";
import Client from "../bot";

function cmd(client: Client, message: Message) {
    let args = message.content.slice(client.config["prefix"].length).trim().split(" ");
    const cmd = args.shift()?.toLowerCase();
    if (!cmd) return;
    const command = client.commands.get(cmd);
    if (!command) return;
    command.run(client, message, args);
}


export function event(client: Client, message: Message) {
    if (message.author.bot) return;
    client.db.newuser(message.author);
    if (message.content.startsWith(client.config.prefix)) {
        try {
            cmd(client, message);
        } catch(e) {
            console.error(e);
        }
    }
}
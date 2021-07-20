import Client from "bot";
import { Message, MessageEmbed } from "discord.js";
import { GifCommand } from "../modules/command";

export default class Cry extends GifCommand {
    constructor(client: Client) {
        super(client);
    }
    help = {
        show: true,
        name: "cry",
        usage: `${this.prefix}cry`,
        category: "gifs",
        description: "Weinen"
    }
    async run(client: Client, message: Message, args: string[]) {
        var gif: string = client.db.getgif("cry", client.db.getgiftype(message.author));
        var userA: string = client.db.getname(message.author);
        var color: string = client.db.getcolor(message.author);
        if (userA == "") userA = message.guild ? message.member.displayName : message.author.username;
        var userB: string = await super.parseUser(client, message, args);
        var responseString: string | nil = await client.random.choice([
            "{a} weint...",
            "Brauchst du eine Umarmung {a}?"
        ]);
        if (!responseString) return;
        var embed = new MessageEmbed()
            .setImage(gif)
            .setAuthor("cry")
            .setDescription(responseString.replace(/{a}/g, userA))
            .setColor(color);
        message.channel.send(embed);
    }
}
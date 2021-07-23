import Client from "bot";
import { Message, MessageEmbed } from "discord.js";
import { GifCommand } from "../modules/command";

export default class Purr extends GifCommand {
    constructor(client: Client) {
        super(client);
    }
    help = {
        show: true,
        name: "purr",
        usage: `${this.prefix}purr`,
        category: "gifs",
        description: "Purr"
    };
    async run(client: Client, message: Message, args: string[]) {
        var gif: string = client.db.getgif("purr", client.db.getgiftype(message.author));
        var userA: string = client.db.getname(message.author);
        var color: string = client.db.getcolor(message.author);
        if (userA == "") userA = message.guild ? message.member.displayName : message.author.username;
        var responseString: string | nil = await client.random.choice([
            "{a} schnurrt~ Nya Nya~",
            "{a} schnurrt"
        ]);
        if (!responseString) return;
        var embed = new MessageEmbed()
            .setImage(gif)
            .setAuthor("purr")
            .setDescription(responseString.replace(/{a}/g, userA))
            .setColor(color);
        message.channel.send(embed);
    }
}
import { Message, MessageEmbed } from "discord.js";
import Client from "../bot";
import { GifCommand } from "../modules/command";

export default class Blush extends GifCommand {
    constructor(client: Client) {
        super(client);
    }
    help = {
        show: true,
        name: "blush",
        usage: `${this.prefix}blush`,
        category: "gifs",
        description: "rot werden"
    }
    async run(client: Client, message: Message, args: string[]) {
        var gif: string = client.db.getgif("blush", client.db.getgiftype(message.author));
        var userA: string = client.db.getname(message.author);
        var color: string = client.db.getcolor(message.author);
        if (userA == "") userA = message.member ? message.member.displayName : message.author.username;
        var responseString: string | nil = await client.random.choice(["{a} wird rot",
            "{a}s Gesicht ist rot.",
            "{a} wird rot. So cute >w<"]);
        if (!responseString) return;
        var embed = new MessageEmbed()
            .setImage(gif)
            .setAuthor("blush")
            .setDescription(responseString.replace(/{a}/g, userA))
            .setColor(color);
        message.channel.send(embed);
    }
}
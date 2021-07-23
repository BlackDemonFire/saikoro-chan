import Client from "bot";
import { Message, MessageEmbed } from "discord.js";
import { GifCommand } from "../modules/command";

export default class Pat extends GifCommand {
    constructor(client: Client) {
        super(client);
    }
    help = {
        show: true,
        name: "pat",
        usage: `${this.prefix}pat [user]`,
        category: "gifs",
        description: ""
    };
    async run(client: Client, message: Message, args: string[]) {
        var gif: string = client.db.getgif("pat", client.db.getgiftype(message.author));
        var userA: string = client.db.getname(message.author);
        var color: string = client.db.getcolor(message.author);
        if (userA == "") userA = message.guild ? message.member.displayName : message.author.username;
        var userB: string = await super.parseUser(client, message, args);
        if (userB == "") {
            var responseString: string | nil = await client.random.choice([
                "Möchtest du gestreichelt werden {a}?"
            ]);
        } else {
            responseString = await client.random.choice([
                "{a} streichelt {b}",
                "{a} streichelt {b}. Cuuute!",
                "{a} streichelt {b}. Süß 🥺",
                "{a} gibt {b} headpats :3"
            ]);
        }
        if (!responseString) return;
        var embed = new MessageEmbed()
            .setImage(gif)
            .setAuthor("pat")
            .setDescription(responseString.replace(/{a}/g, userA).replace(/{b}/g, userB))
            .setColor(color);
        message.channel.send(embed);
    }
}
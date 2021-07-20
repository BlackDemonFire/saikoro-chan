import Client from "bot";
import { Message, MessageEmbed } from "discord.js";
import { GifCommand } from "../modules/command";

export default class Cuddle extends GifCommand {
    constructor(client: Client) {
        super(client);
    }
    help = {
        show: true,
        name: "cuddle",
        usage: `${this.prefix}cuddle [user]`,
        category: "gifs",
        description: "Mit jemandem kuscheln"
    }
    async run(client: Client, message: Message, args: string[]) {
        var gif: string = client.db.getgif("cuddle", client.db.getgiftype(message.author));
        var userA: string = client.db.getname(message.author);
        var color: string = client.db.getcolor(message.author);
        if (userA == "") userA = message.guild ? message.member.displayName : message.author.username;
        var userB: string = await super.parseUser(client, message, args);
        if (userB == "") {
            var responseString: string | nil = await client.random.choice([
                "Soll ich mit dir kuscheln {a}? 🥺",
                "Brauchst du jemanden zum kuscheln {a}?"
            ]);
        } else {
            responseString = await client.random.choice([
                "{a} kuschelt mit {b}",
                "{a} kuschelt mit {b} - cute",
                "{a} kuschelt sich an {b}"
            ]);
        }
        if (!responseString) return;
        var embed = new MessageEmbed()
            .setImage(gif)
            .setAuthor("cuddle")
            .setDescription(responseString.replace(/{a}/g, userA).replace(/{b}/g, userB))
            .setColor(color);
        message.channel.send(embed);
    }
}
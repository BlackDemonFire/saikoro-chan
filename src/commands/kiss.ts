import Client from "bot";
import { Message, MessageEmbed } from "discord.js";
import { GifCommand } from "../modules/command";

export default class Kiss extends GifCommand {
    constructor(client: Client) {
        super(client);
    }
    help = {
        show: true,
        name: "kiss",
        usage: `${this.prefix}kiss [user]`,
        category: "gifs",
        description: "Jemanden küssen"
    };
    async run(client: Client, message: Message, args: string[]) {
        var gif: string = client.db.getgif("kiss", client.db.getgiftype(message.author));
        var userA: string = client.db.getname(message.author);
        var color: string = client.db.getcolor(message.author);
        if (userA == "") userA = message.guild ? message.member.displayName : message.author.username;
        var userB: string = await super.parseUser(client, message, args);
        if (userB == "") {
            var responseString: string | nil = await client.random.choice([
                "Soll ich dich küssen {a} 🥺"
            ]);
        } else {
            responseString = await client.random.choice([
                "{a} küsst {b}",
                "{a} küsst {b} 🥺",
                "{a} küsst {b} 😊"
            ]);
        }
        if (!responseString) return;
        var embed = new MessageEmbed()
            .setImage(gif)
            .setAuthor("kiss")
            .setDescription(responseString.replace(/{a}/g, userA).replace(/{b}/g, userB))
            .setColor(color);
        message.channel.send(embed);
    }
}
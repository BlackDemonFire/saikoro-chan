import Client from "bot";
import { Message, MessageEmbed } from "discord.js";
import { GifCommand } from "../modules/command";

export default class Hold extends GifCommand {
    constructor(client: Client) {
        super(client);
    }
    help = {
        show: true,
        name: "hold",
        usage: `${this.prefix}hold [user]`,
        category: "gifs",
        description: "Mit jemandem Händchen halten"
    }
    async run(client: Client, message: Message, args: string[]) {
        var gif: string = client.db.getgif("handhold", client.db.getgiftype(message.author));
        var userA: string = client.db.getname(message.author);
        var color: string = client.db.getcolor(message.author);
        if (userA == "") userA = message.guild ? message.member.displayName : message.author.username;
        var userB: string = await super.parseUser(client, message, args);
        if (userB == "") {
            var responseString: string | nil = await client.random.choice([
                "Ich werde deine Hand halten, {a} 🥺",
                "Soll ich deine Hand halten, {a}?"
            ]);
        } else {
            responseString = await client.random.choice([
                "{a} hält mit {b} Händchen 😊"
            ]);
        }
        if (!responseString) return;
        var embed = new MessageEmbed()
            .setImage(gif)
            .setAuthor("hold")
            .setDescription(responseString.replace(/{a}/g, userA).replace(/{b}/g, userB))
            .setColor(color);
        message.channel.send(embed);
    }
}
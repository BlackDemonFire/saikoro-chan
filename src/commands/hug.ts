import Client from "bot";
import { Message, MessageEmbed } from "discord.js";
import { GifCommand } from "../modules/command";

export default class Hug extends GifCommand {
    constructor(client: Client) {
        super(client);
    }
    help = {
        show: true,
        name: "hug",
        usage: `${this.prefix}hug [user]`,
        category: "gifs",
        description: "Jemanden umarmen"
    };
    async run(client: Client, message: Message, args: string[]) {
        var gif: string = client.db.getgif("hug", client.db.getgiftype(message.author));
        var userA: string = client.db.getname(message.author);
        var color: string = client.db.getcolor(message.author);
        if (userA == "") userA = message.guild ? message.member.displayName : message.author.username;
        var userB: string = await super.parseUser(client, message, args);
        if (userB == "") {
            var responseString: string | nil = await client.random.choice([
                "Soll ich dich umarmen {a}? 🥺",
                "Brauchst du eine Umarmung {a}?"
            ]);
        } else {
            responseString = await client.random.choice([
                "{a} umarmt {b}",
                "{a} gibt {b} eine feste Umarmung.",
                "{a} gibt {b} eine feste Umarmung. _fest zudrück_"
            ]);
        }
        if (!responseString) return;
        var embed = new MessageEmbed()
            .setImage(gif)
            .setAuthor("hug")
            .setDescription(responseString.replace(/{a}/g, userA).replace(/{b}/g, userB))
            .setColor(color);
        message.channel.send(embed);
    }
}
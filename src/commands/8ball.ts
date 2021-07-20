import Client from "bot";
import { MessageEmbed } from "discord.js";
import { Command } from "modules/command"

export default class Eightball extends Command {
    constructor(client: Client) {
        super(client);
    }
    help = {
        show: true,
        name: "8ball",
        usage: `${this.prefix}8ball <Frage>`,
        category: "Utility",
        description: "Befrage den magischen 8ball"
    }
    run = async (client, message, args) => {
        const yesresp = ["Ja", "Ja", "Scheint so", "Eher schon", "Ich glaube schon", "Bestimmt", "Vermutlich", "Definitiv"];
        const noresp = ["Nein", "Nein", "Scheint nicht so", "Eher nicht", "Nö", "Ich glaube nicht", "Bestimmt nicht", "Nein! ... Baka"];
        let res: number = await client.random.int(0, 1);
        let resp: string;
        switch (res) {
            case 0:
                resp = client.random.choice(yesresp);
                break;
            case 1:
                resp = client.random.choice(noresp);
                break;
        }
        const embed: MessageEmbed = new MessageEmbed()
            .setColor(0x292f33)
            .setDescription(resp)
            .setAuthor("8ball", "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/144/twitter/154/billiards_1f3b1.png")
            .setFooter("@" + message.author.username);
        message.channel.send("*" + "„" + args.join(" ") + "“" + "*", embed);
    }
}
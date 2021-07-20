import { Message } from "discord.js"
import { Command } from "../modules/command"
import { inspect } from "util"
import Client from "bot"

export default class Eval extends Command {
    constructor(client: Client) {
        super(client)
    }
    help = {
        show: false,
        name: "eval",
        usage: `${this.prefix}eval <code>`,
        category: "Owner only",
        description: "Javscript code ausführen"
    }
    run(client: Client, message: Message, args: string[]) {
        if (!super.isOwner(message)) return message.channel.send("Du hast keine Rechte!");
        console.log(message.author.tag + " evaled " + args.join(" "));
        try {
            const evaled = eval(args.join(" "));
            console.log("With the result: " + evaled);
            if (evaled) message.channel.send("```js\n{evaled}```".replace("{evaled}", evaled), {
                split: {
                    append: "```",
                    prepend: "```js\n",
                    char: "\n"
                }
            });
        } catch (err) {
            console.error("It errored: " + err)
            message.channel.send("```js\n{error}```".replace("{error}", inspect(err)), {
                split: {
                    append: "```",
                    prepend: "```js\n",
                    char: "\n"
                }
            });
        }
    }
}
import { existsSync, readdir, readFileSync } from "fs";
import Client from "./bot";
if (!existsSync("./config.json")) {
    console.error("You are missing a config file.");
    process.exit(1);
}
const config: config = JSON.parse(readFileSync("./config.json", "utf-8"));
const client: Client = new Client(config);
readdir("./out/events", (err, files) => {
    if (err) return console.error(err);
    files.forEach((file: string) => {
        if (!file.endsWith(".js")) return;
        const event = require(`./events/${file.split(".")[0]}`);
        let eventName = file.split(".")[0];
        client.on(eventName, event.event.bind(null, client));
    });
});
readdir("./out/commands", (err, files) => {
    if (err) return console.error(err);
    files.forEach((file: string) => {
        if (!file.endsWith(".js")) return;
        let cmd = require(`./commands/${file.split(".")[0]}`);
        let commandName = file.split(".")[0];
        console.log(`Attempting to load command ${commandName}`);
        client.commands.set(commandName, new cmd.default(client));
    });
});

client.login(config.token);
import Client from "../bot";

export async function event(client: Client) {
    console.log("I'm Ready on " + client.guilds.cache.size + " Servers serving " + client.channels.cache.size + " Channels");
    client.application = await client.fetchApplication();
    console.log("I belong to " + client.application.owner);
}
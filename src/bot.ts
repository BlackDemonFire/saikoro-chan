import { Client as DiscordClient, ClientApplication, Collection } from 'discord.js';
import { DB } from './db';
import { Command } from './modules/command';
import { FakeRandom, Random, RealRandom } from './modules/random';
export default class Client extends DiscordClient {
    commands: Collection<string, Command> = new Collection();
    config: config;
    application?: ClientApplication;
    db: DB;
    random: Random;
    constructor(config: config) {
        super();
        this.config = config;
        this.db = new DB();
        this.random = config.randomAPIKey ? new RealRandom(config.randomAPIKey) : new FakeRandom();
    }
}
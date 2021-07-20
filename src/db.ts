import { Database, Statement } from "better-sqlite3";
import sqlite = require("better-sqlite3");
import { User } from "discord.js";

export class DB {
    private wal;
    protected db: Database;
    protected allGifActionsStatement: Statement;
    protected deleteCharStatement: Statement;
    protected getCharStatement: Statement;
    protected getColorStatement: Statement;
    protected getGifStatement: Statement;
    protected getGifTypeStatement: Statement;
    protected getNameStatement: Statement;
    protected newCharStatement: Statement;
    protected newGifStatement: Statement;
    protected newUserStatement: Statement;
    protected setColorStatement: Statement;
    protected setGifTypeStatement: Statement;
    protected setNameStatement: Statement;
    constructor() {
        this.db = new sqlite("data/users.sqlite");
        this.db.prepare("CREATE TABLE IF NOT EXISTS 'dsachars' (prefix text PRIMARY KEY, avatar text, displayname text);").run();
        //this.db.prepare("CREATE TABLE IF NOT EXISTS 'settings' (guild text PRIMARY KEY, language text);").run();
        this.db.prepare("CREATE TABLE IF NOT EXISTS 'userdb' (id text PRIMARY KEY, giftype text, color text, name text);").run();
        this.db.prepare("CREATE TABLE IF NOT EXISTS 'gifdb' (url text PRIMARY KEY, giftype text, actiontype text);").run();
        this.db.pragma('synchronous = 1');
        this.wal = this.db.pragma('journal_mode = wal');
        
        this.newUserStatement = this.db.prepare("INSERT OR IGNORE INTO userdb VALUES (@id, @giftype, @color, @name);");
        this.setNameStatement = this.db.prepare("UPDATE userdb SET name = @name WHERE id = @id");
        this.setColorStatement = this.db.prepare("UPDATE userdb SET color = @color WHERE id = @id");
        this.setGifTypeStatement = this.db.prepare("UPDATE userdb SET giftype = @giftype WHERE id = @id");
        this.getNameStatement = this.db.prepare("SELECT name FROM userdb WHERE id = @id");
        this.getColorStatement = this.db.prepare("SELECT color FROM userdb WHERE id = @id");
        this.getGifTypeStatement = this.db.prepare("SELECT giftype FROM userdb WHERE id = @id");
        this.getGifStatement = this.db.prepare("SELECT url FROM gifdb WHERE giftype = @giftype AND actiontype = @actiontype ORDER BY random() LIMIT 1;");
        this.newGifStatement = this.db.prepare("INSERT OR IGNORE INTO gifdb VALUES (@url, @giftype, @actiontype);");
        this.newCharStatement = this.db.prepare("INSERT OR IGNORE INTO dsachars VALUES (@prefix, @avatar, @displayname)");
        this.getCharStatement = this.db.prepare("SELECT * FROM dsachars WHERE prefix = @prefix;");
        this.deleteCharStatement = this.db.prepare("DELETE FROM dsachars WHERE prefix = @prefix;");
        this.allGifActionsStatement = this.db.prepare("SELECT DISTINCT actiontype FROM gifdb;");
    }
    deleteDSAChar(prefix: string) {
        this.deleteCharStatement.run({prefix});
    }
    getcolor(user: User) {
        var data = this.getColorStatement.get({ id: user.id });
        return data ? data.color : "RANDOM";
    }
    getDSAChar(prefix: string): dsachar | nil {
        return this.getCharStatement.get({ prefix });
    }
    getgif(action: string, type: string) {
        var data = this.getGifStatement.get({ giftype: type, actiontype: action });
        return data ? data.url : "";
    }
    getgifactions() {
        var data = this.allGifActionsStatement.all();
        return data ? data.map((row) => row.actiontype) : [];
    }
    getgiftype(user: User) {
        var data = this.getGifTypeStatement.get({ id: user.id });
        return data ? data.giftype : "anime";
    }
    getname(user: User) {
        var data = this.getNameStatement.get({ id: user.id });
        return data ? data.name : "";
    }
    newDSAChar(prefix: string, displayname: string, avatar: string) {
        this.newCharStatement.run({ prefix, avatar, displayname });
    }
    newgif(url: string, action: string, type: string) {
        this.newGifStatement.run({ url: url, giftype: type, actiontype: action });
    }
    newuser(user: User) {
        this.newUserStatement.run({ id: user.id, giftype: "anime", color: "RANDOM", name: "" });
    }
    setcolor(user: User, color: string) {
        this.setColorStatement.run({ id: user.id, color: color });
    }
    setgiftype(user: User, giftype: string) {
        this.setGifTypeStatement.run({ id: user.id, giftype: giftype });
    }
    setname(user: User, name: string) {
        this.setNameStatement.run({ id: user.id, name: name });
    }
}
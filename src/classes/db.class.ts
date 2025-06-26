// @ts-nocheck
import SQLData from './sql.class';
import dotenv from 'dotenv';

export default class MongoData extends SQLData {
    constructor(dbFile: string = 'data.sqlite') {
        dotenv.config();
        super(dbFile);
        return this;
    }

    // Example: create a table if not exists
    async init() {
        await this.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE,
            email TEXT UNIQUE,
            password TEXT
        )`);
    }

    // Create a key-value table if not exists
    async createKVTable(table: string) {
        await this.run(`CREATE TABLE IF NOT EXISTS ${table} (key TEXT PRIMARY KEY, value TEXT)`);
    }

    // Delete a table
    async deleteTable(table: string) {
        await this.run(`DROP TABLE IF EXISTS ${table}`);
    }
}
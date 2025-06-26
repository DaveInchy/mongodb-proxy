import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import path from 'path';

export default class SQLData {
    public db: Database | null = null;

    constructor(dbFile: string = 'data.sqlite') {
        this.connect(dbFile);
    }

    async connect(dbFile: string) {
        this.db = await open({
            filename: path.resolve(process.cwd(), dbFile),
            driver: sqlite3.Database
        });
    }

    async disconnect() {
        if (this.db) await this.db.close();
    }

    async run(query: string, params: any[] = []) {
        if (!this.db) throw new Error('Database not connected');
        return this.db.run(query, params);
    }

    async get(query: string, params: any[] = []) {
        if (!this.db) throw new Error('Database not connected');
        return this.db.get(query, params);
    }

    async all(query: string, params: any[] = []) {
        if (!this.db) throw new Error('Database not connected');
        return this.db.all(query, params);
    }
}

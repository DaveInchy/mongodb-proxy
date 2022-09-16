import { MongoClient } from "mongodb";

export default class Database
{
    client;
    database;
    collection;

    cluster;
    query;
    user;

    constructor()
    {
        this.user = { name: process.env.USERNAME || 'dave', password: process.env.PASSWORD || '' };
        this.query = 'test?retryWrites=true&w=majority';
        this.cluster = 'clustercore.j93lqxm.mongodb.net';

        this.client = this.connect();
        this.database = this.setDatabase();
        this.collection = this.setCollection();
        return this;
    }

    connect(string = `mongodb+srv://${this.user.name}:${this.user.password}@${this.cluster}/${this.query}`)
    {
        return new MongoClient(string);
    }

    async disconnect(force = true)
    {
        return await this.client.close(force) ? true : false;
    }

    setDatabase(name = 'global')
    {
        this.database = this.client.db(name);
        return this.database
    }

    setCollection(name = 'users')
    {
        this.collection = this.database.collection(name);
        return this.collection;
    }

}
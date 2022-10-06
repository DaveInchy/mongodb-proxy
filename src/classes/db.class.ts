// @ts-nocheck
import { Collection, Db, Document, MongoClient } from "mongodb";
import dotenv from 'dotenv';

export default class MongoData
{
    public client: MongoClient;
    public database: Db;
    public collection: Collection<Document>;

    private mdb: any;

    public package_config;
    public server_config;

    constructor()
    {
        dotenv.config();

        const { env } = process;

        this.package_config = require('../../package.json');
        this.server_config = require('../../config.json');

        this.mdb = ({
            cluster: env.MDB_CLUSTER,
            query: env.MDB_QUERY,
            user: ({
                name: env.MDB_USER,
                pass: env.MDB_PASS,
            }),
        });

        this.client = this.connect();
        this.database = this.setDatabase();
        this.collection = this.setCollection();

        return this;
    }

    // using mongodb.com atlas edge network for document based data.
    // if using a self-hosted mongodb i recommend using mongoose node library.
    connect(uri: string = `mongodb+srv://${this.mdb.user.name}:${this.mdb.user.pass}@${this.mdb.cluster}/${this.mdb.query}`)
    {
        return new MongoClient(uri);
    }

    async disconnect(force: boolean = true)
    {
        // @ts-ignore
        return await this.client.close(force) ? true : false;
    }

    setDatabase(name: string = 'master')
    {
        this.database = this.client.db(name);
        return this.database
    }

    setCollection(name: string = 'posts')
    {
        this.collection = this.database.collection<Document>(name);
        return this.collection;
    }

}
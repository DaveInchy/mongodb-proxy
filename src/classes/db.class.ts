// @ts-nocheck
import { MongoClient } from "mongodb";
import dotenv from 'dotenv';

export default class MangoData
{
    client;
    database;
    collection;

    mdb = ({
        cluster: new String(),
        query: new String(),
        user: ({
            name: new String(),
            pass: new String(),
        }),
    })

    constructor()
    {
        dotenv.config();

        const { env } = process;

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
    connect(uri = `mongodb+srv://${this.mdb.user.name}:${this.mdb.user.pass}@${this.mdb.cluster}/${this.mdb.query}`)
    {
        return new MongoClient(uri);
    }

    async disconnect(force = true)
    {
        // @ts-ignore
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
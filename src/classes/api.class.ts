import MongoData from './db.class';

export default class MongoAPI extends MongoData {

    constructor(database: string, collection: string) {
        super();

        this.setDatabase(database);
        this.setCollection(collection);

        return this;
    }

    public getCollection() {
        return this.collection;
    }

    public getDatabase() {
        return this.database;
    }

    public getClient() {
        return this.client;
    }

}
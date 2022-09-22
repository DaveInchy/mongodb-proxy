import MongoData from './db.class';
import { Request, Response } from 'express';
import { readJsonFileSync } from './../utils';

export default class MongoCRUD extends MongoData {



    defaultBody = `
    <!DOCTYPE html>
    <html>
        <head>
            <title>404 Page not found</title>
        </head>
        <body>
            <div id=\"errorMessage\" style=\"color: white; background-color: #b30000; width: 100%; text-align: center;\">
                <h1 style=\"font-family: \'Consolas\', monospace; font-weight: bold;\"><span style=\"font-family: sans-serif; font-size: 1.25rem;\">404</span> Page not Found.</h1>
            </div>
        </body>
    </html>
    `;

    constructor(database: string, collection: string) {
        super();

        this.setDatabase(database);
        this.setCollection(collection);

        return this;
    }

    public create = async (req: Request, res: Response) => {

        const { params, body } = req;
        const { collection } = params;
        const { data } = body.json();

        if (collection === undefined || collection === null) {
            res.status(404).send(this.defaultBody.toString());
            return;
        }

        if (data === undefined || data === null || body === undefined || body === null) {
            res.status(404).send(this.defaultBody.toString());
            return;
        }

        console.log(`[crud] create() -> trying to create a document in ${collection}`);

    }

    public read = async (req: Request, res: Response) => {

        const { params, body } = req;
        const { id, collection } = params;
        const { data } = body.json();

        if (id === undefined || id === null) {
            res.status(404).send(this.defaultBody.toString());
            return;
        }

        if (collection === undefined || collection === null) {
            res.status(404).send(this.defaultBody.toString());
            return;
        }

        if (data === undefined || data === null || body === undefined || body === null) {
            res.status(404).send(this.defaultBody.toString());
            return;
        }

        console.log(`[crud] read() -> trying to read a document in ${collection} with ObjectId ${id}`);

    }

    public update = async (req: Request, res: Response) => {

        const { params, body } = req;
        const { id, collection } = params;
        const { data } = body.json();

        if (id === undefined || id === null) {
            res.status(404).send(this.defaultBody.toString());
            return;
        }

        if (collection === undefined || collection === null) {
            res.status(404).send(this.defaultBody.toString());
            return;
        }

        if (data === undefined || data === null || body === undefined || body === null) {
            res.status(404).send(this.defaultBody.toString());
            return;
        }

        console.log(`[crud] update() -> trying to update a document in ${collection} with ObjectId ${id}`);

    }

    public delete = async (req: Request, res: Response) => {

        const { params, body } = req;
        const { id, collection } = params;
        const { data } = body.json();

        if (id === undefined || id === null) {
            res.status(404).send(this.defaultBody.toString());
            return;
        }

        if (collection === undefined || collection === null) {
            res.status(404).send(this.defaultBody.toString());
            return;
        }

        if (data === undefined || data === null || body === undefined || body === null) {
            res.status(404).send(this.defaultBody.toString());
            return;
        }

        console.log(`[crud] delete() -> trying to delete a document in ${collection} with ObjectId ${id}`);

    }

}
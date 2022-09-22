import { Request, Response } from 'express';
import { readJsonFileSync } from 'src/utils';
import MongoCRUD from 'src/classes/crud.class';

export type Post = {
    "_id": { "\$oid": string };
    "_author": { "\$oid": string };
    "index": number;
    "timestamp": number;
    "title": string;
    "descriptor": string;
    "body": string;
}

export default class Posts extends MongoCRUD {

    private state!: Array<Post>;

    public constructor()
    {
        super(`global`, `posts`);

        return this;
    }

    // public override create = async (req: Request, res: Response) => {

    // }

    // public override read = async (req: Request, res: Response) => {

    // }

    // public override update = async (req: Request, res: Response) => {

    // }

    // public override delete = async (req: Request, res: Response) => {

    // }
}
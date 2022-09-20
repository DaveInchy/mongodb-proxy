// @ts-nocheck
import { Request, Response } from 'express';
import MangoData from '../classes/db.class';

export default class MiddleWare
{
    logger = (req: Request, res: Response, next: Function) => {
        const { params, body, query, url } = req;
        const string = `[request] ${url} => ${JSON.stringify(params)}`;
        console.log(string);
        next();
    }

    authenticate = (req: Request, res: Response, next: Function) => {
        const { params, body, query, url, method, headers } = req;
        console.log(`[authentication] trying to authenticate the request`);
        if (method === 'POST' && body)
        {
            const data = body;
            if (data && data.authToken) req.headers = {...headers, "Auth-Token": data.authToken };
            if (data && data.user) {
                const user = data.user;
                const token = data.authToken;

                const database = new MangoData();
            }
        }
    }
}
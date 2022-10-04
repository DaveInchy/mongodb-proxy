// @ts-nocheck
import { Request, Response } from 'express';
import MangoData from '../classes/db.class';

export class MiddleWare
{
    static logger = (req: Request, res: Response, next: Function) => {
        const { params, body, query, url } = req;
        const string = `[request] ${url} => ${JSON.stringify(params)}`;
        console.log(string);
        next();
    }

    static headers = (req: Request, res: Response, next: Function) => {
        res.setHeader('Access-Control-Allow-Header', '*');
        res.setHeader('Access-Control-Allow-Origin', '*');

        res.setHeader('Accept', 'application/json');
        res.setHeader('Content-Type', 'application/json');

        res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');

        next();
    }

    static authenticate = (req: Request, res: Response, next: Function) => {
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

export default { logger: MiddleWare.logger, headers: MiddleWare.headers, auth: MiddleWare.authenticate }
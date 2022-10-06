// @ts-nocheck
import { Request, Response } from 'express';

const config = require('../../config.json');
const config_pkg = require('../../package.json');
export class MiddleWare
{
    static logger = (req: Request, res: Response, next: Function) => {
        const { params, body, query, url } = req;
        console.log(`[${config_pkg.name}]`, `${url} => ${JSON.stringify(body)}`);
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
        //
        return false;
    }
}

export default { logger: MiddleWare.logger, headers: MiddleWare.headers, auth: MiddleWare.authenticate }
// @ts-nocheck
import { Request, Response } from 'express';
import dotenv from 'dotenv';

const config_pkg = require('../../package.json');

dotenv.config();

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
        try {
            const authKey = process.env.AUTH_KEY;
            const bearer = req.header("Bearer");
            if (bearer && bearer === authKey) {
                next();
            } else {
                res.status(403).json({ error: { message: "Access denied, invalid or missing bearer token." } });
            }
        } catch(e) {
            console.error(`[${config_pkg.name}]`,`error:`, `${e}`)
            res.status(403).json({ error: { message: `${e}` } });
        }
    }
}

export default { logger: MiddleWare.logger, headers: MiddleWare.headers, auth: MiddleWare.authenticate }
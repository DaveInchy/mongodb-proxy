// @ts-nocheck
import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import MongoAPI from './api.class';

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

        try {
            const bearer = req.header("Bearer");
            if (bearer) {
                // check if one of these bearers is in one of the users documents.
                const api = new MongoAPI(`${config.database}`, 'users');
                const users = api.getCollection();
                var query = { '_id': new ObjectId(bearer?.toString()) };

                const getValidation = async () => {
                    var validated = false;
                    await users.findOne(query)
                        .then(data => {
                            validated = true;
                            console.log(`[${config_pkg.name}]`, `success:`, `Authentication headers validated!`);
                            console.log(`[${config_pkg.name}]`, `found user w/ bearer '${bearer?.toString()}' =>`, `${data}`);

                        }).catch(err => {
                            validated = false;
                            console.error(`[${config_pkg.name}]`, `error:`, `${err.toString()}`);
                        });
                    return validated;
                }

                var valid = getValidation().then(result => result);

                if (valid) {
                    next();
                } else {
                    console.error(`[${config_pkg.name}]`, `error:`, `validation resulted in`, `'${valid}'`);
                    res.status(403).json({ error: { message: "Something went wrong during validation." } });
                }
            } else {
                res.status(403).json({ error: { message: "Access denied, use a bearer token to use this endpoint." } });
            }
        } catch(e) {
            console.error(`[${config_pkg.name}]`,`error:`, `${e}`)
            res.status(403).json({ error: { message: `${e}` } });
        }

    }
}

export default { logger: MiddleWare.logger, headers: MiddleWare.headers, auth: MiddleWare.authenticate }
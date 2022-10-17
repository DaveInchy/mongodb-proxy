import { Request, Response, Router } from 'express';
import { Document, InsertOneResult } from 'mongodb';
import MongoAPI from '../classes/api.class';

var config = require('../../config.json');
var config_pkg = require('../../package.json');

const router: Router = Router();

//@TODO: Add a way of safely registering a new user

router.use('/signin/:username/:password', (req: Request, res: Response) => {
    const { params } = req;

    var token: string | undefined | null = "NoToken";

    const results = async (args) => {

        var error;
        const { username, password } = args;

        const user = {
            name: username ? decodeURI(username?.toString()) : "",
            pass: password ? decodeURI(password?.toString()) : "",
        }

        if (user.name !== "" && user.pass !== "") {
            // check database for an user with these selectors

            const api = new MongoAPI(config.database?.toString(), 'users');
            const users = api.getCollection();

            await users.findOne({ username: user.name }).then(data => {
                let checkPassword = () => `${user.pass}` == `${data?.['password']}` ? true : false;
                console.log(`[auth]`, `user found with data: ${JSON.stringify(data)}`)
                if (checkPassword()) {
                    token = data?.['_id'].toString();
                    console.log(`[auth]`, `login success! returning Bearer Token (${token}) in response body.`);
                } else {
                    error = "Sorry, password did not match."
                }
            }).catch(err => {
                console.error(`[auth]`,`login error: ${err}`);
                error = err;
            })
        }else{
            error = "Sorry, Invalid username and password."
        }
        const a = { 'error': { 'message': error ? error : "none" }, 'bearer': token?token:"none" };
        return a;
    }

    results(params).then(result => {
        res.status(200);
        res.json({
            ...result,
        });
    });
});

router.use('/signup/:username/:email/:password', (req: Request, res: Response) => {
    try {
        const { params } = req;
        const { username, email, password } = params;

        var hasParams = username && email && password ? true : false;
        if (!hasParams) throw new Error("Some of the parameters are not defined...");

        const user = {
            name: username ? decodeURI(username?.toString()) : "",
            pass: password ? decodeURI(password?.toString()) : "",
            email: email ? decodeURI(email?.toString()) : "",
        }

        const createUser = async (_username, _password, _email): Promise<any | InsertOneResult<Document>> => {
            // check if there already users in the database with same email or same username,
            // if FALSE: Create new entry in the users Collection
            // if TRUE: return an error message that states there already was an user with those creds.

            const api = new MongoAPI(`${config.database}`, 'users');
            const users = api.getCollection();

            var foundOne = false;

            await users.findOne({ "username": _username }).then(_user => {
                if (JSON.parse(JSON.stringify(_user)) !== null) {
                    foundOne = true;
                    console.log(`[${config_pkg.name}]`, `found user already exists with username: ${_username}`);
                }
            }).catch(e => {
                throw new Error(`${e}`);
            });

            await users.findOne({ "email": _email }).then(_user => {
                if (JSON.parse(JSON.stringify(_user)) !== null) {
                    foundOne = true;
                    console.log(`[${config_pkg.name}]`, `found user already exists with email: ${_email}`);
                }
            }).catch(e => {
                throw new Error(`${e}`);
            });

            var document: InsertOneResult<Document> | any;
            if (!foundOne) {
                // Create a new user
                await users.insertOne({
                    "email": _email,
                    "username": _username,
                    "password": _password,
                }).then(doc => {
                    document = doc;
                }).catch(e => {
                    throw new Error(`${e}`);
                })
                return document;
            }
            return { error: { message: "User already exists..." } };
        }
        createUser(user.name, user.pass, user.email).then(doc => {
            res.status(200).json(doc);
        });
    } catch(e) {
        console.error(`[${config_pkg.name}]`, `error: `, `${e}`);
        res.status(403).json({ error: { message: `${e}` } });
    }
});

export default router;
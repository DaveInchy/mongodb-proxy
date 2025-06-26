import { Request, Response, Router } from 'express';
import MongoAPI from '../classes/api.class';

var config = require('../../config.json');
var config_pkg = require('../../package.json');

const router: Router = Router();

//@TODO: Add a way of safely registering a new user

router.use('/signin/:username/:password', async (req: Request, res: Response) => {
    const { params } = req;
    const username = params['username'] ? String(params['username']) : '';
    const password = params['password'] ? String(params['password']) : '';
    let token: string | undefined | null = "NoToken";
    let error;
    try {
        const api = new MongoAPI();
        await api.init();
        const user = await api.getUserByUsername(username);
        if (user && user.password === password) {
            token = user.id.toString();
        } else {
            error = "Invalid username or password.";
        }
        res.status(200).json({ error: { message: error ? error : "none" }, bearer: token ? token : "none" });
    } catch (err) {
        res.status(500).json({ error: { message: err instanceof Error ? err.message : String(err) } });
    }
});

router.use('/signup/:username/:email/:password', async (req: Request, res: Response) => {
    const { params } = req;
    const username = params['username'] ? String(params['username']) : '';
    const email = params['email'] ? String(params['email']) : '';
    const password = params['password'] ? String(params['password']) : '';
    try {
        const api = new MongoAPI();
        await api.init();
        const existing = await api.getUserByUsername(username);
        if (existing) {
            return res.status(409).json({ error: { message: "User already exists..." } });
        }
        await api.createUser(username, email, password);
        return res.status(200).json({ message: "User created successfully." });
    } catch (e) {
        return res.status(500).json({ error: { message: e instanceof Error ? e.message : String(e) } });
    }
});

export default router;
import express, { Router } from 'express';
import cors from 'cors';

// classes
import Core from './classes/core.class';
import MiddleWare from './classes/middleware.class';

// routes
import usersRoute from './routes/users.route';

// utils
import { getFileSync } from './utils';
import { readFileSync } from 'fs';

// setup
const core: Core = new Core();
const api: Router = Router();
const www: Router = Router();
const app: express.Express = core.getApp();

// middleware
app.use(express.json());
app.use(cors());

// setup routes
api.use('/users', usersRoute);

// downloadable content handling
www.get('/:file', (req, res) => {
    const { params } = req;
    res.status(200);
    res.send(readFileSync(__dirname + `./../www/${params.file}`));
});

app.use('/cdn', www)
app.use('/api', api);

app.use(new MiddleWare().logger);

core.createServer(app);

export default app;
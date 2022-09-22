import express, { Router } from 'express';
import cors from 'cors';

// classes
import Core from './classes/core.class';
import MiddleWare from './classes/middleware.class';

// routes
import Posts from './routes/posts.route';
import CDN from './routes/cdn.route';

// utils
import { getFileSync } from './utils';

// setup
const core: Core = new Core();
const app: express.Express = core.getApp();
const api: Router = Router();
const cdn: Router = Router();

// middleware
app.use(cors());
app.use(express.json());

// setup routes for API
api.use('/:collection', Posts);

// setup routes for static files.
cdn.get('/static', CDN);

// setup the app uri's
app.use('/cdn', cdn)
app.use('/api', api);

// middleware
app.use(new MiddleWare().logger);

core.createServer(app);

export default app;
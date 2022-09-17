import express, { Router } from 'express';

import Core from './classes/core.class.js';
import MiddleWare from './classes/middleware.class.js';

import UsersRoute from './routes/users.route.js';

const core      = new Core();
const router    = Router();
const app       = core.getApp();

app.use(express.json());
app.use(new MiddleWare().logger);

router.use('/users', UsersRoute);

app.use('/api', router);

core.createServer(app);
import { Router } from 'express';

// classes
import Server from './classes/server.class';

// routes
import Database from './routes/crud.route';
import Website from './routes/public.route';
import Auth from './routes/auth.route';

// setup
const server: Server = new Server();
const routes: Array<[string, Router]> = [];

server.loadMiddleware();

routes.push(['/api/database', Database]);
routes.push(['/api/static', Website]);
routes.push(['/api/auth', Auth]);

server.loadRoutes(routes);
server.loadServer();

const app = server.getApp();

export default app;
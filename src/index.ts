import { Router } from 'express';

// classes
import Server from './classes/server.class';

// routes
import Database from './routes/crud.route';
import Website from './routes/public.route';

// setup
const server: Server = new Server();
const routes: Array<[string, Router]> = [];

server.loadMiddleware();

routes.push(['/api/database', Database]);
routes.push(['/', Website]);

server.loadRoutes(routes);
server.loadServer();

export default server.app;
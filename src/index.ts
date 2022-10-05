import express, { Router } from 'express';
import cors from 'cors';

// classes
import Server from './classes/server.class';

// routes
import DataBase from './routes/crud.route';
import Static from './routes/cdn.route';

// setup
const server: Server = new Server();
const routes: Array<[string, Router]> = [];

server.loadMiddleware();

routes.push(['/api/database', DataBase]);
routes.push(['/cdn/public', Static]);

server.loadRoutes(routes);

server.loadServer();

export default server.app;
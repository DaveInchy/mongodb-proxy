import Auth from "./routes/auth.route";
import Database from "./routes/crud.route";
import Files from "./routes/files.route";
import Server from "./classes/server.class";
import { Router } from "express";

const server: Server = new Server();
const routes: Array<[ string, Router ] | { endpoint: string, handler: Router }> = [];

routes.push(['/static/', Files]);
routes.push(['/api/database', Database]);
routes.push(['/api/auth', Auth]);

server.loadMiddleware();
server.loadRoutes(routes);
server.loadServer();

const app = server.getApp();

export default app;
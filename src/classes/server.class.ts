// @ts-nocheck

import express, { Router } from 'express';
import http from 'http';
import https from 'https';
import cors from 'cors';

// classes
import MiddleWare from './middleware.class';

export default class ProxyServer
{

    app;
    server;
    port;

    package_config;
    server_config;

    constructor()
    {
        this.app = express();

        this.package_config = require('../../package.json');
        this.server_config = require('../../config.json');

        this.port = { 'HTTP': process.env.PORT || this.server_config.port.http || 8080, 'HTTPS': process.env.PORT_SSL || this.server_config.port.https || 8443 }
        this.server = { 'HTTP': undefined, 'HTTPS': undefined };

        console.log(`[${this.package_config.name}]`, `initializing the MongoDB Proxy server, this may take some time ...\n`)

        return this;
    }

    loadRoutes(router: Array<[ string, Router ]>) {
        const app: express.Express = this.getApp();

        // loading all routers
        router.forEach(( value, key ) => {
            app.use(value[0], value[1]);
            console.log(`[${this.package_config.name}]`, `added new router to the '${value[0]}' endpoint. \n`)
        });

        this.app = app;

        return app;
    }

    loadMiddleware() {
        const app: express.Express = this.getApp();

        // setup middleware
        app.use(cors());
        //app.use(express.json());
        app.use(MiddleWare.headers);
        app.use(MiddleWare.logger);

        this.app = app;

        return app;
    }

    loadServer()
    {
        const app: express.Express = this.getApp();
        if (app !== null && app !== undefined) {

            this.setServer(false, http.createServer(app).listen(this.port['HTTP']));
            this.setServer(true, https.createServer(app, {}).listen(this.port['HTTPS']));

            console.log(`[${this.package_config.name}]`, `listening with port ${this.port['HTTP']} \& port ${this.port['HTTPS']} \@ https://localhost:${this.port['HTTP']}/\n`);

            console.info(`[${this.package_config.name}]`, `You can configure the proxy server by editing 'src/config.json' and adding an '.env' file to the root of the project.`);
            console.info(`[${this.package_config.name}]`, `More info at https://github.com/daveinchy/mongodb-proxy/README.md on how to set up your mongodb connection and setup + run 'mongodb-proxy'.\n`);

            this.app = app;
        }
        return this.app;
    }

    setServer(secure: boolean = true, server: http.Server | https.Server) {
        switch (secure) {
            case true:
                this.server['HTTPS'] = server;
                break;

            case false:
                this.server['HTTP'] = server;
                break;

            default:
                this.server['HTTP'] = server;
                break;
        }

        return true;
    }

    getServer(secure: boolean = false) {
        switch (secure) {
            case true:
                return this.server['HTTPS'];
                break;

            case false:
                return this.server['HTTP'];
                break;

            default:
                return this.server['HTTP'];
                break;
        }
    }

    getApp()
    {
        return this.app;
    }
}
import http from 'http';
import https from 'https';
import express from 'express';

export default class Core
{

    app;
    server;
    port;

    constructor()
    {
        this.app = express();

        this.port = { 'HTTP': process.env.PORT || 8080, 'HTTPS': process.env.PORT_SSL || 8443 }
        this.server = { 'HTTP': undefined, 'HTTPS': undefined };

        return this;
    }

    createServer(app)
    {
        if (app !== null && app !== undefined) {

            this.server['HTTP'] = http.createServer(app).listen(this.port['HTTP']);
            this.server['HTTPS'] = https.createServer(app, {}).listen(this.port['HTTPS']);

            console.log(`Application listening with port ${this.port['HTTP']} \& port ${this.port['HTTPS']} \@ https://localhost:${this.port['HTTP']}/`);

        }
        return;
    }

    getServer(secure = false) {
        let srv;
        switch (secure) {
            case true:
                srv = this.server['HTTPS'];
                break;

            case false:
                srv = this.server['HTTP'];
                break;

            default:
                srv = this.server['HTTP'];
                break;
        }

        return srv;
    }

    getApp()
    {
        return this.app;
    }
}
import { request } from "express";

export default class MiddleWare
{
    logger = (req, res, next) => {
        const { params, body, query, url, bodyUsed, formData } = req;
        const string = `[request] ${url} => ${JSON.stringify(params)}`;
        console.log(string);
        next();
    }
}
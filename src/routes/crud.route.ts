import { Request, Response, Router } from 'express';
import { Document, MongoClient, ObjectId, ReturnDocument } from 'mongodb';
import MongoAPI from '../classes/api.class';

var config = require('../../config.json');
var config_pkg = require('../../package.json');

const router: Router = Router();

router.use('/:collection/:action/:id', async (req: Request, res: Response) => {

    var error: string | undefined = undefined;
    let result = {};

    try {

        const { params } = req;
        const { collection, action, id } = params;

        var api = new MongoAPI(
            decodeURI(config.database.toString()),
            decodeURI(collection ? collection.toString() : "temp")
        );

        var col = api.collection;

        if (collection !== null && collection !== undefined && collection !== "") {
            if (action !== null && action !== undefined && action !== "") {
                if (id !== null && id !== undefined && id !== "") {

                    let filter = action!=='create'? { '_id': new ObjectId(id) } : {};

                    switch (action) {

                        case `read`:
                            result = await col.find(filter).toArray();
                            if (!result) return;
                            break;

                        case `update`:
                            await col.findOneAndUpdate(filter, {
                                $set: {...req.body}
                            }).then( data => {
                                if (!data) return;
                                error = data.lastErrorObject? data.lastErrorObject.toString() : undefined;
                                result = { ok: data.ok?.toString(), value: data.value?._id?.toJSON(), error: data.lastErrorObject }
                            }).catch(err => {
                                console.error(`[${config_pkg.name}]`, `${action} => ${err}`);
                                throw new Error(err);
                            });
                            break;

                        case `delete`:
                            await col.findOneAndDelete(filter).then( data => {
                                if (!data) return;
                                error = data.lastErrorObject? data.lastErrorObject.toString() : undefined;
                                result = { ok: data.ok?.toString(), value: data.value?._id?.toJSON(), error: data.lastErrorObject }
                            }).catch(err => {
                                console.error(`[${config_pkg.name}]`, `${action} => ${err}`);
                                throw new Error(err);
                            });
                            break;

                        case `create`:
                            let update = { ...filter, ...req.body };
                            await col.insertOne(update).then( data => {
                                if (!data) return;
                                result = { '_id': data?.insertedId };
                            }).catch(err => {
                                console.error(`[${config_pkg.name}]`, `${action} => ${err}`);
                                throw new Error(err);
                            });
                            break;

                        default:
                            error = `Invalid action parameter in request.`;
                            console.error(`[${config_pkg.name}]`, `${action} => ${error}`);
                            throw new Error(error);
                            break;
                    }
                }
            }
        }

        res.status(200)
        res.json(result);
        console.log(`[${config_pkg.name}]`, `result: ${JSON.stringify(result?result:undefined)}`);

        api.disconnect();

    } catch(err: string | unknown) {
        res.status(502);
        res.send(JSON.stringify({ status: 502, message: err }));
        console.error(`[${config_pkg.name}]`, `error: ${err}`);
    }
})

export default router;
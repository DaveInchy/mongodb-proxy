import { Request, Response, Router } from 'express';
import { MongoClient } from 'mongodb';
import MongoCRUD from 'src/classes/crud.class';

const router: Router = Router();

router.use('/:collection/:action/:id', (req: Request, res: Response) => {
    const { params } = req;
    const { collection, action, id } = params;

    var config = require('src/config.json');
    var error: string | undefined = undefined;
    var mongodb = new MongoCRUD(config.database.toString(), decodeURI(collection ? collection.toString() : ""));
    var client = mongodb.collection;
    let result: any = {};

    if (action !== null && action !== undefined && action !== "") {
        if (id !== null && id !== undefined && id !== "") {

            let filter = { '\$oid': id };

            switch (action) {

                case `read`:
                    (async () => {
                        result = await client.findOne(filter);
                    })()
                    break;

                case `update`:
                    (async () => {
                        result = await client.findOneAndUpdate(filter, {...filter, ...req.body});
                    })()
                    break;

                case `delete`:
                    (async () => {
                        result = await client.findOneAndDelete(filter);
                    })()
                    break;

                default:
                    error = `Invalid action parameter in request.`;
                    result = { status: 502, message: error };
                    break;

            }

        } else {
            if (action === `create`) {
                (async () => {
                    let update = { ...req.body };
                    result = await client.insertOne(update)
                })()
            } else {
                error = `Please add an ID you whish to ${action.toUpperCase()}.`;
                result = { status: 502, message: error };
            }
        }
    }

    res.status(result.status ? result.status : 200).json(result);
})

export default router;
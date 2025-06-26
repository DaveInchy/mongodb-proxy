import { Request, Response, Router } from 'express';
import MiddleWare from '../classes/middleware.class';
import MongoAPI from '../classes/api.class';

var config = require('../../config.json');
var config_pkg = require('../../package.json');

const router: Router = Router();

router.use(MiddleWare.auth);

// Example: /api/database/users/list
router.use('/:collection/:action/:id?', async (req: Request, res: Response) => {
    let error: string | undefined = undefined;
    let result = {};
    try {
        const { params, body } = req;
        const collection = params['collection'] ? String(params['collection']) : '';
        const action = params['action'] ? String(params['action']) : '';
        const id = params['id'] ? String(params['id']) : '';
        const api = new MongoAPI();
        await api.init();
        if (collection && action) {
            switch (action) {
                case 'read':
                    if (id) {
                        result = await api.get(`SELECT * FROM ${collection} WHERE id = ?`, [id]);
                    }
                    break;
                case 'update':
                    if (id) {
                        const fields = Object.keys(body).map(key => `${key} = ?`).join(', ');
                        const values = Object.values(body);
                        await api.run(`UPDATE ${collection} SET ${fields} WHERE id = ?`, [...values, id]);
                        result = { ok: true };
                    }
                    break;
                case 'delete':
                    if (id) {
                        await api.run(`DELETE FROM ${collection} WHERE id = ?`, [id]);
                        result = { ok: true };
                    }
                    break;
                case 'create':
                    const keys = Object.keys(body).join(', ');
                    const placeholders = Object.keys(body).map(() => '?').join(', ');
                    const vals = Object.values(body);
                    await api.run(`INSERT INTO ${collection} (${keys}) VALUES (${placeholders})`, vals);
                    result = { ok: true };
                    break;
                case 'list':
                    result = await api.all(`SELECT * FROM ${collection}`);
                    break;
                default:
                    error = `Invalid action parameter in request.`;
                    break;
            }
        }
        res.status(200).json(result);
    } catch (err) {
        res.status(502).send(JSON.stringify({ status: 502, message: err instanceof Error ? err.message : String(err) }));
    }
});

export default router;
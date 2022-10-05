import { Router } from 'express';

import { getFileSync } from '../lib/files';
import { readFileSync } from 'fs';

const router: Router = Router();

router.use('/:file', (req, res) => {
    const { params } = req;
    res.status(200);
    res.send(getFileSync(__dirname + `./../public/${params['file']}`));
});

export default router;
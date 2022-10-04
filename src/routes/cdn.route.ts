import express, { Express, Router } from 'express';
import MiddleWare from '../classes/middleware.class';

import { getFileSync } from '../utils';
import { readFileSync } from 'fs';

const router: Router = Router();

router.use('/:file', (req, res) => {
    const { params } = req;
    res.status(200);
    res.send(readFileSync(__dirname + `./../public/${params['file']}`));
});

export default router;
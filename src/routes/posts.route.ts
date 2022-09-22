import express, { Express, Router } from 'express';
import MiddleWare from 'src/classes/middleware.class';
import MongoCRUD from 'src/classes/crud.class';
import Posts from 'src/models/posts.model';

const router: Router = Router();
const crud = new Posts();

router.use('/create', crud.create);
router.use('/read/:id', crud.read);
router.use('/update/:id', crud.update);
router.use('/delete/:id', crud.delete);

export default router;
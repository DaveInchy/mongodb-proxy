import { Router } from 'express';
import MongoCRUD from 'src/classes/crud.class';

const router: Router = Router();
const crud = new MongoCRUD('global', 'posts');

router.use('/create', crud.create);
router.use('/read/:id', crud.read);
router.use('/update/:id', crud.update);
router.use('/delete/:id', crud.delete);

export default router;
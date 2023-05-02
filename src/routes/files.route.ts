import path from "path";
import { Router } from "express";

const router: Router = Router();

router.use('/:file', (req, res) => {
    const { params } = req;
    res.status(200);
    const path2 = `../../../public/${params['file']}`;
    res.setHeader('Content-Type', 'text/html; charset=UTF-8');
    res.sendFile(path.join(__dirname + path2));
});

export default router;
import express from 'express';
const router = express.Router();

router.use('/:action', async (req, res, next) => {
    var params = req.params && req.params !== null ? req.params : null;

    if (params.action === 'create') {
        var query = req.query && req.query !== null ? req.query : null;

        var email = () => query.email ? query.email : null;
        var password = () => query.password ? query.password : null;
        var name = () => query.name ? query.name : null;

        if (email() !== null && password() !== null && name() !== null) {
            var task = await new User().createUser(email(), password(), name());
            res.status(200);
            res.send(JSON.stringify(task));
        } else {
            res.status(403);
            res.send(JSON.stringify({ error: true, message: `Error, query parameters weren't properly set - use key(s): name, email, password & URLencode() required ...` }));
        }
    }

    if (params.action === 'fetch') {
        var query = req.query && req.query !== null ? req.query : null;

        var email = () => query.email ? query.email : null;

        if (email() !== null) {
            var task = await new User().getUser(email());
            res.status(200);
            res.send(JSON.stringify(task));
        } else {
            res.status(403);
            res.send(JSON.stringify({ error: true, message: `Error, query parameters weren't properly set - use key(s): email & URLencode() required ...` }));
        }
    }
});

export default router;
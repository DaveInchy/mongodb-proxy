import { Router, Request, Response } from 'express';
import MongoData from '../classes/db.class';
import middleware from '../classes/middleware.class';

const router = Router();
const db = new MongoData();

// Create a new table (all tables are key-value)
router.post('/table/:table', middleware.auth, async (req: Request, res: Response) => {
    const { table } = req.params;
    try {
        await db.run(`CREATE TABLE IF NOT EXISTS ${table} (key TEXT PRIMARY KEY, value TEXT)`);
        res.json({ success: true, message: `Table '${table}' created.` });
    } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        res.status(500).json({ error: msg });
    }
});

// Delete a table
router.delete('/table/:table', middleware.auth, async (req: Request, res: Response) => {
    const { table } = req.params;
    try {
        await db.run(`DROP TABLE IF EXISTS ${table}`);
        res.json({ success: true, message: `Table '${table}' deleted.` });
    } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        res.status(500).json({ error: msg });
    }
});

// List all key-value pairs in a table
router.get('/:table', middleware.auth, async (req: Request, res: Response) => {
    const { table } = req.params;
    try {
        const rows = await db.all(`SELECT * FROM ${table}`);
        res.json(rows);
    } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        res.status(500).json({ error: msg });
    }
});

// Get a single key-value pair
router.get('/:table/:key', middleware.auth, async (req: Request, res: Response) => {
    const { table, key } = req.params;
    try {
        const row = await db.get(`SELECT * FROM ${table} WHERE key = ?`, [key]);
        if (row) res.json(row);
        else res.status(404).json({ error: 'Not found' });
    } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        res.status(500).json({ error: msg });
    }
});

// Create or update a key-value pair
router.post('/:table/:key', middleware.auth, async (req: Request, res: Response) => {
    const { table, key } = req.params;
    const { value } = req.body;
    try {
        await db.run(`INSERT OR REPLACE INTO ${table} (key, value) VALUES (?, ?)`, [key, value]);
        res.json({ success: true });
    } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        res.status(500).json({ error: msg });
    }
});

// Update a key-value pair
router.put('/:table/:key', middleware.auth, async (req: Request, res: Response) => {
    const { table, key } = req.params;
    const { value } = req.body;
    try {
        await db.run(`UPDATE ${table} SET value = ? WHERE key = ?`, [value, key]);
        res.json({ success: true });
    } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        res.status(500).json({ error: msg });
    }
});

// Delete a key-value pair
router.delete('/:table/:key', middleware.auth, async (req: Request, res: Response) => {
    const { table, key } = req.params;
    try {
        await db.run(`DELETE FROM ${table} WHERE key = ?`, [key]);
        res.json({ success: true });
    } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        res.status(500).json({ error: msg });
    }
});

export default router;

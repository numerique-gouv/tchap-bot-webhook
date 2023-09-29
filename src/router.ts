import Express from 'express';
import { buildMatrix } from './lib/matrix';

async function buildRouter() {
    const matrix = await buildMatrix();
    const router = Express.Router();

    router.get('/webhook', (req, res) => {
        matrix.sendMessage('TEST');
        res.sendStatus(200);
    });

    return router;
}

export { buildRouter };

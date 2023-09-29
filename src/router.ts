import Express from 'express';
import { buildMatrix } from './lib/matrix';

async function buildRouter() {
    const matrix = await buildMatrix();
    const router = Express.Router();

    router.post('/webhook', (req, res) => {
        const events = req.body as Array<any>;
        events.forEach((event) => {
            matrix.sendMessage(event.description);
        });
        res.sendStatus(200);
    });

    return router;
}

export { buildRouter };

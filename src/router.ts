import Express from 'express';
import { buildController } from './lib/buildController';
import { DataSource } from 'typeorm';
import { buildAlertController } from './modules/alert';

async function buildRouter(dataSource: DataSource) {
    const router = Express.Router();

    const alertController = buildAlertController(dataSource);

    router.post('/webhook', buildController(alertController.handleUpdownIoWebhook));

    return router;
}

export { buildRouter };

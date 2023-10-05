import Express from 'express';
import Joi from 'joi';
import { buildController } from './lib/buildController';
import { DataSource } from 'typeorm';
import { buildAlertController } from './modules/alert';

async function buildRouter(dataSource: DataSource) {
    const router = Express.Router();

    const alertController = buildAlertController(dataSource);

    router.post('/webhook-updownio', buildController(alertController.handleUpdownIoWebhook));
    router.post(
        '/webhook',
        buildController(alertController.handleWebhook, {
            schema: Joi.object({ roomId: Joi.string(), message: Joi.string() }),
        }),
    );
    router.post('/alerts', buildController(alertController.createAlert));
    router.get('/alerts', buildController(alertController.getAlerts));

    return router;
}

export { buildRouter };

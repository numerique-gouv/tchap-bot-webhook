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
            schema: Joi.object({
                roomId: Joi.string().required(),
                message: Joi.string().required(),
            }),
        }),
    );
    router.post(
        '/alerts',
        buildController(alertController.createAlert, {
            schema: Joi.object({
                roomId: Joi.string().required(),
                url: Joi.string().required(),
            }),
        }),
    );
    router.get('/alerts', buildController(alertController.getAlerts));
    router.get(
        '/health',
        buildController(() => true),
    );

    return router;
}

export { buildRouter };

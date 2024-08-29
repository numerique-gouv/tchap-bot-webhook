import Express from 'express';
import Joi from 'joi';
import { buildController } from './lib/buildController';
import { DataSource } from 'typeorm';
import { buildAlertController } from './modules/alert';
import { buildHabilitationController } from './modules/habilitation';

async function buildRouter(dataSource: DataSource) {
    const router = Express.Router();

    const alertController = buildAlertController(dataSource);
    const habilitationController = buildHabilitationController(dataSource);

    router.post(
        '/webhook-updownio/:tchapRoomId',
        buildController(alertController.handleUpdownIoWebhookWithRoomId),
    );
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
    router.post('/habilitations', buildController(habilitationController.createHabilitation));
    router.get('/habilitations', buildController(habilitationController.getHabilitations));
    router.get(
        '/health',
        buildController(() => true),
    );

    return router;
}

export { buildRouter };

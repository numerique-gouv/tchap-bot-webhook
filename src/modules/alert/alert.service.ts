import { DataSource } from 'typeorm';
import { buildMatrix } from '../../lib/matrix';
import { updownIoEventType } from './types';

function buildAlertService(dataSource: DataSource) {
    return {
        handleUpdownIoWebhook,
    };

    async function handleUpdownIoWebhook(events: updownIoEventType) {
        const matrix = await buildMatrix();

        events.forEach((event) => {
            matrix.sendMessage(event.description);
        });
        return true;
    }
}

export { buildAlertService };

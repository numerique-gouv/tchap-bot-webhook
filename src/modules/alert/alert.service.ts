import { DataSource, In } from 'typeorm';
import { buildMatrix } from '../../lib/matrix';
import { updownIoEventType } from './types';
import { Alert } from './Alert.entity';

function buildAlertService(dataSource: DataSource) {
    const alertRepository = dataSource.getRepository(Alert);

    return {
        handleUpdownIoWebhook,
    };

    async function handleUpdownIoWebhook(events: updownIoEventType) {
        const matrix = await buildMatrix();
        const urls = events.map((event) => event.check.url);
        console.log('URLS: ', urls.join(', '));
        const alerts = await alertRepository.findBy({ url: In(urls) });
        const mappedAlerts = alerts.reduce((acc, alert) => {
            return { ...acc, [alert.url]: alert };
        }, {} as Record<string, Alert>);

        events.forEach((event) => {
            const alert = mappedAlerts[event.check.url];
            matrix.sendMessage(event.description);
            if (alert) {
                matrix.sendMessage(event.description, alert.roomId);
            }
        });
        return true;
    }
}

export { buildAlertService };

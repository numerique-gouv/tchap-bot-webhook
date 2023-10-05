import { DataSource, In } from 'typeorm';
import { buildMatrix } from '../../lib/matrix';
import { alertDtoType, genericEventType, updownIoEventType } from './types';
import { Alert } from './Alert.entity';

function buildAlertService(dataSource: DataSource) {
    const alertRepository = dataSource.getRepository(Alert);

    return {
        createAlert,
        getAlerts,
        handleUpdownIoWebhook,
        handleWebhook,
    };

    async function handleWebhook(event: genericEventType) {
        const matrix = await buildMatrix();
        matrix.sendMessage(event.message, event.roomId);
        return true;
    }

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

    async function getAlerts() {
        return alertRepository.find();
    }

    async function createAlert(alertDto: alertDtoType) {
        const alert = new Alert();
        alert.roomId = alertDto.roomId;
        alert.url = alertDto.url;
        return alertRepository.save(alert);
    }
}

export { buildAlertService };

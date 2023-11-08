import { DataSource, In } from 'typeorm';
import { matrix } from '../../lib/matrix';
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
        await matrix.sendMessage(event.message, event.roomId);
        return true;
    }

    async function handleUpdownIoWebhook(events: updownIoEventType) {
        const urls = events.map((event) => event.check.url);
        const alerts = await alertRepository.findBy({ url: In(urls) });
        const mappedAlerts = alerts.reduce((acc, alert) => {
            return { ...acc, [alert.url]: alert };
        }, {} as Record<string, Alert>);

        for (const event of events) {
            const alert = mappedAlerts[event.check.url];
            await matrix.sendMessage(event.description);
            if (alert) {
                await matrix.sendMessage(event.description, alert.roomId);
            }
        }

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

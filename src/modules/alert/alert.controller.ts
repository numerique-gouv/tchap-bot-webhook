import { DataSource } from 'typeorm';
import { buildAlertService } from './alert.service';
import { updownIoEventType } from './types';

function buildAlertController(dataSource: DataSource) {
    const alertService = buildAlertService(dataSource);
    return { handleUpdownIoWebhook };

    function handleUpdownIoWebhook(params: updownIoEventType) {
        return alertService.handleUpdownIoWebhook(params);
    }
}

export { buildAlertController };

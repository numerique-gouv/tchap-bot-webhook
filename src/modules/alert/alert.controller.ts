import { DataSource } from 'typeorm';
import { buildAlertService } from './alert.service';
import { alertDtoType, updownIoEventType } from './types';

function buildAlertController(dataSource: DataSource) {
    const alertService = buildAlertService(dataSource);
    return { createAlert, handleUpdownIoWebhook, getAlerts };

    function handleUpdownIoWebhook(params: updownIoEventType) {
        return alertService.handleUpdownIoWebhook(params);
    }

    function createAlert(params: alertDtoType) {
        return alertService.createAlert(params);
    }

    function getAlerts() {
        return alertService.getAlerts();
    }
}

export { buildAlertController };

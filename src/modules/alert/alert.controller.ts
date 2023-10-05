import { DataSource } from 'typeorm';
import { buildAlertService } from './alert.service';
import { alertDtoType, genericEventType, updownIoEventType } from './types';

function buildAlertController(dataSource: DataSource) {
    const alertService = buildAlertService(dataSource);
    return { createAlert, handleUpdownIoWebhook, getAlerts, handleWebhook };

    function handleUpdownIoWebhook(params: updownIoEventType) {
        return alertService.handleUpdownIoWebhook(params);
    }

    function handleWebhook(params: genericEventType) {
        return alertService.handleWebhook(params);
    }

    function createAlert(params: alertDtoType) {
        return alertService.createAlert(params);
    }

    function getAlerts() {
        return alertService.getAlerts();
    }
}

export { buildAlertController };

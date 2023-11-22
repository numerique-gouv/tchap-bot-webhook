import { DataSource } from 'typeorm';
import { buildAlertService } from './alert.service';
import { alertDtoType, genericEventType, updownIoEventType } from './types';

function buildAlertController(dataSource: DataSource) {
    const alertService = buildAlertService(dataSource);
    return {
        createAlert,
        handleUpdownIoWebhook,
        getAlerts,
        handleWebhook,
        handleUpdownIoWebhookWithRoomId,
    };

    function handleUpdownIoWebhookWithRoomId(params: {
        body: updownIoEventType;
        urlParams: { tchapRoomId: string };
    }) {
        return alertService.handleUpdownIoWebhookForRoomId(
            params.body,
            params.urlParams.tchapRoomId,
        );
    }

    function handleUpdownIoWebhook(params: { body: updownIoEventType }) {
        return alertService.handleUpdownIoWebhook(params.body);
    }

    function handleWebhook(params: { body: genericEventType }) {
        return alertService.handleWebhook(params.body);
    }

    function createAlert(params: { body: alertDtoType }) {
        return alertService.createAlert(params.body);
    }

    function getAlerts() {
        return alertService.getAlerts();
    }
}

export { buildAlertController };

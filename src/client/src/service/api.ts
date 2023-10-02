import { config } from '../config';

const api = { sendRequestUrlMonitoring };

async function sendRequestUrlMonitoring(body: { urls: string; room: string }) {
    const URL = `https://${config.PIPEDREAM_WORKFLOW_ID}.m.pipedream.net`;
    const response = await fetch(URL, {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(body),
        headers: { 'Content-type': 'application/json' },
    });
    return response;
}

export { api };

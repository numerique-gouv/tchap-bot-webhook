import { MatrixAuth, MatrixClient } from 'matrix-bot-sdk';
import { config } from '../config';

function buildMatrix() {
    const auth = new MatrixAuth(config.MATRIX_SERVER_URL);
    let client: MatrixClient | null = null;

    return { initialize, sendMessage };

    async function initialize() {
        client = await auth.passwordLogin(config.TCHAP_USERNAME, config.TCHAP_PASSWORD);
        return client.start();
    }

    function sendMessage(message: string, roomId?: string) {
        if (!client) {
            throw new Error(`Client not initialized ; could not send message`);
        }
        return client.sendMessage(roomId || config.DEFAULT_ROOM_ID, {
            body: message,
            msgtype: 'm.text',
        });
    }
}

const matrix = buildMatrix();

export { matrix };

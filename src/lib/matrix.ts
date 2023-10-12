import { MatrixAuth } from 'matrix-bot-sdk';
import { config } from '../config';

async function buildMatrix() {
    const auth = new MatrixAuth(config.MATRIX_SERVER_URL);
    const client = await auth.passwordLogin(config.TCHAP_USERNAME, config.TCHAP_PASSWORD);

    const roomId = config.DEFAULT_ROOM_ID;
    await client.start();

    return { sendMessage };

    function sendMessage(message: string, roomId?: string) {
        return client.sendMessage(roomId || config.DEFAULT_ROOM_ID, {
            body: message,
            msgtype: 'm.text',
        });
    }
}

export { buildMatrix };

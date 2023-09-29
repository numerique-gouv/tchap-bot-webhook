import { MatrixAuth } from 'matrix-bot-sdk';
import { config } from '../config';

async function buildMatrix() {
    const auth = new MatrixAuth(config.MATRIX_SERVER_URL);
    const client = await auth.passwordLogin(config.TCHAP_USERNAME, config.TCHAP_PASSWORD);

    const roomId = config.ROOM_ID;
    await client.start();

    return { sendMessage };

    function sendMessage(message: string) {
        return client.sendMessage(roomId, {
            body: message,
            msgtype: 'm.text',
        });
    }
}

buildMatrix;

export { buildMatrix };

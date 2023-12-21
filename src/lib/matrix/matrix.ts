import { MatrixAuth, MatrixClient } from 'matrix-bot-sdk';
import { config } from '../../config';
import { eventEmitter } from '../events';

function buildMatrix() {
    const auth = new MatrixAuth(config.MATRIX_SERVER_URL);
    let client: MatrixClient | null = null;

    return { initialize, sendMessage };

    async function initialize() {
        client = await auth.passwordLogin(config.TCHAP_USERNAME, config.TCHAP_PASSWORD);

        await client.start();
        client.on('room.message', (roomId: string, event: any) => {
            if (!event['content']?.['msgtype']) return;
            const body = {
                roomId,
                sender: event.sender as string,
                message: event.content.body,
                messageId: event.event_id,
            };
            eventEmitter.emit('MESSAGE_RECEIVED', body);
        });
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

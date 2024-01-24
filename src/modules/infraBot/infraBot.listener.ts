import { DataSource } from 'typeorm';
import { listenerType } from '../../lib/events';
import { MessageTreatment } from './MessageTreatment.entity';
import { parseCommand } from './parseCommand';
import { matrix } from '../../lib/matrix';
import { config } from '../../config';
import { buildHabilitationService } from '../habilitation';
import axios from 'axios';
import { infraApiCommandMapping } from './constants';

type messageReceivedDataType = {
    roomId: string;
    sender: string;
    message: string;
    messageId: string;
};

function buildInfraBotListener(dataSource: DataSource): listenerType {
    const habilitationService = buildHabilitationService(dataSource);
    const messageTreatmentRepository = dataSource.getRepository(MessageTreatment);

    return {
        eventName: 'MESSAGE_RECEIVED',
        handler: async (data: messageReceivedDataType) => {
            if (data.roomId !== config.INFRA_OPI_ROOM_ID) {
                return;
            }
            if (data.sender === `@${config.TCHAP_USERNAME}:${config.MATRIX_DOMAIN}`) {
                return;
            }
            const messageTreatment = await messageTreatmentRepository.findOne({
                where: { messageExternalId: data.messageId },
            });
            if (!!messageTreatment) {
                return;
            }
            try {
                const parsedCommand = parseCommand(data.message);
                console.log('parsedCommand', parsedCommand);

                try {
                    await habilitationService.assertUserIsAuthorizedToPerform(data.sender);

                    const URL = infraApiCommandMapping[parsedCommand.kind];
                    console.log('URL', URL);
                    try {
                        const response = await axios.post(URL, parsedCommand.parameters, {
                            headers: { 'Api-Key': config.INFRA_OPI_API_KEY },
                        });
                        console.log('SUCCESS');
                        console.log(response);
                        await messageTreatmentRepository.insert({
                            kind: 'handled',
                            messageExternalId: data.messageId,
                        });
                        matrix.sendMessage(
                            `Votre application a bien été créée !`,
                            config.INFRA_OPI_ROOM_ID,
                        );
                        console.log(`Application created`);
                    } catch (error) {
                        await messageTreatmentRepository.insert({
                            kind: 'error',
                            messageExternalId: data.messageId,
                        });
                        matrix.sendMessage(
                            `Une erreur est survenue lors de la création de votre application`,
                            config.INFRA_OPI_ROOM_ID,
                        );
                        console.error(error);
                    }
                } catch (error) {
                    await messageTreatmentRepository.insert({
                        kind: 'unauthorized',
                        messageExternalId: data.messageId,
                    });
                    matrix.sendMessage(
                        `Vous n'être pas autorisé à effectuer cette action. Veuillez demander à un administrateur.`,
                        config.INFRA_OPI_ROOM_ID,
                    );
                    console.error(error);
                }
            } catch (error) {
                await messageTreatmentRepository.insert({
                    kind: 'irrelevant',
                    messageExternalId: data.messageId,
                });
                matrix.sendMessage(
                    `Je n'ai pas pu interpréter votre requête. Veuillez réessayer.`,
                    config.INFRA_OPI_ROOM_ID,
                );
                console.error(error);
            }
        },
    };
}

export { buildInfraBotListener };

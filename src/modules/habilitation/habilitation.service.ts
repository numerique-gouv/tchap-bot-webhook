import { DataSource } from 'typeorm';
import { Habilitation } from './Habilitation.entity';

function buildHabilitationService(dataSource: DataSource) {
    const habilitationRepository = dataSource.getRepository(Habilitation);
    return {
        assertUserIsAuthorizedToPerform,
        createHabilitation,
        getHabilitations,
    };

    async function assertUserIsAuthorizedToPerform(userId: string) {
        await habilitationRepository.findOneOrFail({ where: { userId } });
    }

    async function createHabilitation(userId: Habilitation['userId']) {
        return habilitationRepository.insert({ userId });
    }

    async function getHabilitations() {
        const habilitations = await habilitationRepository.find({});
        return habilitations.map((habilitation) => habilitation.userId);
    }
}

export { buildHabilitationService };

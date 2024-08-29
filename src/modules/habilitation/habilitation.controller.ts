import { DataSource } from 'typeorm';
import { buildHabilitationService } from './habilitation.service';

function buildHabilitationController(dataSource: DataSource) {
    const habilitationService = buildHabilitationService(dataSource);
    return {
        createHabilitation,
        getHabilitations,
    };

    async function createHabilitation(params: { body: { userId: string } }) {
        return habilitationService.createHabilitation(params.body.userId);
    }

    async function getHabilitations() {
        return habilitationService.getHabilitations();
    }
}

export { buildHabilitationController };

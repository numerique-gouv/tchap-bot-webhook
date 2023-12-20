import { DataSource } from 'typeorm';
import { buildHabilitationService } from './habilitation.service';

function buildHabilitationController(dataSource: DataSource) {
    const habilitationService = buildHabilitationService(dataSource);
    return {
        createHabilitation,
    };

    async function createHabilitation(params: { body: { userId: string } }) {
        return habilitationService.createHabilitation(params.body.userId);
    }
}

export { buildHabilitationController };

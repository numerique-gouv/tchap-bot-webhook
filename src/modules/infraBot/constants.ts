import { config } from '../../config';
import { commandKindType } from './types';

const commandKinds = ['scalingo:create', 'scalingo:rename'] as const;
const INFRA_OPI_SCALINGO_CREATE_URL = `${config.INFRA_OPI_BASE_URL}/scalingo/apps`;
const INFRA_OPI_SCALINGO_RENAME_URL = `${config.INFRA_OPI_BASE_URL}/scalingo/apps/rename`;

const infraApiCommandMapping: Record<
    commandKindType,
    { url: string; method: 'post'; successMessage: string }
> = {
    'scalingo:create': {
        url: INFRA_OPI_SCALINGO_CREATE_URL,
        method: 'post',
        successMessage: 'Votre application a bien été créée.',
    },
    'scalingo:rename': {
        url: INFRA_OPI_SCALINGO_RENAME_URL,
        method: 'post',
        successMessage: 'Votre application a bien été renommée.',
    },
};

export { commandKinds, infraApiCommandMapping };

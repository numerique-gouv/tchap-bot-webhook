import { config } from '../../config';
import { commandKindType } from './types';

const commandKinds = ['scalingo:create', 'scalingo:rename'] as const;
const INFRA_OPI_SCALINGO_CREATE_URL = `${config.INFRA_OPI_BASE_URL}/scalingo/apps`;
const INFRA_OPI_SCALINGO_RENAME_URL = `${config.INFRA_OPI_BASE_URL}/scalingo/apps/rename`;

const infraApiCommandMapping: Record<commandKindType, string> = {
    'scalingo:create': INFRA_OPI_SCALINGO_CREATE_URL,
    'scalingo:rename': INFRA_OPI_SCALINGO_RENAME_URL,
};

export { commandKinds, infraApiCommandMapping };

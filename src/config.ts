import pgConnectionString from 'pg-connection-string';
import dotenv from 'dotenv';

dotenv.config();

let databaseConfig: Record<string, string> = {};

if (process.env.DATABASE_URL) {
    const infos = pgConnectionString.parse(process.env.DATABASE_URL);
    databaseConfig.DATABASE_PORT = infos.port || '';
    databaseConfig.DATABASE_HOST = infos.host || '';
    databaseConfig.DATABASE_NAME = infos.database || '';
    databaseConfig.DATABASE_USER = infos.user || '';
    databaseConfig.DATABASE_PASSWORD = infos.password || '';
}

const config = {
    MATRIX_SERVER_URL: process.env.MATRIX_SERVER_URL || '',
    DEFAULT_ROOM_ID: process.env.DEFAULT_ROOM_ID || '',
    TCHAP_USERNAME: process.env.TCHAP_USERNAME || '',
    TCHAP_PASSWORD: process.env.TCHAP_PASSWORD || '',
    PORT: process.env.PORT || 3001,
    DATABASE_PORT: process.env.DATABASE_PORT ? Number(process.env.DATABASE_PORT) : 5432,
    DATABASE_HOST: process.env.DATABASE_HOST || '',
    DATABASE_NAME: process.env.DATABASE_NAME || '',
    DATABASE_USER: process.env.DATABASE_USER || '',
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
    ...databaseConfig,
};

export { config };

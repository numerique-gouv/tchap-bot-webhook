import dotenv from 'dotenv';

dotenv.config();

const config = {
    MATRIX_SERVER_URL: process.env.MATRIX_SERVER_URL || '',
    ROOM_ID: process.env.ROOM_ID || '',
    TCHAP_USERNAME: process.env.TCHAP_USERNAME || '',
    TCHAP_PASSWORD: process.env.TCHAP_PASSWORD || '',
    PORT: process.env.PORT || 3001,
};

export { config };

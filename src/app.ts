import Express from 'express';
import bodyParser from 'body-parser';
import { buildRouter } from './router';
import { config } from './config';
import { dataSource } from './dataSource';
import { matrix } from './lib/matrix';

async function runApp() {
    try {
        console.log('Connexion à la db...');
        await dataSource.initialize();
        console.log('Connexion à la db réussie !');
        await dataSource.runMigrations();
    } catch (error) {
        console.error(error);
    }

    try {
        console.log(`Initialisation du client Matrix...`);
        await matrix.initialize();
        console.log(`Initialisation du client Matrix réussie !`);
    } catch (error) {
        console.error(error);
    }

    const app = Express();
    const router = await buildRouter(dataSource);

    app.use('/api', bodyParser.json(), router);

    app.listen(config.PORT, async () => {
        console.log(`Server is running on port ${config.PORT}`);
    });
}

runApp();

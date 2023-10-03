import Express, { Response } from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { buildRouter } from './router';
import { config } from './config';
import { dataSource } from './dataSource';

async function runApp() {
    try {
        console.log('Connexion à la db...');
        await dataSource.initialize();
        console.log('Connexion réussie !');
        await dataSource.runMigrations();
    } catch (error) {
        console.error(error);
    }

    const app = Express();
    const router = await buildRouter(dataSource);

    app.use('/api', bodyParser.json(), router);

    app.use(Express.static(path.join(__dirname, '..', 'src', 'client', 'build')));

    app.get('*', (_, res: Response) => {
        res.sendFile(path.join(__dirname, '..', 'src', 'client', 'build', 'index.html'));
    });

    app.listen(config.PORT, async () => {
        console.log(`Server is running on port ${config.PORT}`);
    });
}

runApp();

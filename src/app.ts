import Express, { Response } from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { buildRouter } from './router';
import { config } from './config';

async function runApp() {
    const app = Express();
    const router = await buildRouter();

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

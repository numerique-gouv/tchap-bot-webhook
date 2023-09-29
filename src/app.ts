import Express from 'express';
import bodyParser from 'body-parser';
import { buildRouter } from './router';
import { config } from './config';

async function runApp() {
    const app = Express();
    const router = await buildRouter();

    app.use('/api', bodyParser.json(), router);

    app.listen(config.PORT, async () => {
        console.log(`Server is running on port ${config.PORT}`);
    });
}

runApp();

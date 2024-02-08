import express from 'express';

import { routes } from './routes/routes.js';
import { CONFIGURATION } from './utility/const.js';

const app = new express();

app.use(express.json());
app.get('/', (req, res) => {
    res.send("Server is UP");
});

app.use('/api', routes);

app.listen(CONFIGURATION.PORT, CONFIGURATION.HOST, () => { console.log("server is listening")});

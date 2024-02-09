import express from 'express';
import cluster from 'cluster';
import {cpus} from 'os';


import { routes } from './routes/routes.js';
import { CONFIGURATION } from './utility/const.js';

const app = new express();
const numCPUs = cpus().length;

if(cluster.isPrimary){
    for(let i =0; i< numCPUs; i++){
        cluster.fork();
    }
    cluster.on('exit', (Worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    });
}
else{
    app.use(express.json());
    app.get('/', (req, res) => {
        res.send("Server Check");
    });
    
    app.use('/api', routes);
    
    app.listen(CONFIGURATION.PORT, CONFIGURATION.HOST, () => { console.log("server is listening")});
}


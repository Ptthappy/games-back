// src/app.ts
import config = require('./config');
import * as express from 'express';
import * as  cluster from 'cluster';
import * as bodyParser from 'body-parser';
import logger = require('./utils/logger');
//import controllers
import * as healthcheckController from './controllers/controller-healthcheck';
import * as gamesController from './controllers/games-controller';
import * as userController from './controllers/user-controller';
import { cpus } from 'os';
const numCPUs = cpus().length;
const gamesManager = require('./utils/games-manager');
const cors = require('cors');

if (cluster.isMaster) {
    // create a worker for each CPU
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    cluster.on('online', (worker) => {
        logger.info(`worker online, worker id: ${worker.id}`);
    });
    //if worker dies, create another one
    cluster.on('exit', (worker, code, signal) => {
        logger.error(`worker died, worker id: ${worker.id} | signal: ${signal} | code: ${code}`);
        cluster.fork();
    });    
} else {
    //create express app
    const app: express.Express = express();
    const router: express.Router = express.Router();

    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(router);
    app.use(cors({
        origin: true,
        // methods: 'POST, PUT, GET, DELETE, OPTIONS',
        // allowedHeaders: 'Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization',
        credentials: true
    }));
    app.options('*', cors());

    //healthcheck and other routes
    router.get('/healthcheck', healthcheckController.healthcheck);
    router.get('/games', gamesController.getGames);
    router.get('/deals', gamesController.getDeals);
    router.post('/login', userController.login)

    if(cluster.worker.id === 1) {
        //clean db
        gamesManager.clearDB();
        //refill db
        gamesManager.getData();
    }
    app.listen(config.port, function () {
        logger.info(`worker started: ${cluster.worker.id} | server listening on port: ${config.port}`);
    });
}

import http from 'http';
import config from './config/config';
import logging from './config/logging';
import router from './server';
const NAMESPACE = 'Server';

const httpServer = http.createServer(router);

httpServer.listen(config.server.port, () => logging.info(NAMESPACE, `Server is running ${config.server.hostname}:${config.server.port}`));

import http from 'http';
import bodyParser from 'body-parser';
import express from 'express';
import logging from './config/logging';
import config from './config/config';
import axios from 'axios';
import { connectDB } from './config/database';
import patern from './routes/patern';

const NAMESPACE = 'Server';
const router = express();

connectDB();

/** Log the request */
router.use((req, res, next) => {
    /** Log the req */
    logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
        /** Log the res */
        logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
    });

    next();
});

/** Parse the body of the request */
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

/** Rules of our API */
router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }

    next();
});

/** Routes go here */
router.use('/api/search', patern);

/** Error handling */
router.use((req, res, next) => {
    const error = new Error('Not found');

    res.status(404).json({
        message: error.message
    });
});

const httpServer = http.createServer(router);

httpServer.listen(config.server.port, () => logging.info(NAMESPACE, `Server is running ${config.server.hostname}:${config.server.port}`));

const isPrime = (num: any) => {
    for (let i = 2; i < num; i++) if (num % i === 0) return false;
    return num > 1;
};

// httpServer.listen(config.server.port, async () => {
//     try {
//         let input = '000';
//         let AllValues: any = [];
//         let values: any = [];
//         let keys: any = [];
//         let refined: any;

//         // GET TEXT FILE WITH PRIMES
//         const primes = await axios.get('https://www.di-mgt.com.au/primes10000.txt');

//         //CREATE AN ARRAY WITH VALUES BASED ON LINE BREAK
//         const textByLine = primes.data.split('\n');

//         // SPLIT ARRAY TO KEYS AND VALUES
//         textByLine.forEach((item: any) => AllValues.push(item.split(':')));

//         // PUT KEYS AND VALUES IN RESPECTIVE ARRAYS
//         AllValues.forEach((element: any[]) => {
//             keys.push(element[0]);
//             values.push(element[1]);
//         });

//         let index = values.findIndex((item: any) => item.includes(input));
//         refined = values[index].split(' ');
//         refined.shift();
//         refined.pop();
//         console.log(refined);

//         console.log(`${keys[index]}: ${values[index]}`);
//         let selectedIndex = refined.findIndex((item: any) => item.includes(input));
//         console.log(refined[selectedIndex]);
//     } catch (error) {
//         console.log(error);
//     }
// });

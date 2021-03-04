import express from 'express';
import logging from '../config/logging';
import { Patern } from '../models/Patern';
import axios from 'axios';

const router = express.Router();

router.get('/paterns', async (req, res) => {
    try {
        let paterns = await Patern.find().sort({ date: 'desc' });
        if (!paterns) {
            return res.status(404).json(paterns);
        }
        res.json(paterns);
    } catch (error) {
        res.status(500).send('Server Error');
        logging.warn('paterns', error.message, error);
    }
});

router.post('/patern', async (req, res) => {
    // DECLARING ARRAYS TO USE
    let AllValues: any = [];
    let values: any = [];
    let keys: any = [];
    let refined: any;

    // GET TEXT FILE WITH PRIMES
    const primes = await axios.get('https://www.di-mgt.com.au/primes10000.txt');

    //CREATE AN ARRAY WITH VALUES BASED ON LINE BREAK
    const textByLine = primes.data.split('\n');

    // SPLIT ARRAY TO KEYS AND VALUES
    textByLine.forEach((item: any) => AllValues.push(item.split(':')));

    // PUT KEYS AND VALUES IN RESPECTIVE ARRAYS
    AllValues.forEach((element: any[]) => {
        keys.push(element[0]);
        values.push(element[1]);
    });
    const { input } = req.body;

    let patern: any;

    try {
        let index = values.findIndex((item: any) => item.includes(input));
        console.log(index);
        if (!index) {
            patern = new Patern({
                input,
                result: null,
                message: `No Match was found for ${input}`
            });
            await patern.save();
            return res.json(patern);
        }
        refined = values[index].split(' ');
        refined.shift();
        refined.pop();
        let selectedIndex = refined.findIndex((item: any) => item.includes(input));
        patern = new Patern({
            input,
            result: {
                key: keys[index],
                value: values[index],
                selected: refined[selectedIndex],
                fullLine: `${keys[index]}: ${values[index]}`
            }
        });

        await patern.save();

        res.json(patern);
    } catch (error) {
        res.status(500).send('Server Error');
        logging.warn('SEARCH', error.message, error);
    }
});

export = router;

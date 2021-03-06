// @ts-nocheck
const app = require('../server');
const mongoose = require('mongoose');
const { Patern } = require('../models/Patern');
const superTest = require('supertest');

const MongoURI =
    'mongodb+srv://user1992:user-1992@zazuchallenge-shard-00-00.ohwxk.mongodb.net:27017,zazuchallenge-shard-00-01.ohwxk.mongodb.net:27017,zazuchallenge-shard-00-02.ohwxk.mongodb.net:27017/jestDB?ssl=true&replicaSet=atlas-49mt5f-shard-0&authSource=admin&retryWrites=true&w=majority'; //= process.env.MongoURI;

beforeEach((done) => {
    mongoose.createConnection(MongoURI, { useNewUrlParser: true, useUnifiedTopology: true }, () => done());
});

afterEach((done) => {
    mongoose.connection.db.dropDatabase(() => {
        mongoose.connection.close(() => done());
    });
});

beforeAll((done) => {
    done();
});

afterAll((done) => {
    // Closing the DB connection allows Jest to exit successfully.
    mongoose.connection.close();
    // app.close();

    done();
});

test('GET /api/search/paterns', async () => {
    const patern = await Patern.create({
        input: '268',
        result: { key: '380', value: '2621 2633 2647 2657 2659 2663 2671 2677 2683 2687', selected: '2683', fullLine: '380: 2621 2633 2647 2657 2659 2663 2671 2677 2683 2687' }
    });
    await superTest(app)
        .get('/api/search/paterns')
        .then((res) => {
            expect(Array.isArray(res.body)).toBeTruthy();
            // expect(res.body.length).toEqual(1);

            // CHECK DATA
            expect(res.body); //.toBe(patern._id);
            // expect(res.body)//.toBe(patern.key);
            // expect(res.body)//.toBe(patern.result);
        });
});

test('POST /api/search/patern', async () => {
    const patern = await Patern.create({
        input: '268',
        result: { key: '380', value: '2621 2633 2647 2657 2659 2663 2671 2677 2683 2687', selected: '2683', fullLine: '380: 2621 2633 2647 2657 2659 2663 2671 2677 2683 2687' }
    });
    await superTest(app)
        .post('/api/search/patern')
        .send({ input: '268' })
        .expect(200)
        .then(async (res) => {
            // CHECK RESPONSE
            expect(res.body._id).toBe(patern._id);
            expect(res.body.input).toBe(patern.input);
            expect(res.body.result).tobe(patern.result);

            // CHECK DB
            const data = await Patern.findOne({ _id: res.body._id });
            expect(data).toBeTruthy();
            expect(data.input).toBe(patern.input);
            expect(data.result).toBe(patern.result);
        });
});

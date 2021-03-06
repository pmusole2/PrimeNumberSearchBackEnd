import app from '../server';
import { connectDB, close } from '../config/database';
var chai = require('chai'),
    chaiHttp = require('chai-http');
import 'mocha';

chai.use(chaiHttp);

describe('GET /api/search/paterns', () => {
    before((done) => {
        connectDB()
            .then(() => done())
            .catch((err) => done(err));
    });
    after((done) => {
        close()
            .then(() => done())
            .catch((err) => done(err));
    });
    it('OK, Make get request for patern searches', (done) => {
        chai.request(app)
            .get('/api/search/paterns')
            //@ts-ignore
            .then((res) => {
                const body = res.body;
                //@ts-ignore
                chai.expect(body);
                done();
            })
            //@ts-ignore
            .catch((err) => done(err));
    });
});

describe('POST /api/search/patern', () => {
    before((done) => {
        connectDB()
            .then(() => done())
            .catch((err) => done(err));
    });
    after((done) => {
        close()
            .then(() => done())
            .catch((err) => done(err));
    });

    it('OKAY, Making new search works', (done) => {
        chai.request(app)
            .post('/api/search/patern')
            .send({ input: '302' })
            //@ts-ignore
            .then((res) => {
                const body = res.body;
                //@ts-ignore
                chai.expect(body).to.contain.property('_id');
                //@ts-ignore
                chai.expect(body).to.contain.property('input');
                //@ts-ignore
                chai.expect(body).to.contain.property('result');
                done();
            })
            //@ts-ignore
            .catch((err) => done(err));
    });
});

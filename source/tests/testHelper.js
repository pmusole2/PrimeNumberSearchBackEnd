var supertest = require('supertest');
var expect = chai.expect;
// import chai from 'chai';
var chai = require('chai');
// import { describe, it } from 'mocha';
var { describe, it } = require('mocha');

module.exports = {
    request: supertest,
    expect: expect,
    // chai: chai,
    describe: describe,
    it: it
};

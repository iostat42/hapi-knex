'use strict';

// Load modules
const Hoek = require('hoek');
const Lab = require('lab');
const Code = require('code');
const Hapi = require('hapi');
const Config = require('./config');

// Test shortcuts
const lab = exports.lab = Lab.script();
const describe = lab.experiment;
const it = lab.test;
const expect = Code.expect;

// Tests
describe('Plugin Registration', () => {

    it('it registers successfully', (done) => {

        const server = new Hapi.Server();

        server.connection();

        server.register(Config.plugins, done);
    });

    it('handles invalid options', (done) => {

        const server = new Hapi.Server();

        server.connection();

        const tmpPlugins = Hoek.clone(Config.plugins);

        tmpPlugins[0].options = { derp: true };

        const fn = () => {

            server.register(tmpPlugins, () => {});
        };

        expect(fn).to.throw();
        done();
    });
});

'use strict';

// Load modules
const Hoek = require('hoek');
const Joi = require('joi');
const Knex = require('knex');
const Pkg = require('../package.json');

// Declare internals
const internals = {};

internals.schema = Joi.object().keys({
    client: Joi.string().required(),
    connection: Joi.alternatives().try(
        Joi.object(),
        Joi.string()
    ).required(),
    pool: Joi.object().keys({
        min: Joi.number().integer().default(0),
        max: Joi.number().integer().default(1)
    }),
    migrations: Joi.object().keys({
        directory: Joi.string(),
        tableName: Joi.string()
    }),
    seeds: Joi.object().keys({
        directory: Joi.string()
    }),
    useNullAsDefault: Joi.boolean().default(true),
    debug: Joi.boolean().default(false)
});

exports.register = function (server, options, next) {

    const result = Joi.validate(options, internals.schema);
    Hoek.assert(!result.error, 'Invalid', 'pluginOptions', 'options', result.error);

    // Knex
    const knex = Knex(result.value);

    // Expose
    server.expose('knex', knex);

    // Decorate
    server.decorate('server', 'knex', knex);
    server.decorate('request', 'knex', knex);

    next();
};

exports.register.attributes = {
    pkg: Pkg
};

'use strict';

// Load modules
const Path = require('path');
const Plugin = require('..');

const config = {
    knex: {
        client: 'sqlite3',
        connection: {
            filename: Path.join(__dirname, './artifacts/plugin.sqlite')
        },
        migrations: {
            directory: Path.join(__dirname, '../migrations'),
            tableName: 'migrations_plugin'
        },
        seeds: {
            directory: Path.join(__dirname, './seeds')
        },
        useNullAsDefault: true
    }
};

module.exports = {
    plugins: [
        {
            register: Plugin,
            options: config.knex
        }
    ]
};

/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
    /**
     * built-in config
     * @type {Egg.EggAppConfig}
     **/
    const config = exports = {};

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1568684471518_6108';

    // add your middleware config here
    config.middleware = [];

    config.security = {
        csrf: {
            enable: false,
        },
    };

    config.sequelize = {
        dialect: 'mysql',
        host: '128.0.0.1',
        username: 'root',
        password: '96aab0e1d8579972',
        port: 3306,
        database: 'xxx',
        timezone: '+08:00',
    };

    config.io = {
        init: {
            wsEngine: 'ws',
        }, // passed to engine.io
        namespace: {
            '/': {
                connectionMiddleware: ['auth'],
                packetMiddleware: [],
            },
        },
        redis: {
            host: "127.0.0.1",
            port: "6379",
            auth_pass: "xxx",
            db: 7,
        },
    };

    // add your user config here
    const userConfig = {
        // myAppName: 'egg',
    };

    config.cors = {
        origin: '*',
        allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
    };

    config.view = {
        defaultViewEngine: 'nunjucks',
        mapping: { '.tpl': 'nunjucks' },
    };

    config.redis = {
        client: {
            port: 6379,          // Redis port
            host: '127.0.0.1',   // Redis host
            password: 'xxx',
            db: 6,
        },
    }

    exports.validate = {
        // convert: false,
        // validateRoot: false,
    };

    return {
        ...config,
        ...userConfig,
    };
};

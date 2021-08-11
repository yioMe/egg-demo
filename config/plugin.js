'use strict';

/** @type Egg.EggPlugin */

exports.sequelize = {
    enable: true,
    package: 'egg-sequelize',
};

exports.nunjucks = {
    enable: true,
    package: 'egg-view-nunjucks'
};

exports.redis = {
    enable: true,
    package: 'egg-redis',
};

exports.io = {
    enable: true,
    package: 'egg-socket.io',
};

exports.validate = {
    enable: true,
    package: 'egg-validate',
};

exports.cors = {
    enable: true,
    package: 'egg-cors',
};
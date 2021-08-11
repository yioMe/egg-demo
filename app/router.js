'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller, io } = app;
    router.get('/', controller.home.index);
    // 服务说明
    router.get('/api/htdocs/agree', controller.htdocs.agree.render);
    router.resources('/api/email', controller.sendEmail);
    router.resources('/api/user', controller.user.user);
    router.post('/api/userForget', controller.user.user.forget);
    router.post('/api/userLogin', controller.user.user.login);
    router.post('/api/userVerify', controller.user.user.verify);
    router.get('/api/test', controller.home.test);
    // =========websocket============
    io.of('/').route('exchange', io.controller.nsp.exchange);

};

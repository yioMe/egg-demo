'use strict';

const Controller = require('egg').Controller;

class AgreeController extends Controller {

    async render() {
        await this.ctx.render('agree.tpl');
    }

}
module.exports = AgreeController;
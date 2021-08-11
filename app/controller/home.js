'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
    async index() {
        const ctx = this.ctx;
        // let data = await ctx.model.TbBrand.findAll();
        ctx.body = "data";
    }

    async test() {
        const { ctx } = this;
        console.log(ctx.query)
        ctx.body = 1;
    }

}

module.exports = HomeController;

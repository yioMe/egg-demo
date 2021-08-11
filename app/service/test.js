'use strict';

const Service = require('egg').Service;

const attributes = ["id",'order_id',];
const exclude = ["id"];

class TestService extends Service{
    
    async findAll() {
       return this.ctx.model.tb_order.findAll();
    }

}

module.exports = TestService;
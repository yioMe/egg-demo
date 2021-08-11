'use strict';

const Service = require('egg').Service;
const token = require('../utils/token');
const attributes = ["id",'email','key'];
const exclude = ["id"];

class UserService extends Service{
    
    async findEmail(email) {
       return this.ctx.model.TUser.findOne({
           where: {
                email
           }
       });
    }

    async register(data) {
        return this.ctx.model.TUser.create({
            email: data.email,
            password: data.password,
            key: data.key,
            Inviter: data.Inviter || '',
            last_login_time: new Date(),
        })
    }

    async forget(data) {
        return this.ctx.model.TUser.update({
            email: data.email,
            password: data.password,
            key: data.key,
            last_login_time: new Date(),
        },{
            where: {
                email: data.email
            }
        })
    }

    async login (email, password) {
        return this.ctx.model.TUser.findOne({
            where: {
                 email,
                 password
            }
        });
    }
 
}

module.exports = UserService;
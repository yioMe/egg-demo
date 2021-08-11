'use strict';

const Controller = require('egg').Controller;
const eMail = require('../utils/eMail');
const randomCode = require('../utils/randomCode');

class sendEmail extends Controller {

    async create() {
        let { ctx ,app } = this;
        let params = ctx.request.body;
        const createRule = {
            email: 'email',
        };

        try{
            ctx.validate(createRule, ctx.request.body);
        }catch(e){
            console.error(e)
            ctx.body = {code:-1, data: '', msg: '邮件不正确'}
            return;
        }
        let Code = null;
        if(await app.redis.get(params.email)){
            ctx.body = {code: -1, data: '', msg: '发送邮件频发!'}
            return;
        }else{
            Code = await randomCode()
            await app.redis.set(params.email,Code,"ex",60);
        }

        let content = `您的注册验证码是 ${Code} ，如非本人请求请忽视！`;

        await eMail(params.email,content);

        ctx.body = {code: 0, data: content, msg: '验证码发送成功!'};

    }

}
module.exports = sendEmail;
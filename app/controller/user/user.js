'use strict';

const Controller = require('egg').Controller;
const md5 = require('md5');
const nanoid = require('nanoid');
const token = require('../../utils/token');

class UserController extends Controller {

    // 注册
    async create() { 
        try {
            const { ctx, app } = this;
            const params = ctx.request.body;
            // 设置参数效验规则
            const createRule = {
                email: 'email',
                password: { type: 'password', required: true, allowEmpty: false, min: 6, max: 16 },
                code: { type: 'string', required: true }
            };

            try {
                ctx.validate(createRule, params);
            } catch (e) {
                ctx.logger.warn(e);
                ctx.body = { code: -1, data: '', msg: '参数不正确!' }
                return;
            }

             // 判断验证码是否正确
            if (await app.redis.get(params.email) != params.code) {
                ctx.body = { code: -1, data: '', msg: "邮箱验证码不正确，或者已过期!" };
                return;
            }

            // 查询此用户是否已经注册
            if (await ctx.service.user.findEmail(params.email)) {
                ctx.body = { code: -1, data: '', msg: "用户已存在!" };
                return;
            }

            // 生成私钥
            let key = nanoid(20);

            params.password = md5(key + params.password);
            params.key = key;
            if (ctx.service.user.register(params)) {
                app.redis.del(params.email); // 及时删除已经使用的验证码
                ctx.body = { code: 0, data: '', msg: '注册成功!' };
                return;
            }
            ctx.body = { code: -1, data: '', msg: '注册失败，请稍后再试!' };
        } catch (e) {
            this.ctx.logger.warn(e);
            this.ctx.body = { code: -1, data: '', msg: '系统错误!' }
        }
    }
    // 找回密码
    async forget() {
        try {
            let { ctx, app } = this;
            const params = ctx.request.body;
            // 设置参数效验规则
            const createRule = {
                email: 'email',
                password: { type: 'password', required: true, allowEmpty: false, min: 6, max: 16 },
                code: { type: 'string', required: true }
            };

            try {
                ctx.validate(createRule, params);
            } catch (e) {
                ctx.logger.warn(e);
                ctx.body = { code: -1, data: '', msg: '参数不正确!' }
                return;
            }

              // 判断验证码是否正确
            if (await app.redis.get(params.email) != params.code) {
                ctx.body = { code: -1, data: '', msg: "邮箱验证码不正确，或者已过期!" };
                return;
            }

            // 查询此用户是否已经注册
            if (!await ctx.service.user.findEmail(params.email)) {
                ctx.body = { code: -1, data: '', msg: "用户不存在!" };
                return;
            }

          

            // 生成私钥
            let key = nanoid(20);

            params.password = md5(key + params.password);
            params.key = key;
            if (ctx.service.user.forget(params)) {
                app.redis.del(params.email); // 及时删除已经使用的验证码
                ctx.body = { code: 0, data: '', msg: '重置密码成功!' };
                return;
            }
            ctx.body = { code: -1, data: '', msg: '重置密码失败，请稍后再试!' };
        } catch (e) {
            this.ctx.logger.warn(e);
            this.ctx.body = { code: -1, data: '', msg: '系统错误!' }
        }
    }
    // 登录
    async login() {
        try {
            let { ctx, app } = this;
            const params = ctx.request.body;

            const createRule = {
                email: 'email',
                password: { type: 'password', required: true, allowEmpty: false, min: 6, max: 16 },
            };

            try {
                ctx.validate(createRule, params);
            } catch (e) {
                ctx.logger.warn(e);
                ctx.body = { code: -1, data: '', msg: '参数不正确!' }
                return;
            }

             // 查询此用户是否已经注册
            let userData = await ctx.service.user.findEmail(params.email);
             if (!userData) {
                ctx.body = { code: -1, data: '', msg: "用户不存在!" };
                return;
            }

            params.password = md5(userData.dataValues.key + params.password);

            if (!await ctx.service.user.login(params.email, params.password)) {
                ctx.body = { code: -1, data: '', msg: "账号或密码不正确!" };
               return;
           }

            let Usertoken = await token.setToken(userData.dataValues.id);

            ctx.body = { code:0, data: { toKen: Usertoken }, msg: '登陆成功!' }

        }catch(e) {
            this.ctx.logger.warn(e);
            this.ctx.body = { code: -1, data: '', msg: '系统错误!' }
        }
    }
    // 效验token
    async verify() {
        try {
            let { ctx, app } = this;
            const params = ctx.request.body;
            if(!params.token) {
                ctx.body = { code: -1, data: '', msg: "参数不正确!" };
                return;
            }
            let tokenStatus = await token.getToken(params.token);
            console.log(tokenStatus)
            if(!tokenStatus) {
                ctx.body = { code: -1, data: '', msg: "token已过期" };
                return;
            }

            ctx.body = { code: 0, data: '', msg: "效验成功!" };

            
        }catch(e) {
            this.ctx.logger.warn(e);
            this.ctx.body = { code: -1, data: '', msg: '系统错误!' }
        }
    }

}

module.exports = UserController;

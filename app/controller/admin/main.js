'use strict'

const Controller = require('egg').Controller

class MainController extends Controller{
    async index(){
        // 首页的文章列表数据
        const {ctx} = this
        ctx.body = 'hi egg'
    }
    async checkLogin(){
        const {ctx} = this
        let password = ctx.request.body.password
        let username = ctx.request.body.username


        console.log('username',username,'  password',password)
        // sql存在注入的问题
        let sql = `select userName  from  admin_user where username='${username}' and password = '${password}'`
        // let sql = `select username  from  admin_user where username='wjb' and password = '123'`
        const res = await this.app.mysql.query(sql)
        console.log(res)
        if(res.length>0){
            // openId 用于session进行存储信息
            let openId = new Date().getTime()
            ctx.session.openId = openId
            ctx.body = {'data':'登录成功','openId':openId}
        }else{
            this.ctx.body={data:'登录失败'}
        } 
    }
}

module.exports = MainController
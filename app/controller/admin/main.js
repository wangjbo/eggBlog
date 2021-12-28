'use strict'

const Controller = require('egg').Controller

class MainController extends Controller {
    async index() {
        // 首页的文章列表数据
        const { ctx } = this
        ctx.body = 'hi egg'
    }
    async checkLogin() {
        const { ctx } = this
        let password = ctx.request.body.password
        let username = ctx.request.body.username


        console.log('username', username, '  password', password)
        // sql存在注入的问题
        let sql = `select userName  from  admin_user where username='${username}' and password = '${password}'`
        // let sql = `select username  from  admin_user where username='wjb' and password = '123'`
        const res = await this.app.mysql.query(sql)
        console.log(res)
        if (res.length > 0) {
            // openId 用于session进行存储信息
            let openId = new Date().getTime()
            ctx.session.openId = openId
            ctx.body = { 'data': '登录成功', 'openId': openId }
        } else {
            this.ctx.body = { data: '登录失败' }
        }
    }
    // 获取类别标签
    async getTypeInfo() {
        const resType = await this.app.mysql.select('type')
        this.ctx.body = { data: resType }
    }
    // 添加文章
    async addArticle() {
        let tempArticle = this.ctx.request.body
        // 第一个参数是数据库的表名，第二个参数是要插入的数据对象
        const result = await this.app.mysql.insert('article', tempArticle)
        const insertSuccess = result.affectedRows === 1
        const insertId = result.insertId
        this.ctx.body = {
            insertSuccess,
            insertId
        }
    }
    // 修改文章的内容
    async updateArticle() {
        let tmpArticle = this.ctx.request.body
        const result = await this.app.mysql.update('article', tmpArticle);
        const updateSuccess = result.affectedRows === 1;
        this.ctx.body = {
            updateSuccess
        }
    }
    // 获取所有文章的列表
    async getArticleList() {

        let sql = 'SELECT article.id as id,' +
            'article.title as title,' +
            'article.introduce as introduce,' +
            'article.view_count as view_count,' +
            "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime," +
            'type.typeName as typeName ' +
            'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
            'ORDER BY article.id DESC '

        const resList = await this.app.mysql.query(sql)
        this.ctx.body = { list: resList }

    }
    //删除文章
    async delArticle() {
        let id = this.ctx.params.id
        const res = await this.app.mysql.delete('article', { 'id': id })
        this.ctx.body = { data: res }
    }
    //根据文章ID得到文章详情，用于修改文章
    async getArticleById() {
        let id = this.ctx.params.id

        let sql = 'SELECT article.id as id,' +
            'article.title as title,' +
            'article.introduce as introduce,' +
            'article.article_content as article_content,' +
            "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime," +
            'article.view_count as view_count ,' +
            'type.typeName as typeName ,' +
            'type.id as typeId ' +
            'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
            'WHERE article.id=' + id
        const result = await this.app.mysql.query(sql)
        this.ctx.body = { data: result }
    }


}

module.exports = MainController
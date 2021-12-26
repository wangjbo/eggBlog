'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    let result = await this.app.mysql.get("article", {})
    console.log(result)
    ctx.body = result
  }
  async getArticleList() {
    let sql = 'select article.id as id,' +
      'article.title as title,' +
      'article.introduce as introduce,' +
      "FROM_UNIXTIME(article.addTime,'%Y年%m月%d %h:%m:%s') as addTime," +
      'article.view_count as view_count ,' +
      // 'article.article_content as content,'+
      'type.typeName as typeName, ' +
      'type.id as typeId ' +
      'FROM article LEFT JOIN type ON article.type_id = type.Id'
    const results = await this.app.mysql.query(sql)
    this.ctx.body = {
      data: results
    }
  }
  // 根据id获得文章的详细信息
  async getArticleById() {
    let { ctx } = this
    let id = ctx.params.id
    let sql = 'select article.id as id,' +
      'article.title as title,' +
      'article.introduce as introduce,' +
      "FROM_UNIXTIME(article.addTime,'%Y年%m月%d %h:%m:%s') as addTime," +
      'article.view_count as view_count ,' +
      'article.article_content as content,' +
      'type.typeName as typeName ' +
      'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
      'where article.id=' + id
    const res = await this.app.mysql.query(sql)
    ctx.body = { data: res }
  }
  // 根据类别id获得文章列表
  async getArticleListById() {
    let { ctx } = this
    let id = ctx.params.id
    console.log(id)
    let sql = 'select article.id as id,' +
      'article.title as title,' +
      'article.introduce as introduce,' +
      "FROM_UNIXTIME(article.addTime,'%Y年%m月%d %h:%m:%s') as addTime," +
      'article.view_count as view_count ,' +
      'article.article_content as content,' +
      'type.typeName as typeName ' +
      'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
      'where type.id=' + id
    const res = await this.app.mysql.query(sql)
    ctx.body = {data:res}
  }

}

module.exports = HomeController;

'use strict'


module.exports = (app) => {
    const {router,controller} = app
    const adminauth = app.middleware.adminauth(app)
    router.get('/admin/index',controller.admin.main.index)
    router.post('/admin/checkLogin',controller.admin.main.checkLogin)
    // 用路由守卫进行实现
    router.get('/admin/getTypeInfo',adminauth ,controller.admin.main.getTypeInfo)
    // 文章添加
    router.post('/admin/addArticle',adminauth,controller.admin.main.addArticle)
    // 修改文章
    router.post('/admin/updateArticle',adminauth,controller.admin.main.updateArticle)
    // 获取所有文章的列表
    router.get('/admin/getArticleList',adminauth,controller.admin.main.getArticleList)
    // 删除文章
    router.get('/admin/delArticle/:id',adminauth,controller.admin.main.delArticle)
    // 通过id查询响应的文章
    router.get('/admin/getArticleById/:id',adminauth,controller.admin.main.getArticleById)
    
}
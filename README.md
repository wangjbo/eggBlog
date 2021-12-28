
## 项目简介
是博客系统的中台部分，负责后端逻辑数据的处理
 
## 目录简介 
路由也分为前后台，前台路由是controller中的default
后台是admin文件夹

## 后台数据库的配置
1. 数据库在config.default.js 中配置的
   config.mysql ={
    app:true,     //是否挂载到app下面
    agent:false,  //是否挂载到代理下面
    client:{
      host:'127.0.0.1',      // 数据库地址
      port:'3306',           // 端口
      user:'root',           // 用户名
      password:'root',    // 密码
      database:'db1'    // 连接的数据库名称
    }
  } 
2. 在plugin.js中的配置
    exports.mysql = {
        enable: true,
        package: 'egg-mysql'
    }
3. 在home.js中使用数据库
    // USER是表名
     let result = await this.app.mysql.get("USER",{})

4. 数据库的字段和类型
    1. type数据库
        +----------+--------------+------+-----+---------+-------+
        | Field    | Type         | Null | Key | Default | Extra |
        +----------+--------------+------+-----+---------+-------+
        | id       | int(10)      | YES  |     | NULL    |       |
        | typeName | varchar(255) | YES  |     | NULL    |       |
        | orderNum | int(10)      | YES  |     | NULL    |       |
        +----------+--------------+------+-----+---------+-------+
    2. article数据库
        | Field            | Type         | Null | Key | Default | Extra |
        +------------------+--------------+------+-----+---------+-------+
        | id               | int(10)      | NO   | PRI | NULL    |       |
        | type_id          | int(10)      | NO   |     | NULL    |       |
        | title            | varchar(255) | YES  |     | NULL    |       |
        | article_cointent | text         | YES  |     | NULL    |       |
        | introduce        | text         | YES  |     | NULL    |       |
        | addTime          | int(10)      | YES  |     | NULL    |       |
        | view_count       | int(10)      | YES  |     | NULL    |       |
        +------------------+--------------+------+-----+---------+-------+ 


## 前后端（数据库）数据时间格式不统一的问题
   mysql数据库中存储的时间是 unixTimeStamp的格式，在sql语句中用FROM_UNIXSTAMP转化为相应的格式
   "FROM_UNIXTIME(article.addTime,'%Y年%m月%d %h:%m:%s') as addTime,"+             


## 前端nextjs访问服务端的资源会产生跨域问题，如何解决
    1. yarn add egg-cors


## 怎么上传图片呢? 目前并不能解析图片


## windows 下数据库服务启动不起来
    1. 搜索服务找到mysql5.7
    2. 手动进行启动服务，之后就能解决了。但是要启动mysql5.7的服务，而不是mysql服务


## 解决axios跨域问题 碰到的令人崩溃的问题
    1. axios 跨域问题的localhost和127.0.0.1 是有区别的
    2. 配置了domianWhiteList之后，如果依旧配置了orign，那么orign会覆盖whitlist
    3. 在controller中的router进行配置的时候，一定要注意找的是post还是get请求，如果post请求用get进行接收，那么即使解决了跨域问题，也依旧会报404 not found。
    4. 仔细很重要，特别是基础也很重要 nodejs
    5. 阮一峰 cors跨域问题解析 http://www.ruanyifeng.com/blog/2016/04/cors.html


## 发布博客的后端中，addArticle路径下的session中openId进行验证的时候一直会报错 没有登录，是因为在中间件adminsuth中获取不到正确的session.openId
    1. 主要是后台src下的config下的apiUrl的 url localhost 和 127.0.0.1 存储session的区别
    2. localhost 和 127.0.0.1 地址是不同的，存储session的时候放在不同的地方
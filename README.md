
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
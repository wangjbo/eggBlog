/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1640264023320_7144';

  // add your middleware config here
  config.middleware = [];

  // mysql plugin
  config.mysql = {
    app: true,     //是否挂载到app下面
    agent: false,  //是否挂载到代理下面
    client: {
      host: '127.0.0.1',      // 数据库地址
      port: '3306',           // 端口
      user: 'root',           // 用户名
      password: 'root',    // 密码
      database: 'db1'    // 连接的数据库名称
    }
  }

  // cors跨域
  // 前台的跨域问题的解决
  // config.security = {
  //   csrf: {
  //     enable: false
  //   },
  //   domainWhiteList: ['*']
  // };
  // config.cors = {
  //   origin: '*',
  //   allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS'
  // };
  // 这个配置文件报跨域问题
  // config.security = {
  //   csrf:{
  //     enable: false
  //   },
  //   domainWhiteList:['http://127.0.0.1:3001','http://127.0.0.1:3000','http://127.0.0.1:7001']
  //   // domainWhiteList: [ '*' ]
  // }

  // config.cors = {
  //   // origin: '*',
  //   credentials: true,  //允许Cook可以跨域
  //   allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  // };
  // p33 解决问题的方法
  config.security = {
    csrf: {
      enable: false,
    },
    domainWhiteList: [
      'http://localhost:3000',
      'http://localhost:3001',
      'http://127.0.0.1:3000',
      'http://127.0.0.1:3001',
    ],
  }

  config.cors = {
    // origin: 'http://localhost:3000',
    credentials: true, // 允许Cook可以跨域
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  }


  // 这个配置文件报404
  // config.security = {
  //   csrf:{
  //     enable: false
  //   },
  //   domainWhiteList:['http://127.0.0.1:3001','http://127.0.0.1:3000','http://127.0.0.1:7001']
  // }
  // config.cors = {
  //   origin: ctx => ctx.get('origin'),
  //   credentials: true,  //允许Cook可以跨域
  //   withCredentials: true,
  //   allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  // };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};

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
  config.security = {
    csrf: {
      enable: false
    },
    domainWhiteList: ['*']
  };
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS'
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};

var mysql = require('mysql');

module.exports =  function query(sql, param,callFunction) {
    //1. 配置数据库连接参数,创建连接对象
      var connection = mysql.createConnection({
          host: '10.10.116.23',
          port: 3306,
          user: 'root',
          password: 'root',
          database: 'buildpc'
      });
      //1. 建立连接
      connection.connect();
  
      // 2. 发送SQL语句到mysql服务端执行
  
      connection.query(sql, param, callFunction);
  
      // 3. 关闭连接
      connection.end();
  }

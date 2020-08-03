var mysql = require('mysql')

function query(sql, param,callFunction) {
    //1. 配置数据库连接参数,创建连接对象
      var connection = mysql.createConnection({
          host: localStorage.getItem('host') || '10.10.116.23',
          port: localStorage.getItem('port') || 3306,
          user: localStorage.getItem('user') || 'root',
          password: localStorage.getItem('password') || 'root',
          database: localStorage.getItem('database') || 'buildpc'
      });
      //1. 建立连接
      connection.connect();
  
      // 2. 发送SQL语句到mysql服务端执行
  
      connection.query(sql, param, callFunction);
  
      // 3. 关闭连接
      connection.end();
  }

export default query
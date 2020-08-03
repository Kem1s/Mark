var mysql = require('mysql');
const pool = mysql.createPool({
    host: '10.10.116.23',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'city'
})

// 参考文档 https://www.jianshu.com/p/142f2231355e
// 接收一个sql语句 以及所需的values
// 这里接收第二参数values的原因是可以使用mysql的占位符 '?'
// 比如 query(`select * from my_database where id = ?`, [1])

let query = function (sql, values) {
    // 返回一个 Promise
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) {
                reject(err)
            } else {
                connection.query(sql, values, (err, rows) => {

                    if (err) {
                        reject(err)
                    } else {
                        resolve(rows)
                    }
                    // 结束会话
                    connection.release()
                })
            }
        })
    })
}

module.exports = query


// module.exports = function query(sql, param, callFunction) {
//     //1. 配置数据库连接参数,创建连接对象
//     var connection = mysql.createConnection({
//         host: '10.10.116.23',
//         port: 3306,
//         user: 'root',
//         password: 'root',
//         database: 'city'
//     });
//     //1. 建立连接
//     connection.connect();
// 
//     // 2. 发送SQL语句到mysql服务端执行
// 
//     connection.query(sql, param, callFunction);
// 
//     // 3. 关闭连接
//     connection.end();
// }
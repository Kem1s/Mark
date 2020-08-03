
var exec = require('child_process').exec;

// child_process 执行中文命令 出现乱码解决方法
var iconv = require('iconv-lite');
var encoding = 'cp936';
var binaryEncoding = 'binary';

function compress() {
    var src = 'E:\\SVN\\_____base\\新开发m站'
    var config = {
        indexPath: src + '\\dist\\*.*',         // index.html
        staticPath: src + '\\dist\\static',     // static目录全部文件
        rarPath: src + '\\package\\aaa.rar'     // 存放目录，包括文件名
    }
    let cmd = `rar a -ep1 ${config.rarPath} ${config.indexPath} ${config.staticPath} -y`;
    var workerProcess = exec(cmd, { encoding: binaryEncoding }, function (err, stdout, stderr) {
        if (err) {
            // console.log('err---',err);
            console.log( iconv.decode(new Buffer(err, binaryEncoding), encoding) );
        }
        if(stdout){
            console.log( iconv.decode(new Buffer(stdout, binaryEncoding), encoding) );
        }
        if (stderr) {
            console.log( iconv.decode(new Buffer(stderr, binaryEncoding), encoding) );
        }
    });

    // 参考文档 https://www.cnblogs.com/chyingp/p/node-learning-guide-child_process.html
    workerProcess.on('close', function (code) {
        console.log('cmd已执行完成');
    });
}

compress()


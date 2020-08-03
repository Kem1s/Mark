
var exec = require('child_process').exec;

var fs = require('fs'),
    stat = fs.stat;
var path = require("path");

var compressing = require("compressing");

// child_process 执行中文命令 出现乱码解决方法
var iconv = require('iconv-lite');
var encoding = 'cp936';
var binaryEncoding = 'binary';

// 判断该目录是否存在
function exists(src , callback) {
    fs.exists(src, function (flag) {
        // 已存在
        if (flag) {
            callback(src)
        }
        // 不存在
        else {
            // 创建目录  不需要创建的时候就注释
            // fs.mkdir( src, function(err){
            //     if(err){
            //         callback('err')
            //         return
            //     }
            //     callback(src)
            // });

            // 递归创建目录,因为node只能创建一层目录
            // https://www.cnblogs.com/luzhanshi/p/11691430.html
            exists(path.dirname(src), function () {  
                fs.mkdir(src, callback);  
                // console.log('在' + path.dirname(src) + '目录创建好' + src  +'目录');
            });  
        }
    });
}

module.exports = {
    // 读取目录中的所有文件/目录
    readdir : function (src){
        // rar文件列表
        var rarList = [];
        fs.readdir(src, function (err, paths) {
            if (err) {
                throw err;
            }

            paths.forEach(function (filename,index) {
                // 全路径
                var _src = src + '\\' + filename
                stat(_src, function (err, st) {
                    if (err) {
                        throw err;
                    }
                    var reg = /\.zip$/;
                    // 判断是否为文件 必须是zip文件
                    if (st.isFile() && reg.test(filename)) {
                        var obj = {
                            path : _src,        // 要解压的文件
                            name : filename,    // 要解压的文件名
                        }
                        rarList.push(obj)
                        // console.log('全路径',_src)
                    }
                    // 如果是目录
                    else if (st.isDirectory()) {
                        
                    }
                });
        
            });
        });
        return rarList;
    },
    
    // 解压文件
    unRar: function (obj , idx , callback) {
        
        exists(obj.unRarPath , ()=>{
            // 第一种
            //解压
            compressing.zip.uncompress(obj.path, obj.unRarPath)
            .then(() => {
                // console.log('unzip 解压成功');
                var callbackobj = {
                    state:'success',
                    msg:'解压成功',
                    index: idx
                }
                callback(callbackobj)
            })
            .catch(err => {
                // console.error('unzip 解压失败',err);
                var callbackobj = {
                    state:'error',
                    msg:'解压成功',
                    index: idx
                }
                callback(callbackobj)
            });

            // 第二种
            // 目录已存在
            // obj.path rar文件     unRarPath 解压的目标地址
            // 文档 https://blog.csdn.net/lingling1420q/article/details/18360593
            // o+ 覆盖已有文件
            // -x*\jquery.param.js 排除所以文件夹下的jquery.param.js文件

            // let cmd = `rar x -x*\jquery.param.js -o+ ${obj.path} ${obj.unRarPath}`;
            // var workerProcess = exec(cmd, { encoding: binaryEncoding , maxBuffer: 1024 * 500 }, function (err, stdout, stderr) {
            //     if (err) {
            //         console.log('err---',err);
            //     }
            //     if(stdout){
            //         // 输出打印信息
            //         // console.log( iconv.decode(new Buffer(stdout, binaryEncoding), encoding) );
            //     }
            //     if (stderr) {
            //         // console.log( iconv.decode(new Buffer(stderr, binaryEncoding), encoding) );
            //     }
            // });
        
            // 参考文档 https://www.cnblogs.com/chyingp/p/node-learning-guide-child_process.html
            // workerProcess.on('close', function (code) {
            //     // console.log('cmd已执行完成,已解压：',obj.path);
            //     var callbackobj = {
            //         state:'info',
            //         msg:'cmd已执行完成',
            //         index: idx
            //     }
            //     callback(callbackobj)
            // });
        })
    }

}


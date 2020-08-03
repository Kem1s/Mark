var fs = require('fs'),
    stat = fs.stat;

var Bagpipe = require('bagpipe');
// 设定最大并发数为10  
var bagpipe = new Bagpipe(10);

/* -----------------------------以下为复制文件操作（非ftp）------------------------------ */
var findDb = require('./list')();

var copy = function (src, dst) {
    // 读取目录中的所有文件/目录
    fs.readdir(src, function (err, paths) {
        if (err) {
            throw err;
        }
                
        paths.forEach(function (filename,index) {
            bagpipe.push(fs.exists,paths[index], function () {
                // 异步回调执行
         
                var _src = src + '/' + filename,
                    _dst = dst + '/' + filename,
                    readable, writable;
    
                stat(_src, function (err, st) {
                    if (err) {
                        throw err;
                    }
    
                    // 判断是否为文件
                    if (st.isFile()) {
                        // 创建读取流
                        readable = fs.createReadStream(_src);
                        // 创建写入流
                        writable = fs.createWriteStream(_dst);
                        // 通过管道来传输流
                        readable.pipe(writable);
                    }
                    // 如果是目录则递归调用自身
                    else if (st.isDirectory()) {
                        exists(_src, _dst, copy);
                    }
                });
    
            });
            
            bagpipe.on('full', function (length) {
                console.warn('队列拥堵，目前队列长度为:' + length);
            });
        });
    });
};
// 在复制目录前需要判断该目录是否存在
var exists = function (src, dst, callback) {
    fs.exists(dst, function (exists) {
        // 已存在
        if (exists) {
            callback(src, dst);
        }
        // 不存在
        else {
            // 创建目录  不需要创建的时候就注释
            fs.mkdir( dst, function(){
                callback( src, dst );
            });
        }
    });
};

// 演示复制目录
//exists('./a1/', './b1', copy);

/* -----------------------------以上为复制文件操作（非ftp）------------------------------ */


/* -----------------------------以下为调用上传------------------------------- */

var skinList = ['temp', 'tempAa', 'tempActive', 'tempAe', 'tempAf', 'tempQq4', 'tempWns'];
// var skinList = ['public'];

// 所有需要复制文件的站点标识
findDb.then(res => {

    var allList = res;
    //var allList = ['aa','ab','ac','ad','ae','af','ag','ah','ai']
    // 忽略的站点
    var ignoreList = ['dl', 'dk', 'ts', 'do', 'js', 'bh2', 'zw', 'jiechi', 'zz']
    ignoreList.forEach((ele, idx) => {
        // 从所以站点中删除忽略的站点
        delItem(ele, allList)
    })

    
    allList.forEach((item, index) => {
        // // 资源服务器目录 E:\git仓库\资源服务器\m
        //var ftpPath = 'E:/git仓库/资源服务器/m/' + item + '/other/';
        var ftpPath = './m';
        // // 本地目录
        var localPath = './aa/';
        // // 复制本地
        //exists(localPath, ftpPath, copy);
        console.log(item)
    })


/* -----------------------------以下为通过命令行传参复制------------------------------- */
    // var args = process.argv.splice(2)
    // // console.log('所传递的参数是：', args[0]);
    // //process是一个全局对象，argv返回的是一组包含命令行参数的数组。
    // //第一项为”node”，第二项为执行的js的完整路径，后面是附加在命令行后的参数
    // var ftpPath = 'E:/git仓库/资源服务器/m/' + args;
    // var localPath = './aa/';
    // // 复制本地
    // exists(localPath, ftpPath, copy);
    // console.log('粘贴到：', args[0],'文件夹');
/* -----------------------------以上为通过命令行传参复制------------------------------- */


})

function delItem(item, list) {
    // 表示先获取这个元素的下标，然后从这个下标开始计算，删除长度为1的元素
    if (list.indexOf(item) != -1) {
        list.splice(list.indexOf(item), 1)
    }
}
/* -----------------------------以上为调用上传------------------------------- */
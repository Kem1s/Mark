var fs = require('fs'),
    stat = fs.stat;


/* ------------------------------------ 以下为连接ftp服务器----------------------------------- */ 
// let options = {
//     host: "10.10.116.30",
//     port: "21",
//     user: "root",
//     password: "123456"
// }
// var Client = require('ftp');

// var c = new Client();
// c.on('ready', function () {

//     // 获取ftp文件列表
//     c.list(function (err, list) {
//         if (err) throw err;
//         // console.dir(list);
//         c.end();
//     });
// });

// c.connect(options);
/* ------------------------------------ 以上为连接ftp服务器----------------------------------- */ 




/* -----------------------------以下为复制文件操作（非ftp）------------------------------ */ 
var findDb = require('./list')();

var copy = function (src, dst) {
    // 读取目录中的所有文件/目录
    fs.readdir(src, function (err, paths) {
        if (err) {
            throw err;
        }

        paths.forEach(function (filename) {
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
            // 创建目录
            fs.mkdir( dst, function(){
                callback( src, dst );
            });
        }
    });
};

// 复制目录
exists('./static/', './aa', copy);

/* -----------------------------以上为复制文件操作（非ftp）------------------------------ */ 




/* -----------------------------以下为上传文件操作（ftp）------------------------------- */ 


// 传入需要上传的目录
function ftpPut(localPath , ftpPath){
    // 读取目录中的所有文件/目录
    fs.readdir(localPath, function (err, paths) {
        if (err) {
            throw err;
        }

        paths.forEach(function (filename) {
            // filename 传入目录下的文件 或 文件夹
            var _src = localPath + '/' + filename;

            stat(_src, function (err, st) {
                if (err) {
                    throw err;
                }
                
                // 判断是否为文件
                if (st.isFile()) {
                    
                    // 获取ftp上有没有这个文件夹
                    c.get(ftpPath, function (err) {
                        if(err){
                            // 没有则创建,并上传文件
                            c.mkdir(ftpPath, false ,function(){                               
                                // src本地目录,第一个参数_src本地目录下的文件  第二个参数为ftp目录文件
                                console.log(ftpPath + '/' + filename)
                                c.put(_src , ftpPath + '/' + filename , function(err){              
                                    if(err){
                                    }
                                    c.end()
                                })
                            })
                        }else{
                            // 有该文件夹,就直接上传
                            c.put(_src , ftpPath + '/' + filename , function(err){              
                                if(err){
                                }
                                c.end()
                            })
                        }
                    })

                }
                // 如果是目录,先创建目录,再上传这个目录下的文件
                else if (st.isDirectory()) {
                    c.get(ftpPath, function (err) {
                        if(err){
                            c.mkdir(ftpPath + '/' + filename , false ,function(){
                                ftpPut(localPath + '/' + filename , ftpPath + '/' + filename)
                            })
                        }
                    })
                }
            });
        });
    });
}


// // ftp目录
// var ftpPath = '/m/aa';
// // 本地目录
// var localPath = './aa';

// ftpPut(localPath , ftpPath)
/* -----------------------------以上为上传文件操作（ftp）------------------------------- */ 



/* -----------------------------以下为调用上传------------------------------- */ 

var skinList = ['temp','tempAa','tempActive','tempAe','tempAf','tempQq4','tempWns'];
// var skinList = ['public'];

// 所有需要复制文件的站点标识
findDb.then(res =>{
    
    var allList = res;
    // 忽略的站点
    var ignoreList = ['dl','dk','ts','do','js','bh2','zw','jiechi','zz']
    ignoreList.forEach((ele,idx)=>{
        // 从所以站点中删除忽略的站点
        delItem( ele , allList )
    }) 
    allList.forEach((item , index)=>{

        skinList.forEach((ele,idx)=>{
            // ftp目录
            var ftpPath = '/v/'+ item+ '/' + ele;
            // 本地目录
            var localPath = './static/'+ ele;
            
            // ftpPut(localPath , ftpPath)
        })


        // ftp目录
        // var ftpPath = '/m/'+ item+ '/' + ele;
        // var ftpPath = './v/'+ item+ '/lottery' ;
        // // 本地目录
        // var localPath = './static/a';
    
        // 上传ftp的
        // ftpPut(localPath , ftpPath)
        // 复制本地（演示）
        // exists(localPath, ftpPath, copy);
    })
})

function delItem(item, list) {
    // 表示先获取这个元素的下标，然后从这个下标开始计算，删除长度为1的元素
    if(list.indexOf(item) != -1){
        list.splice(list.indexOf(item), 1)
    }
}
/* -----------------------------以上为调用上传------------------------------- */ 
var fs = require('fs'),
    stat = fs.stat;
var path = require('path')
var projectRoot = path.resolve(__dirname, './b')



// Unicode转换ASCII
function toAscll(str){ 
    var value='';
    for (var i = 0; i < str.length; i++)
        value += '&#' + str.charCodeAt(i) + ';';
    return value;
}

setString(projectRoot)

function setString(projectRoot){
    // 读取目录中的所有文件/目录
    fs.readdir(projectRoot, function (err, paths) {
        if (err) {
            throw err;
        }
        paths.forEach(function (filename,index) {
            var _src = projectRoot + '/' + filename;
            stat(_src, function (err, st) {
                if (err) {
                    throw err;
                }

                // 判断是否为文件
                if (st.isFile()) {
                    //获取文件的后缀名,只修改js文件
                    var extname=path.extname(_src);
                    var reg = /\.js$/;
                    if(reg.test(extname)){
                        fs.readFile(_src,'utf8',(err,buffer)=>{
                            var html = buffer.toString();
                            html = html.replace(/[\u4E00-\u9FA5]/g,(a)=>{
                                return toAscll(a)
                            })
                            html = html.replace('innerText',(a)=>{
                                return 'innerHtml'
                            })
                            fs.writeFile(_src,html,(err)=>{
                                if(err){
                                    console.log(err);
                                }
                                console.log('\u4fee\u6539\u6210\u529f\uff01');
                            })
                        })
                    }
                }
                // 如果是目录
                else if (st.isDirectory()) {
                    setString(_src)
                }
            });
        });
    });
}

var images = require("images");
var path=require('path');  
var fs = require('fs');
var glob = require('glob');


// 字节转化成 kb mb ....
function formatBytes(bytes) {
    if(bytes < 1024) return bytes + " Bytes";
    else if(bytes < 1048576) return(bytes / 1024).toFixed(3) + " KB";
    else if(bytes < 1073741824) return(bytes / 1048576).toFixed(3) + " MB";
    else return(bytes / 1073741824).toFixed(3) + " GB";
};

module.exports = function (src1,src2) {
    // **为glob模块的匹配规则，可以匹配子文件夹
    var files = glob.sync(src1 + '/**/*.?(jpg|png|jpeg)');
    console.log(files)
    files.forEach((ele,i)=>{
        // 获取文件名
        var basename = path.basename(ele);
        // 获取文件后缀名
        // var extname = path.extname(ele);
        // 获取文件大小
        fs.stat(ele,(error,stats)=>{
                if(error){
                    console.log("file size error");
                }else{
                    //文件大小
                    console.log(i,'--size--',formatBytes(stats.size));
                }
        })
    
        images(ele) //Load image from file 
            //加载图像文件
            .save(src2+"\\"+basename, { //Save the image to a file,whih quality 50
                quality: 50 //保存图片到文件,图片质量为50
            });
    })
}

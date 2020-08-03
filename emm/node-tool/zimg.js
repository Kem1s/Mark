const
    imagemin = require('imagemin'),
    imageminMozjpeg = require('imagemin-mozjpeg'),
    imageminPngquant = require('imagemin-pngquant'),
    imageminGifsicle = require('imagemin-gifsicle'),
    imageminJpegtran = require('imagemin-jpegtran');
    /**
 * 文件压缩
 * @param {string||array} input 文件路径
 * @param {string} output 文件输出路径：默认 imagemin/temp
 * @return {
 *  status: true|false
 *  [true => （imageminCompass return true）]
 *  [false => error: string]
 * }
 */
async function compass(input, output) {
    return await imageminCompass(input, output);
}

/**
 * imagemin压缩
 * @param {string|Array} input 源目录
 * @param {string} output 输出目录
 * @return {
 *  status: true|false,
 *  [true => data: array]
 *  [false => error: string]
 * }
 */
async function imageminCompass(input, output = 'temp') {
    input = (typeof input == 'string') ? [input] : input;
    return await imagemin(input, output, {
            use: [
                imageminMozjpeg(),
                imageminPngquant(),
                imageminGifsicle({
                    optimizationLevel:3
                })
            ]
        })
        .then(file => {
            return {
                status: true,
                data: file
            };
        })
        .catch(e => {
            console.log(e);
            return {
                status: false,
                error: e.toString()
            }
        });
}







const
    fs = require('fs'),
    glob = require('glob');

const queueList = [];
let maxQueueRun = 3;
let nowQueueRun = 0;

function runQueue(fn) {
    fn && queueList.push(fn);
    if (nowQueueRun < maxQueueRun && queueList.length > 0) {
        nowQueueRun += 1;
        queueList[0]().then(() => {
            nowQueueRun -= 1;
            runQueue();
        });
        queueList.shift();
        runQueue();
    }
}

function zimg(src1,src2) {
    
    // var files = glob.sync(src + '/*.?(jpg|png|jpeg|gif)');

    // **为glob模块的匹配规则，可以匹配子文件夹
    var files = glob.sync(src1 + '/**/*.?(jpg|png|jpeg|gif)');
    
    function cInfo() {
        let
            numRatio = (files.length - succNum - errNum) / files.length,
            txt = `
    ┏┓
    ┃
    ┣ ${getChar('■', 20 - Math.floor(numRatio * 20))}${getChar('□', Math.floor(numRatio * 20))}(${(100 - numRatio * 100).toFixed(2)}%)'
    ┃
    ┣ 完成：${succNum + errNum}
    ┃
    ┣ 剩余：${files.length - (succNum + errNum)}
    ┃
    ┣ 错误：${errNum}
    ┃
    ┣ 共计：${files.length}
    ┃
    ┣ 总大小：${(allSourceSize / 1024).toFixed(2)}KB
    ┃
    ┣ 压缩后大小：${(allSize / 1024).toFixed(2)}KB
    ┃
    ┣ 压缩率：${((allSourceSize - allSize) / allSourceSize * 100).toFixed(3)}%
    ┃
    ┗┛`;
        console.clear();
        console.log(txt);
    }

    function getChar(txt, num) {
        let val = '';
        for (let i = 0; i < num; i++) {
            val += txt;
        }
        return val;
    }
    let
        //完成数量    
        succNum = 0,
        //出错数量
        errNum = 0,
        //总大小
        allSourceSize = 0,
        //总处理后大小
        allSize = 0;
        files.forEach(path => {

            // path 为每个文件的完整地址 saveSrc为截取后的目录
            var idx = path.lastIndexOf("/");
            var saveSrc = path.substr(0,idx+1);

            if(src2){
                saveSrc = src2
            }

            runQueue(() => {
                return imagemin([path], {
                    destination: saveSrc,
                    plugins: [
                        imageminJpegtran(),
                        imageminPngquant({
                            quality: [0.6, 0.8]
                        })
                    ]
                })
                .then(d => {
                    const
                    source = fs.statSync(path);
                    succNum++;
                    allSourceSize += source.size;
                    allSize += d[0].data.length;
                    cInfo();
                })
                .catch(() => {
                    errNum++;
                    cInfo();
                }).then(() => {
                    return true;
                })
                
            });
        })
}

export default zimg;





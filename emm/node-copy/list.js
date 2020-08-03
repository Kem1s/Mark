var db = require('./db');

function delItem(item, list) {
    // 表示先获取这个元素的下标，然后从这个下标开始计算，删除长度为1的元素
    list.splice(list.indexOf(item), 1)
}

// 忽略以下站点
var ignoreList = [];

/* 获取站点列表 */
var allList = []

module.exports = function findDb() {
    var that = this;
    let sql = "SELECT * FROM build";
    // var param = ["%"+this.inputValue+"%","%"+this.inputValue+"%","%"+this.inputValue+"%"];
    var param = '';

    return new Promise((resolve, reject) => {
        db(sql, param, function (err, data) {
            if (err) {
                console.log('查询数据出错!');
                return;
            }
            for (var i = 0; i < data.length; i++) {
                var obj = {
                    name: data[i].name,
                    skin: data[i].skin,
                    theme: data[i].theme,
                    isCloud: data[i].isCloud,
                    project: data[i].project,
                    rejnum: data[i].rejnum
                }

                // 只取站点标识
                allList.push(obj.theme);
            }

            // ignoreList.forEach((ele,idx)=>{
            //     // 从所以站点中删除忽略的站点
            //     delItem( ele , allList )
            // }) 
            resolve(allList);
        });
    })


}
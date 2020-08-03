var express = require('express');
var router = express.Router();

var db = require('../public/js/db');




/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', {
        title: '路由为/'
    });
});

router.get('/a1', function (req, res) {
    console.log('一级城市')
    res.json(ct[0]['86'])
});

router.get('/aa1', function (req, res) {
    // 插入一级城市
    var obj = ct[0]['86']
    for (const key in obj) {
        var id = key
        var name = obj[key]

        let sql = "INSERT INTO citylevel1 ( cityID,cityName,cityParentID ) VALUES ( ?, ?, 0 )"
        // 变量为?    对应下面的 "%"+ val +"%"
        var param = [id, name];
        db(sql, param, function (err, data) {
            if (err) {
                console.log('查询数据出错!');
                return;
            }
            // resolve();
        });
    }
    res.json(ct[0]['86'])
});


router.get('/city', async (req, res) => {
    var top = ((id = req.query.id || null) == null);
    // DataSql 查询数据的sql  c和n为别名,优化查询速度
    // let DataSql = "select CODE c,NAME n from prv p1 where "
    let DataSql = "select CODE ,NAME ,PARENT  from prv p1 where "
    // Countsql 查询数据总条数的sql n为别名
    let Countsql = "select COUNT(1) n from prv p1 where "

    var sql = "";
    // 分页sql
    var limitSQL = "";
    // id 存在就查询一级城市（省） 不存在就按父级id查询（根据父级id查询子城市、县、街道）
    if (top) {
        sql += " p1.`LEVEL` =1";
    } else {
        sql += " p1.PARENT ='" + parseInt(id) + "' ";
    }

    // name 存在就根据城市名模糊查询
    if (req.query.name) {
        sql += " and p1.NAME like '%" + req.query.name + "%' ";
    }

    // page row 分页存在，则返回分页数据
    var row = req.query.row;
    var page = req.query.page;
    if (req.query.row) {
        try {
            row = parseInt(req.query.row);
        } catch (err) {}
    }
    if (row <= 0) row = 1;
    if (req.query.page) {
        try {
            page = parseInt(req.query.page);
            if (page <= 0) page = 1;
        } catch (err) {}
        limitSQL = " limit " + ((page - 1) * row) + " , " + row + " ";
    }


    // await 同步查询多条sql
    const dbdata = await db(DataSql + sql + limitSQL)
    var dbdataLen = 0;
    const lenData = await db(Countsql + sql);
    dbdataLen = lenData[0].n;

    if(req.query.page){
        res.json({
            data: dbdata,
            page: {
                row,
                page,
                allLen: dbdataLen,
                allPage: Math.ceil(parseInt(dbdataLen) / row)
            }
        });
    }else{
        res.json({
            data: dbdata
        });
    }

});






module.exports = router;
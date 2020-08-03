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


router.get('/city', function (req, res) {
    var top = ((id = req.query.id || null) == null);
    let DataSql = "select CODE c,NAME n from prv p1 where "
    let Countsql = "select COUNT(1) n from prv p1 where "

    var sql = "";
    if (top) {
        sql += " p1.`LEVEL` =1";
    } else {
        sql += " p1.PARENT ='" + parseInt(id) + "' ";
    }

    if (req.query.name) {
        sql += " and p1.NAME like '%" + req.query.name + "%' ";
    }

    var row = 20;
    var page = 1;
    if (req.query.row) {
        try {
            row = parseInt(req.query.row);
        } catch (err) {}
    }
    if (row <= 0) row = 1;
    if (req.query.page) {
        try {
            page = parseInt(req.query.page);
        } catch (err) {}
    }
    if (page <= 0) page = 1;

    var limitSQL = " limit " + ((page - 1) * row) + " , " + row + " ";

    return new Promise((resolve, reject) => {
        var dbdata = [];
        var dbdataLen = 0;
        db(DataSql + sql + limitSQL, "", function (err, data) {
            if (err) {
                console.log('查询数据出错!');
                return;
            }
            dbdata = data;
        });
        db(Countsql + sql, "", function (err, data) {
            if (err) {
                console.log('查询数据出错!');
                return;
            }
            dbdataLen = data;
        });
        res.json({
            data: dbdata,
            row,
            page,
            allLen:dbdataLen
        });
    })
});






module.exports = router;
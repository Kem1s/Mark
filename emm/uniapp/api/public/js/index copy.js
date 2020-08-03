var express = require('express');
var router = express.Router();

// var db = require('../public/js/db');
// var ct = require('../public/js/city')



  
/* GET home page. */
router.get('/', function (req, res) {
    
    res.render('index', { title: '路由为/' });
});
router.get('/ddd', function (req, res) {
    
    res.render('index', { title: '路由为/ddd' });
});
router.get('/bbb', function (req, res) {
    
    res.render('index', { title: '路由为/bbb' });

    var that = this;
    let sql = "SELECT * FROM cityLevel1";
    // var param = ["%"+this.inputValue+"%","%"+this.inputValue+"%","%"+this.inputValue+"%"];
    var param = '';
    return new Promise((resolve, reject) => {
        db(sql, param, function (err, data) {
            if (err) {
                console.log('查询数据出错!');
                return;
            }
            console.log('----',data)
            // resolve();
        });
    })
});

router.get('/ccc', function (req, res) {
    
    res.send('路由为/ccc');
    
    console.log(2222)
    return

    var that = this;
    let sql = "INSERT INTO city999 ( cityID,cityName,cityParentID ) VALUES ( ?, ?, ? )"
    // 变量为?    对应下面的 "%"+ val +"%"
    // var param = ["%"+this.inputValue+"%","%"+this.inputValue+"%","%"+this.inputValue+"%"];
    var param = '';
    return new Promise((resolve, reject) => {
        db(sql, param, function (err, data) {
            if (err) {
                console.log('查询数据出错!');
                return;
            }
            console.log('----',data)
            // resolve();
        });
    })
});

router.get('/aaa', function (req, res) {
    
    res.send('路由为aaa')
    
    console.log(33333)
});


module.exports = router;
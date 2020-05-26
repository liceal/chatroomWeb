var express = require('express')
var app = express()
var path = require('path'); //路径配置
var router = express.Router(); //路由管理

router.use(express.static(path.join(__dirname, 'dist')))

//路由
router.get("/demo", (req, res) => {
    res.send(path.join(__dirname, 'dist'))
})

//中间件 use '/'
app.use('/', router)

app.listen(process.env.PORT || 3000)
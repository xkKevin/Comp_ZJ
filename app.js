var express = require('express')
var bodyParser = require('body-parser')
const router = require('./router')

const app = express()

//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept,Authorization");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    // res.header("Content-Type", "application/json;charset=utf-8");
    next();
})

app.engine('html', require('express-art-template'))
    // 配置 body-parser
    // 只要加入这个配置，则在 req 请求对象上会多出来一个属性：body
    // 也就是说你就可以直接通过 req.body 来获取表单 POST 请求体数据了
    // parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
    // parse application/json
app.use(bodyParser.json({ limit: '50mb', extended: true }))

app.use('/python', express.static('./'))
app.use(router)
app.use(function(req, res) {
    res.send("404 not found")
})

app.listen(80, () => {
    console.log("Server started at port 80");
})
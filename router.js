const express = require('express')
// var request = require('request')
const fs = require('fs')
var spawn = require("child_process").spawn

const router = express.Router()

router.get('/', function(req, res) {
    res.render('index.html')
})

router.post('/graph_community_detection', function(req, res) {
    //res.send(JSON.stringify(req.body))
    // request 默认是 get 请求
    /*
    request('http://127.0.0.1:3000/communityDetect', function(error, response, body) {
        //console.log('error:', error); // Print the error if one occurred
        //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        //console.log('body:', body); // Print the HTML for the Google homepage.
        res.send(body)
    })
    */
    
    // console.log(typeof(req.body.data))
    // console.log(req.body.data)
    // res.send(req.body.data)
    /*
    exec(`python ${filename} CD ${req.body.data}`, function(err, stdout, stderr) {
        if (err) {
            res.send('stderr:' + err)
        }
        if (stdout) {
            res.send(stdout)
        }
    })
    */
   if (typeof(req.body.data) === "object"){
        req.body.data = JSON.stringify(req.body.data)
    }
    var process = spawn('python', ['./python/algorithms.py', 'CD', req.body.data])
    process.stdout.on('data', (data) => {
        // Do something with the data returned from python script
        res.json(JSON.parse(data))
        // res.send(data)
    })
    process.stderr.on('data',(data) => {
        res.send('stderr:' + data)
    })
    // process.on('exit', (code) => {
    //     res.send('Child process exited with code ' + code)
    // })
})

router.post('/graph_page_rank', function(req, res) {
    if (typeof(req.body.data) === "object"){
        req.body.data = JSON.stringify(req.body.data)
    }
    var process = spawn('python', ['./python/algorithms.py', 'PR', req.body.data])
    process.stdout.on('data', (data) => {
        res.json(JSON.parse(data))
    })
    process.stderr.on('data',(data) => {
        res.send('stderr:' + data)
    })
})

router.post('/graph_shortest_path', function(req, res) {
    // filename = './python/algorithms.py'
    // exec(`python ${filename} SP ${graph_file} ${req.body.source} ${req.body.target}`,
    //     function(err, stdout, stderr) {
    //         if (err) {
    //             res.send('stderr:' + err)
    //         }
    //         if (stdout) {
    //             stdout = stdout.replace('[','').replace(']','').replace(/[\s']/g,'').split(',')
    //             res.json(stdout)
    //         }
    //     })
    if (typeof(req.body.data) === "object"){
        req.body.data = JSON.stringify(req.body.data)
    }
    var process = spawn('python', ['./python/algorithms.py', 'SP', req.body.data, req.body.source, req.body.target])
    process.stdout.on('data', (data) => {
        res.json(JSON.parse(data))
    })
    process.stderr.on('data',(data) => {
        res.send('stderr:' + data)
    })
})

router.post('/calculate_degree', function(req, res) {
    if (typeof(req.body.data) === "object"){
        req.body.data = JSON.stringify(req.body.data)
    }
    var process = spawn('python', ['./python/calculate.py', 'DG', req.body.data])

    process.stdout.on('data', (data) => {
        res.json(JSON.parse(data))
    })
    process.stderr.on('data',(data) => {
        res.send('stderr:' + data)
    })
})

module.exports = router
const express = require('express')
// var request = require('request')
const fs = require('fs')
const spawn = require("child_process").spawn

const router = express.Router()

var callback = function(req,res){
    var args = ['./python/algorithms.py']
    switch(req.url){
        case '/graph_community_detection': args.push('CD'); break;
        case '/graph_page_rank': args.push('PR'); break;
        case '/graph_shortest_path': args = [...args, ...['SP', req.body.source, req.body.target]]; break;
        case '/calculate_degree': args[0] = './python/calculate.py'; args.push('DG'); break;
        default: res.send(req.url + " is not defined!"); return;
    }
    if (typeof(req.body.data) === "object"){
        req.body.data = JSON.stringify(req.body.data)
    }

    fs.writeFile('./data/result.json', req.body.data, function(err){
        if (err) {
            res.send("err: " + err)
        }
        var process = spawn('python', args)

        process.stdout.on('data', (data) => {
            res.json(JSON.parse(data))
        })
        process.stderr.on('data',(data) => {
            res.send('stderr:' + data)
        })
    })
}

router.get('/', function(req, res) {
    res.render('index.html')
})

router.post('/graph_community_detection', callback)

router.post('/graph_page_rank', callback)

router.post('/graph_shortest_path', callback)

router.post('/calculate_degree', callback)

module.exports = router
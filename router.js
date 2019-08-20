const express = require('express')
var request = require('request')
const fs = require('fs')
var exec = require("child_process").exec

const router = express.Router()
var filename = './python/algorithms.py'
var graph_file = './data/graph0.json'

router.get('/', function(req, res) {
    res.render('index.html')
})

router.post('/get_data', function(req, res) {
    graph_file = './data/' + req.body.dataName + '.json'
    fs.readFile(graph_file,function(err,data){
        if (err) {
            res.send('No such data:' + err);
        }
        res.json(JSON.parse(data.toString()))
    })
    
})

router.get('/get_data', function(req, res) {
    graph_file = './data/' + req.query.dataName + '.json'
    fs.readFile(graph_file,function(err,data){
        if (err) {
            res.send('No such data:' + err);
        }
        res.json(JSON.parse(data.toString()))
    })
})

router.get('/graph_community_detection', function(req, res) {
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
    filename = './python/algorithms.py'
    exec(`python ${filename} CD ${graph_file}`, function(err, stdout, stderr) {
        if (err) {
            res.send('stderr:' + err);
        }
        if (stdout) {
            res.json(JSON.parse(stdout));
        }
    })
})

router.get('/graph_page_rank', function(req, res) {
    //res.send(JSON.stringify(req.body))
    /*
    request('http://127.0.0.1:3000/pageRank', function(error, response, body) {
        //console.log('error:', error); // Print the error if one occurred
        //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        //console.log('body:', body); // Print the HTML for the Google homepage.
        res.send(body)
    })
    */
    filename = './python/algorithms.py'
    exec(`python ${filename} PR ${graph_file}`, function(err, stdout, stderr) {
        if (err) {
            res.send('stderr:' + err);
        }
        if (stdout) {
            res.json(JSON.parse(stdout));
        }
    })
})

router.get('/graph_page_rank_node', function(req, res) {
    filename = './python/algorithms.py'
    exec(`python ${filename} PR ${graph_file} ${req.query.node}`, function(err, stdout, stderr) {
        if (err) {
            res.send('stderr:' + err);
        }
        if (stdout) {
            res.json(stdout);
        }
    })
})

router.post('/graph_shortest_path', function(req, res) {
    //res.send(JSON.stringify(req.body))
    // console.log(JSON.stringify(req.body))
    // console.log(req.body, req.body.source, req.body.target)
    /*
    var url = 'http://127.0.0.1:3000/shortestPath'
    request.post({
            url: url,
            form: {
                start: req.body.source,
                end: req.body.target
            }
        }, function(error, response, body) {
            res.send(body)
        })
        
    request({
        //url: 'http://127.0.0.1:3000/shortestPath',
        method: "POST",
        json: true,
        body: {
            start: 2,
            end: 5
        }
    }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            res.send("200: " + body)
        }
        res.send(body)
    })
    */
    filename = './python/algorithms.py'
    exec(`python ${filename} SP ${graph_file} ${req.body.source} ${req.body.target}`,
        function(err, stdout, stderr) {
            if (err) {
                res.send('stderr:' + err);
            }
            if (stdout) {
                res.send(stdout);
            }
        })
})

router.get('/graph_shortest_path', function(req, res) {
    filename = './python/algorithms.py'
    exec(`python ${filename} SP ${graph_file} ${req.query.source} ${req.query.target}`,
        function(err, stdout, stderr) {
            if (err) {
                res.send('stderr:' + err);
            }
            if (stdout) {
                res.send(stdout);
            }
        })
})

router.get('/calculate_degree', function(req, res) {
    filename = './python/calculate.py'
    exec(`python ${filename} DG ${graph_file}`,
    function(err, stdout, stderr) {
        if (err) {
            res.send('stderr:' + err);
        }
        if (stdout) {
            res.json(JSON.parse(stdout));
        }
    })
})


router.post('/test', function(req, res) {
    //res.send(JSON.stringify(req.body))
    console.log("test", req.body);
    var start = parseFloat(req.body.start)
    var end = parseFloat(req.body.end)
    res.send((start + end).toString())
})

module.exports = router
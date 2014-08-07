# flode

A node.js module for asynchronous flow control with error handling and data forwarding.
So by using this module you can execute several async functions one after another (serial) or simultaneously (parallel).
You can create a jsdoc for a detailed module documentation.

## serial example

    var flode = require('flode');
    
    var serialFlow = {
    
        'data' : {
    
            'first': false,
            'second': false
        },
        'tasks' : [
    
            function (data, next) {
    
                // minipulate data
                data.first = true;
    
                var error = null;
                // error = new Error('some error in first function');
    
                // forward data to next function
                next(error, data);
            },
            function (data, next) {
    
                data.second = true;
    
                next(null, data);
            }
        ]
    };
    
    flode.serial(serialFlow,function(error, data) {
    
        if (error) {
    
            console.error(error);
    
        } else {
    
            console.log(data);
    
        }
    });

## parallel example

    var flode = require('flode');

    var parallelFlow = {
    
        'data' : {
    
            'first': false,
            'second': false,
            'third': false
        },
        'tasks' : [
    
            function (data, done) {
    
                // minipulate data
                data.first = true;
    
                var error = null;
                // error = new Error('some error in first function');
    
                // indicate that this function is done (others might still be running)
                done(error);
            },
            function (data, done) {
    
                data.second = true;
    
                done();
            },
            function (data, done) {
    
                data.third = true;
    
                done();
            }
        ]
    };
    
    flode.parallel(parallelFlow, function (errors, data) {
    
        // we cannot know how many errors might have occurred
        if (Array.isArray(errors)) {
    
            errors.forEach(function (error) {
    
                console.error(error);
            });
    
        } else {
    
            console.log(data);
    
        }
    });



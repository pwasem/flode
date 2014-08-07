/*
 * require flode module
 */
var flode = require(__dirname + '/index.js');

var serialFlow = {

    'tasks' : [

        function (data, next) {

            // minipulate data
            data.first = true;

            var error = null;
            // error = new Error('some error in first serial function');

            // forward data to next function
            next(error, data);
        },
        function (data, next) {

            data.second = true;

            next(null, data);
        }
    ],
    'data' : {

        'first': false,
        'second': false
    }
};

flode.serial(serialFlow,function(error, data) {

    if (error) {

        console.error(error);

    } else {

        console.log(data);

    }
});










var timers = require('timers');

var wait = function(seconds,callback) {

    setTimeout(callback, 1000 * seconds);

};

/*
 * serial example
 */
var serialTasks = [

    function (data, next) {

        wait(1, function () {

            data = data + 1;
            next(null, data);

        });

    }, function (data, next) {

        wait(2, function () {

            data = data + 2;
            next(null, data); //next(new Error('some error'));

        });


    }, function (data, next) {

        wait(3, function () {

            data = data + 3;
            next(null, data);

        });
    }
];

var serialOptions = {

    'tasks': serialTasks,
    'data': 0
};

flode.serial(serialOptions, function (error, data) {

    if (error) {

        console.error('Serial: ' + error);

    } else {

        console.log('Serial: ' + data);
    }

});

/*
 * parallel example
 */

var parallelTasks = [

    function (data, done) {

        wait(1, function() {

            data.push(1);
            done();

        });

    }, function (data, done) {

        wait(2, function() {

            data.push(2);
            done(); //done(new Error('some error'));

        });

    }, function (data, done) {

        wait(3, function() {

            data.push(3);
            done();

        });
    }
];

var parallelOptions = {

    'tasks': parallelTasks,
    'data': []

};

flode.parallel(parallelOptions, function (errors, data) {

    if (Array.isArray(errors)) {

        errors.forEach(function (error) {

            console.error('Parallel: ' + error);

        });

    } else {

        var result = 0;
        data.forEach(function (number) {

            result += number;
        });

        console.log('Parallel: ' + result);

    }
});



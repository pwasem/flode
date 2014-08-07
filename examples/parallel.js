var flode = require(__dirname + '/../flode.js');

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



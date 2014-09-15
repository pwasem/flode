var flode = require(__dirname + '/../flode.js');

var serialFlow = {

    'data': {

        'first': false,
        'second': false
    },
    'tasks': [

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

flode.serial(serialFlow, function (error, data) {

    if (error) {

        console.error(error);

    } else {

        console.log(data);

    }
});

flode
============

A hybrid module for asynchronous flow control with error handling and data forwarding.
Please check jsdoc for detailed module documentation.

serial example
============
```

       var flode = require('flode');
       
       var timers = require('timers');
       
       var wait = function(seconds,callback) {
       
           setTimeout(function () {
       
              callback();
       
           }, 1000 * seconds);
       
       };
       
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

```

parallel example
============
```
       
       var flode = require('flode');
       
       var timers = require('timers');
       
       var wait = function(seconds,callback) {
       
           setTimeout(function () {
       
              callback();
       
           }, 1000 * seconds);
       
       };
       
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

```





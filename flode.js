/**
 * A node.js module for asynchronous flow control with error handling and data forwarding
 *
 * @module flode
 * @version 0.2.0
 * @author pascal.wasem@googlemail.com
 */

/**
 * @alias module:flode
 * returns {object}
 */
var flode = function () {

    /**
     * Execute given tasks with given data in a serial flow
     *
     * @memberof module:flode
     *
     * @param {object} options <code>options</code> for executing serial flow
     * @param {Array.<module:flode~next>} options.tasks <code>tasks</code> to be executed serial
     * @param {string|number|boolean|array|object|null} options.data <code>data</code> to be processed serial
     * @param {module:flode~serialCallback} callback <code>callback</code> to be executed on errors or when all tasks are completed
     */
    var serial = function (options, callback) {

        /**
         * Callback function for tasks within serial flows
         *
         * @memberof module:flode
         * @inner
         *
         * @param {object} error <code>error</code> if any has occurred; <code>null</code> otherwise
         * @param {string|number|boolean|array|object|null} [data] <code>data</code> to be forwarded
         */
        var next = function (error, data) {

            // error occurred
            if (error) {

                // abort with error
                callback(error);

                // no error
            } else {

                // get next task
                var nextTask = options.tasks.shift();

                // is there a next task
                if (typeof nextTask === 'function') {

                    // run next task
                    nextTask(data, next);

                    // all tasks done
                } else {

                    callback(null, data);
                }
            }

        };

        // start first task
        next(null, options.data);
    };

    /**
     * Execute given tasks with given data in a parallel flow
     *
     * @memberof module:flode
     *
     * @param {object} options <code>options</code> for executing parallel flow
     * @param {Array.<module:flode~done>} options.tasks <code>tasks</code> to be executed parallel
     * @param {string|number|boolean|array|object|null} options.data <code>data</code> to be processed parallel
     * @param {module:flode~parallelCallback} callback <code>callback</code> to be executed when all tasks are completed
     */
    var parallel = function (options, callback) {

        // keep track of completed tasks
        var completed = 0;

        // keep track of errors
        var errors = null;

        /**
         * Callback function for tasks within serial flows
         *
         * @memberof module:flode
         * @inner
         *
         * @param {object} [error] <code>error</code> if any has occurred
         */
        var done = function (error) {

            // count completed task
            completed++;

            // error occurred
            if (error) {

                // no errors yet
                if (!Array.isArray(errors)) {

                    errors = [];
                }

                // remember error
                errors.push(error);
            }

            // all tasks completed
            if (options.tasks.length === completed) {

                callback(errors, options.data);
            }

        };

        // execute tasks parallel
        options.tasks.forEach(function (task) {

            task(options.data, done);

        });

    };

    /**
     * Callback function for serial flows
     *
     * @callback module:flode~serialCallback
     * @param {null|object} error <code>error</code> if any has occurred; <code>null</code> otherwise
     * @param {string|number|boolean|array|object|null} data processed <code>data</data
     */

    /**
     * Callback function for parallel flows
     *
     * @callback module:flode~parallelCallback
     * @param {null|Array.<object>} errors list of <code>errors</code> if any have occurred; <code>null</code> otherwise
     * @param {string|number|boolean|array|object|null} data processed <code>data</data>
     */

    // object to be revealed
    return {

        'serial': serial,
        'parallel': parallel

    };

};

var instance = flode()
module.exports = instance;

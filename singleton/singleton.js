/**
 * This is loosely based on Minko Gechev's article "Singleton in JavaScript"
 * @see http://blog.mgechev.com/2014/04/16/singleton-in-javascript/
 *
 * The difference here is that I'm providing a way to extend the singleton to
 * be able to send and receive Backbone events.
 */
var Singleton = (function() {
    "use strict";

    var INSTANCE;

    var SingletonModule = function(options) {
        if (!(this instanceof SingletonModule)) {
            return new SingletonModule();
        }

        if (options) {
            this.options = options;
        }
    };

    _.extend(SingletonModule.prototype, Backbone.Events, {
        test : function(data) {
            console.log(data);
        }
    });

    return {
        init: function () {
            if (!INSTANCE) {
                INSTANCE = SingletonModule.apply(null, arguments);
            }
            return INSTANCE;
        },
        getInstance: function () {
            return (!INSTANCE) ? this.init.apply(this, arguments) : INSTANCE;
        }
    };
}());

//Get an instance of the singleton
var singleton = Singleton.getInstance();

//Now call the singleton's "test" method.
singleton.test({
    error_code : "test",
    error_message : "test",
    resolution: "test"
});
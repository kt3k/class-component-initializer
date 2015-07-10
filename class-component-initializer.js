/**
 * class-component-initializer.js v2.1.0
 * author: Yoshiya Hinosawa ( https://github.com/kt3k )
 * license: MIT
 */


(function ($, Promise) {

    /**
     * Initialized the all class components of the given names and returns of the promise of all initialization.
     *
     * @param {String[]} arguments
     * @return {Promise}
     */
    $.CC.init = function () {

        var classNames = Array.prototype.slice.call(arguments);

        return Promise.all(classNames.map(function (className) {

            return initOne(className);

        }));
    };

    /**
     * Initializes one kind of class components of the given name and returns the promise of all initialization.
     *
     * @param {String} className The class name to initialize
     * @return {Promise}
     */
    initOne = function (className) {

        return new Promise(function (resolve) {

            var elements = $.CC.initClassComponent(className);

            Promise.all(elements.map(function (elem) {

                return $(elem).classComponentReady(className);

            })).then(resolve);

        });

    };

}(jQuery, Promise));

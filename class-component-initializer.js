/**
 * class-component-initializer.js v2.0.0
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

        var initEventName = 'init-class.' + className;
        var startEventName = 'init-class-started.' + className;

        var doc = $(document);

        var promise = new Promise(function (resolve) {

            doc.one(startEventName, function (e, elements) {

                Promise.all(elements.toArray().map(function (elem) {

                    return $(elem).classComponentReady(className);

                })).then(resolve);

            });

        });

        doc.trigger(initEventName);

        return promise;
    };

}(jQuery, Promise));

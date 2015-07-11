/**
 * class-component-initializer.js v2.3.0
 * author: Yoshiya Hinosawa ( https://github.com/kt3k )
 * license: MIT
 */


(function ($, Promise) {

    var reSpaces = / +/;

    /**
     * Initialized the all class components of the given names and returns of the promise of all initialization.
     *
     * @param {String[]} arguments
     * @return {Promise}
     */
    $.CC.init = function (classNames, elem) {

        if (typeof classNames === 'string') {

            classNames = classNames.split(reSpaces);

        }

        return Promise.all(classNames.map(function (className) {

            return initOne(className, elem);

        })).then(function (elemGroups) {

            var x = [];

            return x.concat.apply(x, elemGroups);

        });
    };

    /**
     * Initializes one kind of class components of the given name and returns the promise of all initialization.
     *
     * @param {String} className The class name to initialize
     * @return {Promise}
     */
    initOne = function (className, elem) {

        return new Promise(function (resolve) {

            var elements = $.CC.initClassComponent(className, elem);

            Promise.all(elements.map(function (elem) {

                return $(elem).classComponentReady(className);

            })).then(function () {

                resolve(elements);

            });

        });

    };


    /**
     * Spawns the class components from the given url's html contents.
     *
     * @param {String} url The url
     * @param {String|Array<String>} classNames The class names
     * @param {Object} options This options is passed to $.ajax method call
     * @param {Boolean} [options.prepend] if true then prepends the spawned components in the element otherwise appends
     * @return {Promise}
     */
    $.fn.spawn = function (url, classNames, options) {

        var elem = this;

        options = options || {};

        return Promise.resolve($.ajax(url, options)).then(function (data) {

            if (options.prepend) {

                elem.prepend($(data));

            } else {

                elem.append($(data));

            }


            return $.CC.init(classNames, elem);

        });

    };

}(jQuery, Promise));

/**
 * class-component-initializer.js v1.1.4
 * author: Yoshiya Hinosawa ( https://github.com/kt3k )
 * license: MIT
 */




/**
 ClassComponentInitializer is the utility class to help initializing the class component elements on the page.

 @example

     <body class="cci">

     </body>

     <script>

     $(document.body).getRole('cci').init('foo', 'bar', 'baz').then(function () {

         // interaction with foo, bar and baz elements

     });

     </script>
 */
jQuery.defineRole('cci', function (pt, parent) {

    pt.constructor = function (elem) {

        elem.data('__role:cci', this);

    };


    /**
     * Initialized the all class components of the given names and returns of the promise of all initialization.
     *
     * @param {String[]} arguments
     * @return {Promise}
     */
    pt.init = function () {

        var classNames = Array.prototype.slice.call(arguments);

        var that = this;

        return Promise.all(classNames.map(function (className) {

            return that.initOne(className);

        }));
    };

    /**
     * Initializes one kind of class components of the given name and returns the promise of all initialization.
     *
     * @param {String} className The class name to initialize
     * @return {Promise}
     */
    pt.initOne = function (className) {

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

});

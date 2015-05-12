

before(function () {

    $(document.body).addClass('cci');

    // initializes class component initializer
    $(document).trigger('init-class.cci');

    $.defineRole('foo', function (pt, parent) {

        pt.constructor = function (elem) {

            parent.constructor.call(this, elem);

            elem.attr('is_foo', 'true');

        };

    });

    $.defineRole('bar', function (pt, parent) {

        pt.constructor = function (elem) {

            parent.constructor.call(this, elem);

            elem.attr('is_bar', 'true');

        };

        pt.init = function () {

            return new Promise(function (resolve) {

                setTimeout(resolve, 500);

            });

        };

    });

});

describe('class-component-initializer', function () {
    'use strict';

    describe('init', function () {

        it('initializes the class component of the given name', function (done) {

            var foo = $('<div class="foo" />').appendTo(document.body);

            $('.cci').getRole('cci').init('foo');

            setTimeout(function () {

                expect(foo.attr('is_foo')).to.equal('true');

                foo.remove();

                done();

            });

        });


        it('returns promise which resolves when the init process of each elem resolves', function (done) {

            var bar = $('<div class="bar" />').appendTo(document.body);

            $('.cci').getRole('cci').init('bar').then(function () {

                expect(bar.attr('is_bar')).to.equal('true');

                expect(a100).to.be.true;
                expect(a200).to.be.true;
                expect(a300).to.be.true;
                expect(a400).to.be.true;
                expect(a600).to.be.false;
                expect(a700).to.be.false;

                bar.remove();

                done();

            });

            var a100 = false;
            var a200 = false;
            var a300 = false;
            var a400 = false;
            var a600 = false;
            var a700 = false;

            setTimeout(function () { a100 = true; }, 100);
            setTimeout(function () { a200 = true; }, 200);
            setTimeout(function () { a300 = true; }, 300);
            setTimeout(function () { a400 = true; }, 400);
            setTimeout(function () { a600 = true; }, 600);
            setTimeout(function () { a700 = true; }, 700);

        });


        it('initializes multiple class components', function (done) {

            var foo = $('<div class="foo" />').appendTo(document.body);
            var bar = $('<div class="bar" />').appendTo(document.body);

            $('.cci').getRole('cci').init('foo', 'bar').then(function () {

                expect(foo.attr('is_foo')).to.equal('true');
                expect(bar.attr('is_bar')).to.equal('true');

                done();

                foo.remove();
                bar.remove();

            });

        });

    });

});



before(function () {

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

        pt.__init = function () {

            return new Promise(function (resolve) {

                setTimeout(resolve, 500);

            });

        };

    });

});

describe('$.CC.init', function () {
    'use strict';

    it('initializes the class component of the given name', function (done) {

        var foo = $('<div class="foo" />').appendTo(document.body);

        $.CC.init('foo');

        setTimeout(function () {

            expect(foo.attr('is_foo')).to.equal('true');

            foo.remove();

            done();

        });

    });


    it('returns promise which resolves when the init process of each elem resolves', function (done) {

        var bar = $('<div class="bar" />').appendTo('body');

        $.CC.init('bar').then(function () {

            expect(bar.attr('is_bar')).to.equal('true');

            expect(a100).to.be.true;
            expect(a200).to.be.true;
            expect(a300).to.be.true;
            expect(a400).to.be.true;
            expect(a600).to.be.false;
            expect(a700).to.be.false;

            bar.remove();

            done();

        }).catch(done);

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


    it('initializes multiple class components', function () {

        var foo = $('<div class="foo" />').appendTo('body');
        var bar = $('<div class="bar" />').appendTo('body');

        $.CC.init(['foo', 'bar']).then(function () {

            expect(foo.attr('is_foo')).to.equal('true');
            expect(bar.attr('is_bar')).to.equal('true');

            foo.remove();
            bar.remove();

        });

    });

});

describe('$.fn.spawn', function () {

    it('loads the contents from the url and place them in the element (interpreted as html) and initializes them as class-component', function () {

        var elem = $('<div />').appendTo('body');

        elem.spawn('/base/fixture.html', 'foo bar').then(function () {

            expect(elem.children().length).to.equal(3);

        });

    });

    it('resolves with initialized class components', function () {

        var elem = $('<div />').appendTo('body');

        return elem.spawn('/base/fixture.html', 'foo bar').then(function (elements) {

            expect(elements).to.have.length(3);

            elements.forEach(function (elem) {

                expect(elem).to.be.instanceof(HTMLElement);

            });

        });

    });

});

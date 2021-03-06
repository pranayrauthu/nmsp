var assert = require( 'assert' );
var nmsp = require( '../nmsp' );

describe( 'Static Methods', function () {
    
    it( 'nmsp.extend() should extend destination', function() {

        var expected = {
            a: 1,
            b: {
                c: 1,
                d: 1
            }
        };

        var dest = {
            a: 1,
            b: {
                c: 1
            }
        };

        var src = {
            b: {
                d: 1
            }
        };

        nmsp.extend( dest, src );

        assert.deepEqual( dest, expected );

    });
    
    it( 'nmsp.atPath() should return value at path', function () {

        var src = {
          a: {
            b: {
              c: {
                d: {}
              }
            }
          }
        };

        var shouldEqualObject = nmsp.atPath( 'a.b.c.d', src );

        assert.ok( shouldEqualObject );

        var shouldEqualUndefined = nmsp.atPath( 'a.b.c.d.e.f', src );

        assert.deepEqual( shouldEqualUndefined, undefined );

    });
    
    it( 'nmsp.fromPath() should return an object', function() {

        var expected = {
            a: {
                b: {
                    c: {
                        d: {}
                    }
                }
            }
        };

        var test = nmsp.fromPath( 'a.b.c.d' );

        assert.deepEqual( test, expected );

    });

    it( 'nmsp.plain() should return a plain object', function () {
        
        var props = {
            foo: {
                value: 'Foo',
                enumerable: true
            }
        };
        
        var src = Object.create({
            bar: 'Bar'
        }, props );

        var test = nmsp.plain( src );

        assert.ok( 'foo' in src );
        assert.ok( 'bar' in src );
        
        assert.ok( 'foo' in test );
        assert.ok( !( 'bar' in test ) );

    });

});

describe( 'Instance Methods', function () {

    it( 'nmsp() should create a namespace', function() {

        var expectedValue = {};

        var test = nmsp();

        assert( test.nmsp );
        assert.deepEqual( test, expectedValue );

    });

    it( 'nmsp() should accept an object', function() {

        var expected = {
            a: 1,
            b: {
                c: 1,
                d: 1
            }
        };

        var test = nmsp( expected );

        assert.deepEqual( test, expected );

    });

    it( 'nmsp() should accept a path', function() {

        var pathValue = 'a.b.c.d';

        var expected = {
            a: {
                b: {
                    c: {
                        d: {}
                    }
                }
            }
        };

        var test = nmsp( pathValue );

        assert.deepEqual( test, expected );

    });

    it( 'nmsp#atPath() should return value at provided path', function () {

        var expected = {
            d: true
        };

        var test = nmsp({
            a: {
                b: {
                    c: {
                        d: true
                    }
                }
            }
        });

        var actual = test.atPath( 'a.b.c' );

        assert.deepEqual( actual, expected );

    });

    it( 'nmsp#plain() should return a plain object', function() {

        var test = nmsp({
            bar: 'Bar'
        }).plain();
        
        assert.ok( 'bar' in test );
        assert.ok( !( 'nmsp' in test ) );

    });

    it( 'nmsp#extend() should accept an object', function() {

        var expected = {
            a: 1,
            b: {
                c: 1,
                d: 1
            }
        };

        var test = nmsp();

        var test2 = test.extend({
            a: 1,
            b: {
                c: 1
            }
        });

        test.extend({
            b: {
                d: 1
            }
        });
        
        assert.ok( typeof test2 == 'undefined' );
        assert.deepEqual( test, expected );

    });

    it( 'nmsp#extend() should accept a path', function() {

        var expected = {
            a: 1,
            b: {
                c: 1,
                d: {
                    e: {
                        f: 'f'
                    }
                }
            }
        };

        var test = nmsp();

        test.extend({
            a: 1,
            b: {
                c: 1
            }
        });

        test.extend( 'b.d.e', {
            f: 'f'
        });

        assert.deepEqual( test, expected );

    });
    
    it( 'nmsp#extend() should return undefined', function() {

        var src = nmsp();

        var test = src.extend({
            a: 1
        });

        assert.ok( typeof test === 'undefined' );

    });

    it( 'nmsp() should accept an object and nmsp#extend() should accept an object', function() {

        var expected = {
            a: 1,
            b: {
                c: 1
            }
        };

        var test = nmsp({
             a: 1
        });

        test.extend({
            b: {
                c: 1
            }
        });

        assert.deepEqual( test, expected );

    });

    it( 'nmsp() should accept an object and nmsp#extend() should accept a path and an object', function() {

        var expected = {
            a: {
                b: {
                    c: 1
                }
            }
        };

        var test = nmsp({
            a: 1
        });

        test.extend( 'a.b', {
            c: 1
        });

        assert.deepEqual( test, expected );

    });

    it( 'nmsp() should accept a path and nmsp#extend() should accept a path and an object', function() {

        var pathValue = 'a.b.c';

        var expected = {
            a: {
                b: {
                    c: {
                        d: {}
                    }
                }
            }
        };

        var test = nmsp( pathValue );

        test.extend( 'a.b.c.d', {} );

        assert.deepEqual( test, expected );

    });

});

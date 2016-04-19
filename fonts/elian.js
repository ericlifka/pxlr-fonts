DefineModule('pxlr/fonts/elian', function (require) {
    var Sprite = require('models/sprite');

    var w = "white";
    var n = null;

    return {
        meta: {
            width: 3,
            height: 3,
            lineHeight: 7,
            letterSpacing: 1
        },
        A: new Sprite([
            [w, w, w],
            [n, n, w],
            [n, n, w]
        ]).invertY().rotateRight(),
        B: new Sprite([
            [w, w, w],
            [n, n, w],
            [w, w, w]
        ]).invertY().rotateRight(),
        C: new Sprite([
            [n, n, w],
            [n, n, w],
            [w, w, w]
        ]).invertY().rotateRight(),

        D: new Sprite([
            [w, w, w],
            [w, n, w],
            [w, n, w]
        ]).invertY().rotateRight(),
        E: new Sprite([
            [w, w, w],
            [w, n, w],
            [w, w, w]
        ]).invertY().rotateRight(),
        F: new Sprite([
            [w, n, w],
            [w, n, w],
            [w, w, w]
        ]).invertY().rotateRight(),

        G: new Sprite([
            [w, w, w],
            [w, n, n],
            [w, n, n]
        ]).invertY().rotateRight(),
        H: new Sprite([
            [w, w, w],
            [w, n, n],
            [w, w, w]
        ]).invertY().rotateRight(),
        I: new Sprite([
            [w, n, n],
            [w, n, n],
            [w, w, w]
        ]).invertY().rotateRight(),


        J: new Sprite([
            [w, w, w],
            [n, n, w],
            [n, n, w],
            [n, n, w],
            [n, n, w]
        ]).invertY().rotateRight(),
        K: new Sprite([
            [w, w, w],
            [n, n, w],
            [n, n, w],
            [n, n, w],
            [w, w, w]
        ]).invertY().rotateRight(),
        L: new Sprite([
            [n, n, w],
            [n, n, w],
            [n, n, w],
            [n, n, w],
            [w, w, w]
        ]).invertY().rotateRight(),

        M: new Sprite([
            [w, w, w],
            [w, n, w],
            [w, n, w],
            [n, n, w],
            [n, n, w]
        ]).invertY().rotateRight(),
        N: new Sprite([
            [w, w, w],
            [w, n, w],
            [w, w, w],
            [n, n, w],
            [n, n, w]
        ]).invertY().rotateRight(),
        O: new Sprite([
            [n, n, w],
            [n, n, w],
            [w, n, w],
            [w, n, w],
            [w, w, w]
        ]).invertY().rotateRight(),

        P: new Sprite([
            [w, w, w],
            [w, n, n],
            [w, n, n],
            [w, n, n],
            [w, n, n]
        ]).invertY().rotateRight(),
        Q: new Sprite([
            [w, w, w],
            [w, n, n],
            [w, n, n],
            [w, n, n],
            [w, w, w]
        ]).invertY().rotateRight(),
        R: new Sprite([
            [w, n, n],
            [w, n, n],
            [w, n, n],
            [w, n, n],
            [w, w, w]
        ]).invertY().rotateRight(),


        S: new Sprite([
            [w, w, w],
            [n, n, w],
            [n, n, w],
            [w, n, w],
            [n, n, w]
        ]).invertY().rotateRight(),
        T: new Sprite([
            [w, w, w],
            [n, n, w],
            [w, n, w],
            [n, n, w],
            [w, w, w]
        ]).invertY().rotateRight(),
        U: new Sprite([
            [n, n, w],
            [w, n, w],
            [n, n, w],
            [n, n, w],
            [w, w, w]
        ]).invertY().rotateRight(),

        V: new Sprite([
            [w, w, w],
            [w, n, w],
            [w, n, w],
            [n, n, w],
            [w, n, w]
        ]).invertY().rotateRight(),
        W: new Sprite([
            [w, w, w],
            [w, n, w],
            [w, w, w],
            [n, n, w],
            [w, n, w]
        ]).invertY().rotateRight(),
        X: new Sprite([
            [w, n, w],
            [n, n, w],
            [w, n, w],
            [w, n, w],
            [w, w, w]
        ]).invertY().rotateRight(),

        Y: new Sprite([
            [w, w, w],
            [w, n, n],
            [w, n, n],
            [w, n, w],
            [w, n, n]
        ]).invertY().rotateRight(),
        Z: new Sprite([
            [w, w, w],
            [w, n, n],
            [w, n, w],
            [w, n, n],
            [w, w, w]
        ]).invertY().rotateRight()
    };
});

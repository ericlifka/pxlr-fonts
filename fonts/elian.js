DefineModule('pxlr/fonts/elian', function (require) {
    var Sprite = require('models/sprite');

    var w = "white";
    var n = null;
    var lowerCaseOffset = { x: 0, y: 2 };

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
        ]).invertY().rotateRight().setPermanentOffset(lowerCaseOffset),
        B: new Sprite([
            [w, w, w],
            [n, n, w],
            [w, w, w]
        ]).invertY().rotateRight().setPermanentOffset(lowerCaseOffset),
        C: new Sprite([
            [n, n, w],
            [n, n, w],
            [w, w, w]
        ]).invertY().rotateRight().setPermanentOffset(lowerCaseOffset),

        D: new Sprite([
            [w, w, w],
            [w, n, w],
            [w, n, w]
        ]).invertY().rotateRight().setPermanentOffset(lowerCaseOffset),
        E: new Sprite([
            [w, w, w],
            [w, n, w],
            [w, w, w]
        ]).invertY().rotateRight().setPermanentOffset(lowerCaseOffset),
        F: new Sprite([
            [w, n, w],
            [w, n, w],
            [w, w, w]
        ]).invertY().rotateRight().setPermanentOffset(lowerCaseOffset),

        G: new Sprite([
            [w, w, w],
            [w, n, n],
            [w, n, n]
        ]).invertY().rotateRight().setPermanentOffset(lowerCaseOffset),
        H: new Sprite([
            [w, w, w],
            [w, n, n],
            [w, w, w]
        ]).invertY().rotateRight().setPermanentOffset(lowerCaseOffset),
        I: new Sprite([
            [w, n, n],
            [w, n, n],
            [w, w, w]
        ]).invertY().rotateRight().setPermanentOffset(lowerCaseOffset),


        J: new Sprite([
            [w, w],
            [n, w],
            [n, w],
            [n, w],
            [n, w]
        ]).invertY().rotateRight().setPermanentOffset(lowerCaseOffset),
        K: new Sprite([
            [w, w],
            [n, w],
            [n, w],
            [n, w],
            [w, w]
        ]).invertY().rotateRight(),
        L: new Sprite([
            [n, w],
            [n, w],
            [n, w],
            [n, w],
            [w, w]
        ]).invertY().rotateRight(),

        M: new Sprite([
            [w, w, w],
            [w, n, w],
            [n, n, w],
            [n, n, w],
            [n, n, w]
        ]).invertY().rotateRight().setPermanentOffset(lowerCaseOffset),
        N: new Sprite([
            [w, w, w],
            [w, n, w],
            [w, w, w],
            [n, n, w],
            [n, n, w]
        ]).invertY().rotateRight().setPermanentOffset(lowerCaseOffset),
        O: new Sprite([
            [n, n, w],
            [n, n, w],
            [n, n, w],
            [w, n, w],
            [w, w, w]
        ]).invertY().rotateRight(),

        P: new Sprite([
            [w, w],
            [w, n],
            [w, n],
            [w, n],
            [w, n]
        ]).invertY().rotateRight().setPermanentOffset(lowerCaseOffset),
        Q: new Sprite([
            [w, w],
            [w, n],
            [w, n],
            [w, n],
            [w, w]
        ]).invertY().rotateRight(),
        R: new Sprite([
            [w, n],
            [w, n],
            [w, n],
            [w, n],
            [w, w]
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

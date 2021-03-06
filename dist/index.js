(function () {
/* start:pxlr-fonts */
SM.DefineModule('pxlr/fonts', function () {
    return {
        name: "pxlr-fonts",
        information: "Collection of pixel fonts meant for use with the pxlr engine"
    };
});

/* provide namespace backwards compatibility for v1 */
SM.DefineModule('fonts/arcade', function (require) {
    return require('pxlr/fonts/arcade');
});
SM.DefineModule('fonts/arcade-small', function (require) {
    return require('pxlr/fonts/arcade-small');
});
SM.DefineModule('fonts/phoenix', function (require) {
    return require('pxlr/fonts/phoenix');
});

SM.DefineModule('pxlr/fonts/arcade-small', function (require) {
    var Sprite = require('models/sprite');

    var w = "white";
    var n = null;

    return {
        meta: {
            width: 3,
            height: 5,
            lineHeight: 8,
            letterSpacing: 1,
            credit: "me"
        },
        A: new Sprite([
            [ n, w, w, w, w ],
            [ w, n, w, n, n ],
            [ n, w, w, w, w ]
        ]),
        B: new Sprite([
            [ w, w, w, w, w ],
            [ w, n, w, n, w ],
            [ n, w, n, w, n ]
        ]),
        C: new Sprite([
            [ n, w, w, w, n ],
            [ w, n, n, n, w ],
            [ n, w, n, w, n ]
        ]),
        D: new Sprite([
            [ w, w, w, w, w ],
            [ w, n, n, n, w ],
            [ n, w, w, w, n ]
        ]),
        E: new Sprite([
            [ w, w, w, w, w ],
            [ w, n, w, n, w ],
            [ w, n, n, n, w ]
        ]),
        F: new Sprite([
            [ w, w, w, w, w ],
            [ w, n, w, n, n ],
            [ w, n, n, n, n ]
        ]),
        G: new Sprite([
            [ n, w, w, w, n ],
            [ w, n, n, n, w ],
            [ w, n, n, w, w ]
        ]),
        H: new Sprite([
            [ w, w, w, w, w ],
            [ n, n, w, n, n ],
            [ w, w, w, w, w ]
        ]),
        I: new Sprite([
            [ w, n, n, n, w ],
            [ w, w, w, w, w ],
            [ w, n, n, n, w ]
        ]),
        J: new Sprite([
            [ n, n, n, w, n ],
            [ n, n, n, n, w ],
            [ w, w, w, w, n ]
        ]),
        K: new Sprite([
            [ w, w, w, w, w ],
            [ n, n, w, n, n ],
            [ w, w, n, w, w ]
        ]),
        L: new Sprite([
            [ w, w, w, w, w ],
            [ n, n, n, n, w ],
            [ n, n, n, n, w ]
        ]),
        M: new Sprite([
            [ w, w, w, w, w ],
            [ n, w, n, n, n ],
            [ n, n, w, n, n ],
            [ n, w, n, n, n ],
            [ w, w, w, w, w ]
        ]),
        N: new Sprite([
            [ w, w, w, w, w ],
            [ n, w, n, n, n ],
            [ n, n, w, n, n ],
            [ w, w, w, w, w ]
        ]),
        O: new Sprite([
            [ n, w, w, w, n ],
            [ w, n, n, n, w ],
            [ n, w, w, w, n ]
        ]),
        P: new Sprite([
            [ w, w, w, w, w ],
            [ w, n, w, n, n ],
            [ n, w, n, n, n ]
        ]),
        Q: new Sprite([
            [ n, w, w, w, n ],
            [ w, n, n, n, w ],
            [ w, n, n, w, w ],
            [ n, w, w, w, w ]
        ]),
        R: new Sprite([
            [ w, w, w, w, w ],
            [ w, n, w, n, n ],
            [ n, w, n, w, w ]
        ]),
        S: new Sprite([
            [ n, w, n, n, w ],
            [ w, n, w, n, w ],
            [ w, n, n, w, n ]
        ]),
        T: new Sprite([
            [ w, n, n, n, n ],
            [ w, w, w, w, w ],
            [ w, n, n, n, n ]
        ]),
        U: new Sprite([
            [ w, w, w, w, n ],
            [ n, n, n, n, w ],
            [ w, w, w, w, w ]
        ]),
        V: new Sprite([
            [ w, w, w, w, n ],
            [ n, n, n, n, w ],
            [ w, w, w, w, n ]
        ]),
        W: new Sprite([
            [ w, w, w, w, n ],
            [ n, n, n, n, w ],
            [ n, n, n, w, n ],
            [ n, n, n, n, w ],
            [ w, w, w, w, n ]
        ]),
        X: new Sprite([
            [ w, w, n, w, w ],
            [ n, n, w, n, n ],
            [ w, w, n, w, w ]
        ]),
        Y: new Sprite([
            [ w, w, n, n, n ],
            [ n, n, w, n, w ],
            [ w, w, w, w, n ]
        ]),
        Z: new Sprite([
            [ w, n, n, w, w ],
            [ w, n, w, n, w ],
            [ w, w, n, n, w ]
        ]),
        a: new Sprite([
            [ n, n, n, n, w, n ],
            [ n, w, n, w, n, w ],
            [ n, w, w, w, w, w ]
        ]),
        b: new Sprite([
            [ w, w, w, w, w ],
            [ n, n, w, n, w ],
            [ n, n, n, w, w ]
        ]),
        c: new Sprite([
            [ n, w, w, w, w ],
            [ n, w, n, n, w ]
        ]),
        d: new Sprite([
            [ n, n, n, w, w ],
            [ n, n, w, n, w ],
            [ w, w, w, w, w ]
        ]),
        e: new Sprite([
            [ n, w, w, w, w, n ],
            [ n, w, n, w, n, w ],
            [ n, n, w, w, n, n ]
        ]),
        f: new Sprite([
            [ w, w, w, w, w ],
            [ w, n, w, n, n ]
        ]),
        g: new Sprite([
            [ n, n, w, w, n, n, w ],
            [ n, n, w, n, w, n, w ],
            [ n, n, w, w, w, w, n ]
        ]),
        h: new Sprite([
            [ w, w, w, w, w ],
            [ n, n, w, n, n ],
            [ n, n, n, w, w ]
        ]),
        i: new Sprite([
            [ w, n, w, w, w ]
        ]),
        j: new Sprite([
            [ n, n, n, n, n, w ],
            [ n, w, n, w, w, w ]
        ]),
        k: new Sprite([
            [ w, w, w, w, w ],
            [ n, n, w, n, n ],
            [ n, w, n, w, w ]
        ]),
        l: new Sprite([
            [ w, w, w, w, w ]
        ]),
        m: new Sprite([
            [ n, n, w, w, w ],
            [ n, n, w, n, n ],
            [ n, n, n, w, n ],
            [ n, n, w, n, n ],
            [ n, n, w, w, w ]
        ]),
        n: new Sprite([
            [ n, n, w, w, w ],
            [ n, n, w, n, n ],
            [ n, n, n, w, w ]
        ]),
        o: new Sprite([
            [ n, n, w, w, w ],
            [ n, n, w, n, w ],
            [ n, n, w, w, w ]
        ]),
        p: new Sprite([
            [ n, n, w, w, w, w, w ],
            [ n, n, w, n, w, n, n ],
            [ n, n, w, w, n, n, n ]
        ]),
        q: new Sprite([
            [ n, n, w, w, n, n, n ],
            [ n, n, w, n, w, n, n ],
            [ n, n, w, w, w, w, w ]
        ]),
        r: new Sprite([
            [ n, n, w, w, w ],
            [ n, n, w, n, n ]
        ]),
        s: new Sprite([
            [ n, w, w, n, w ],
            [ n, w, n, w, w ]
        ]),
        t: new Sprite([
            [ n, w, n, n, n ],
            [ w, w, w, w, w ],
            [ n, w, n, n, n ]
        ]),
        u: new Sprite([
            [ n, n, w, w, n ],
            [ n, n, n, n, w ],
            [ n, n, w, w, w ]
        ]),
        v: new Sprite([
            [ n, n, w, w, n ],
            [ n, n, n, n, w ],
            [ n, n, w, w, n ]
        ]),
        w: new Sprite([
            [ n, n, w, w, n ],
            [ n, n, n, n, w ],
            [ n, n, n, w, w ],
            [ n, n, n, n, w ],
            [ n, n, w, w, n ]
        ]),
        x: new Sprite([
            [ n, n, w, n, w ],
            [ n, n, n, w, n ],
            [ n, n, w, n, w ]
        ]),
        y: new Sprite([
            [ n, n, w, w, w, n, w ],
            [ n, n, n, n, w, n, w ],
            [ n, n, w, w, w, w, n ]
        ]),
        z: new Sprite([
            [ n, n, w, n, n ],
            [ n, n, w, w, w ],
            [ n, n, n, n, w ]
        ]),
        '0': new Sprite([
            [ w, w, w, w, w ],
            [ w, n, n, n, w ],
            [ w, w, w, w, w ]
        ]),
        '1': new Sprite([
            [ w, n, n, n, w ],
            [ w, w, w, w, w ],
            [ n, n, n, n, w ]
        ]),
        '2': new Sprite([
            [ w, n, w, w, w ],
            [ w, n, w, n, w ],
            [ n, w, w, n, w ]
        ]),
        '3': new Sprite([
            [ w, n, w, n, w ],
            [ w, n, w, n, w ],
            [ w, w, w, w, w ]
        ]),
        '4': new Sprite([
            [ w, w, n, n, n ],
            [ n, n, w, n, n ],
            [ w, w, w, w, w ]
        ]),
        '5': new Sprite([
            [ w, w, w, n, w ],
            [ w, n, w, n, w ],
            [ w, n, n, w, w ]
        ]),
        '6': new Sprite([
            [ w, w, w, w, w ],
            [ w, n, w, n, w ],
            [ w, n, n, w, w ]
        ]),
        '7': new Sprite([
            [ w, n, n, w, w ],
            [ w, n, w, n, n ],
            [ w, w, n, n, n ]
        ]),
        '8': new Sprite([
            [ w, w, n, w, w ],
            [ w, n, w, n, w ],
            [ w, w, n, w, w ]
        ]),
        '9': new Sprite([
            [ w, w, n, n, w ],
            [ w, n, w, n, w ],
            [ w, w, w, w, w ]
        ]),
        '!': new Sprite([
            [ w, w, w, n, w ]
        ]),
        '.': new Sprite([
            [ n, n, n, n, w ]
        ]),
        ',': new Sprite([
            [ n, n, n, n, w, w ]
        ]),
        '?': new Sprite([
            [ w, n, w, w, n, w ],
            [ n, w, n, n, n, n ]
        ]),
        '<': new Sprite([
            [ n, n, w, n, n],
            [ n, w, w, w, n],
            [ w, w, n, w, w],
            [ w, n, n, n, w]

        ]),
        '>': new Sprite([
            [ w, n, n, n, w],
            [ w, w, n, w, w],
            [ n, w, w, w, n],
            [ n, n, w, n, n]
        ]),
        '-': new Sprite([
            [ n, n, w, n, n ],
            [ n, n, w, n, n ],
            [ n, n, w, n, n ]
        ]),
        ':': new Sprite([
            [ n, n, n, n, n ],
            [ n, n, w, n, w ],
            [ n, n, n, n, n ]
        ]),
        '$': new Sprite([
            [ n, n, w, n ],
            [ w, w, w, w ],
            [ w, n, w, n ],
            [ w, w, w, w ],
            [ n, w, n, w ],
            [ w, w, w, w ],
            [ n, w, n, n ]
        ]).invertY().rotateRight().setPermanentOffset({x: 0, y: -1}),
        '+': new Sprite([
            [ n, n, n ],
            [ n, w, n ],
            [ w, w, w ],
            [ n, w, n ],
            [ n, n, n ]
        ]).invertY().rotateRight(),
        '%': new Sprite([
            [ w, n, n, w ],
            [ n, n, w, w ],
            [ n, w, w, n ],
            [ w, w, n, n ],
            [ w, n, n, w ]
        ]).invertY().rotateRight(),
        ' ': new Sprite([
            [ n, n, n, n, n ],
            [ n, n, n, n, n ],
            [ n, n, n, n, n ]
        ])
    };
});

SM.DefineModule('pxlr/fonts/arcade', function (require) {
    var Sprite = require('models/sprite');

    var w = "white";
    var n = null;

    return {
        meta: {
            width: 7,
            height: 7,
            lineHeight: 11,
            letterSpacing: 1,
            credit: "http://www.urbanfonts.com/fonts/Arcade.htm"
        },
        A: new Sprite([
            [ n, n, w, w, w, w, w ],
            [ n, w, w, w, w, w, w ],
            [ w, w, n, n, w, n, n ],
            [ w, n, n, n, w, n, n ],
            [ w, w, n, n, w, n, n ],
            [ n, w, w, w, w, w, w ],
            [ n, n, w, w, w, w, w ]
        ]),
        B: new Sprite([
            [ w, w, w, w, w, w, w ],
            [ w, w, w, w, w, w, w ],
            [ w, n, n, w, n, n, w ],
            [ w, n, n, w, n, n, w ],
            [ w, n, n, w, n, n, w ],
            [ w, w, w, w, w, w, w ],
            [ n, w, w, n, w, w, n ]
        ]),
        C: new Sprite([
            [ n, w, w, w, w, w, n ],
            [ w, w, w, w, w, w, w ],
            [ w, n, n, n, n, n, w ],
            [ w, n, n, n, n, n, w ],
            [ w, n, n, n, n, n, w ],
            [ w, w, n, n, n, w, w ],
            [ n, w, n, n, n, w, n ]
        ]),
        D: new Sprite([
            [ w, w, w, w, w, w, w ],
            [ w, w, w, w, w, w, w ],
            [ w, n, n, n, n, n, w ],
            [ w, n, n, n, n, n, w ],
            [ w, n, n, n, n, n, w ],
            [ w, w, w, w, w, w, w ],
            [ n, w, w, w, w, w, n ]
        ]),
        E: new Sprite([
            [ w, w, w, w, w, w, w ],
            [ w, w, w, w, w, w, w ],
            [ w, n, n, w, n, n, w ],
            [ w, n, n, w, n, n, w ],
            [ w, n, n, w, n, n, w ],
            [ w, n, n, w, n, n, w ],
            [ w, n, n, n, n, n, w ]
        ]),
        F: new Sprite([
            [ w, w, w, w, w, w, w ],
            [ w, w, w, w, w, w, w ],
            [ w, n, n, w, n, n, n ],
            [ w, n, n, w, n, n, n ],
            [ w, n, n, w, n, n, n ],
            [ w, n, n, w, n, n, n ],
            [ w, n, n, n, n, n, n ]
        ]),
        G: new Sprite([
            [ n, w, w, w, w, w, n ],
            [ w, w, w, w, w, w, w ],
            [ w, n, n, n, n, n, w ],
            [ w, n, n, n, n, n, w ],
            [ w, n, n, w, n, n, w ],
            [ w, w, n, w, w, w, w ],
            [ n, w, n, w, w, w, n ]
        ]),
        H: new Sprite([
            [ w, w, w, w, w, w, w ],
            [ w, w, w, w, w, w, w ],
            [ n, n, n, w, n, n, n ],
            [ n, n, n, w, n, n, n ],
            [ n, n, n, w, n, n, n ],
            [ w, w, w, w, w, w, w ],
            [ w, w, w, w, w, w, w ]
        ]),
        I: new Sprite([
            [ w, n, n, n, n, n, w ],
            [ w, n, n, n, n, n, w ],
            [ w, w, w, w, w, w, w ],
            [ w, w, w, w, w, w, w ],
            [ w, n, n, n, n, n, w ],
            [ w, n, n, n, n, n, w ]
        ]),
        J: new Sprite([
            [ n, n, n, n, n, w, n ],
            [ n, n, n, n, n, w, w ],
            [ w, n, n, n, n, n, w ],
            [ w, n, n, n, n, n, w ],
            [ w, w, w, w, w, w, w ],
            [ w, w, w, w, w, w, n ],
            [ w, n, n, n, n, n, n ]
        ]),
        K: new Sprite([
            [ w, w, w, w, w, w, w ],
            [ w, w, w, w, w, w, w ],
            [ n, n, n, w, w, n, n ],
            [ n, n, w, w, w, w, n ],
            [ n, w, w, n, w, w, n ],
            [ w, w, n, n, n, w, w ],
            [ w, n, n, n, n, n, w ]
        ]),
        L: new Sprite([
            [ w, w, w, w, w, w, w ],
            [ w, w, w, w, w, w, w ],
            [ n, n, n, n, n, n, w ],
            [ n, n, n, n, n, n, w ],
            [ n, n, n, n, n, n, w ],
            [ n, n, n, n, n, n, w ],
            [ n, n, n, n, n, n, w ]
        ]),
        M: new Sprite([
            [ w, w, w, w, w, w, w ],
            [ n, w, w, w, w, w, w ],
            [ n, n, w, w, n, n, n ],
            [ n, n, n, w, w, n, n ],
            [ n, n, w, w, n, n, n ],
            [ n, w, w, w, w, w, w ],
            [ w, w, w, w, w, w, w ]
        ]),
        N: new Sprite([
            [ w, w, w, w, w, w, w ],
            [ w, w, w, w, w, w, w ],
            [ n, w, w, n, n, n, n ],
            [ n, n, w, w, n, n, n ],
            [ n, n, n, w, w, n, n ],
            [ w, w, w, w, w, w, w ],
            [ w, w, w, w, w, w, w ]
        ]),
        O: new Sprite([
            [ n, w, w, w, w, w, n ],
            [ w, w, w, w, w, w, w ],
            [ w, n, n, n, n, n, w ],
            [ w, n, n, n, n, n, w ],
            [ w, n, n, n, n, n, w ],
            [ w, w, w, w, w, w, w ],
            [ n, w, w, w, w, w, n ]
        ]),
        P: new Sprite([
            [ w, w, w, w, w, w, w ],
            [ w, w, w, w, w, w, w ],
            [ w, n, n, w, n, n, n ],
            [ w, n, n, w, n, n, n ],
            [ w, n, n, w, n, n, n ],
            [ w, w, w, w, n, n, n ],
            [ n, w, w, n, n, n, n ]
        ]),
        Q: new Sprite([
            [ n, w, w, w, w, w, n ],
            [ w, w, w, w, w, w, w ],
            [ w, n, n, n, n, n, w ],
            [ w, n, n, n, w, n, w ],
            [ w, n, n, n, w, w, n ],
            [ w, w, w, w, w, w, w ],
            [ n, w, w, w, w, n, w ]
        ]),
        R: new Sprite([
            [ w, w, w, w, w, w, w ],
            [ w, w, w, w, w, w, w ],
            [ w, n, n, w, n, n, n ],
            [ w, n, n, w, w, n, n ],
            [ w, n, n, w, w, w, n ],
            [ w, w, w, w, n, w, w ],
            [ n, w, w, n, n, n, w ]
        ]),
        S: new Sprite([
            [ n, w, w, n, n, w, n ],
            [ w, w, w, w, n, w, w ],
            [ w, n, n, w, n, n, w ],
            [ w, n, n, w, n, n, w ],
            [ w, n, n, w, n, n, w ],
            [ w, w, n, w, w, w, w ],
            [ n, w, n, n, w, w, n ]
        ]),
        T: new Sprite([
            [ w, n, n, n, n, n, n ],
            [ w, n, n, n, n, n, n ],
            [ w, w, w, w, w, w, w ],
            [ w, w, w, w, w, w, w ],
            [ w, n, n, n, n, n, n ],
            [ w, n, n, n, n, n, n ]
        ]),
        U: new Sprite([
            [ w, w, w, w, w, w, n ],
            [ w, w, w, w, w, w, w ],
            [ n, n, n, n, n, n, w ],
            [ n, n, n, n, n, n, w ],
            [ n, n, n, n, n, n, w ],
            [ w, w, w, w, w, w, w ],
            [ w, w, w, w, w, w, n ]
        ]),
        V: new Sprite([
            [ w, w, w, w, w, n, n ],
            [ w, w, w, w, w, w, n ],
            [ n, n, n, n, n, w, w ],
            [ n, n, n, n, n, n, w ],
            [ n, n, n, n, n, w, w ],
            [ w, w, w, w, w, w, n ],
            [ w, w, w, w, w, n, n ]
        ]),
        W: new Sprite([
            [ w, w, w, w, w, w, n ],
            [ w, w, w, w, w, w, w ],
            [ n, n, n, n, n, w, w ],
            [ n, n, n, n, w, w, n ],
            [ n, n, n, n, n, w, w ],
            [ w, w, w, w, w, w, w ],
            [ w, w, w, w, w, w, n ]
        ]),
        X: new Sprite([
            [ w, n, n, n, n, w, w ],
            [ w, w, n, n, w, w, n ],
            [ n, w, w, w, w, n, n ],
            [ n, n, w, w, n, n, n ],
            [ n, w, w, w, w, n, n ],
            [ w, w, n, n, w, w, n ],
            [ w, n, n, n, n, w, w ]
        ]),
        Y: new Sprite([
            [ w, w, w, n, n, n, n ],
            [ w, w, w, w, n, n, n ],
            [ n, n, n, w, w, w, w ],
            [ n, n, n, w, w, w, w ],
            [ w, w, w, w, n, n, n ],
            [ w, w, w, n, n, n, n ],
            [ n, n, n, n, n, n, n ]
        ]),
        Z: new Sprite([
            [ w, n, n, n, n, w, w ],
            [ w, n, n, n, w, w, w ],
            [ w, n, n, w, w, n, w ],
            [ w, n, w, w, n, n, w ],
            [ w, w, w, n, n, n, w ],
            [ w, w, n, n, n, n, w ],
            [ w, n, n, n, n, n, w ]
        ]),
        a: new Sprite([
            [ n, n, n, n, n, w, n ],
            [ n, n, w, n, w, w, w ],
            [ n, n, w, n, w, n, w ],
            [ n, n, w, n, w, n, w ],
            [ n, n, w, n, w, n, w ],
            [ n, n, w, w, w, w, w ],
            [ n, n, n, w, w, w, w ]
        ]),
        b: new Sprite([
            [ w, w, w, w, w, w, w ],
            [ w, w, w, w, w, w, w ],
            [ n, n, w, n, n, n, w ],
            [ n, n, w, n, n, n, w ],
            [ n, n, w, n, n, n, w ],
            [ n, n, w, w, w, w, w ],
            [ n, n, n, w, w, w, n ]
        ]),
        c: new Sprite([
            [ n, n, n, w, w, w, n ],
            [ n, n, w, w, w, w, w ],
            [ n, n, w, n, n, n, w ],
            [ n, n, w, n, n, n, w ],
            [ n, n, w, n, n, n, w ],
            [ n, n, w, w, n, w, w ],
            [ n, n, n, w, n, w, n ]
        ]),
        d: new Sprite([
            [ n, n, n, w, w, w, n ],
            [ n, n, w, w, w, w, w ],
            [ n, n, w, n, n, n, w ],
            [ n, n, w, n, n, n, w ],
            [ n, n, w, n, n, n, w ],
            [ w, w, w, w, w, w, w ],
            [ w, w, w, w, w, w, w ]
        ]),
        e: new Sprite([
            [ n, n, n, w, w, w, n ],
            [ n, n, w, w, w, w, w ],
            [ n, n, w, n, w, n, w ],
            [ n, n, w, n, w, n, w ],
            [ n, n, w, n, w, n, w ],
            [ n, n, w, w, w, n, w ],
            [ n, n, n, w, w, n, n ]
        ]),
        f: new Sprite([
            [ n, n, w, n, n, n, n ],
            [ n, w, w, w, w, w, w ],
            [ w, w, w, w, w, w, w ],
            [ w, n, w, n, n, n, n ],
            [ w, n, n, n, n, n, n ]
        ]),
        g: new Sprite([
            [ n, n, n, w, w, w, n, n, n ],
            [ n, n, w, w, w, w, w, n, w ],
            [ n, n, w, n, n, n, w, n, w ],
            [ n, n, w, n, n, n, w, n, w ],
            [ n, n, w, n, n, n, w, n, w ],
            [ n, n, w, w, w, w, w, w, w ],
            [ n, n, n, w, w, w, w, w, n ]
        ]),
        h: new Sprite([
            [ w, w, w, w, w, w, w ],
            [ w, w, w, w, w, w, w ],
            [ n, n, w, n, n, n, n ],
            [ n, n, w, n, n, n, n ],
            [ n, n, w, n, n, n, n ],
            [ n, n, w, w, w, w, w ],
            [ n, n, n, w, w, w, w ]
        ]),
        i: new Sprite([
            [ w, n, w, w, w, w, w ],
            [ w, n, w, w, w, w, w ]
        ]),
        j: new Sprite([
            [ n, n, n, n, n, n, w ],
            [ n, n, w, n, n, n, w ],
            [ w, n, w, w, w, w, w ],
            [ w, n, w, w, w, w, n ]
        ]),
        k: new Sprite([
            [ w, w, w, w, w, w, w ],
            [ w, w, w, w, w, w, w ],
            [ n, n, n, n, w, n, n ],
            [ n, n, n, w, w, w, n ],
            [ n, n, w, w, n, w, w ],
            [ n, n, w, n, n, n, w ]
        ]),
        l: new Sprite([
            [ w, w, w, w, w, w, w ],
            [ w, w, w, w, w, w, w ]
        ]),
        m: new Sprite([
            [ n, n, w, w, w, w, w ],
            [ n, n, w, w, w, w, w ],
            [ n, n, w, n, n, n, n ],
            [ n, n, n, w, w, w, w ],
            [ n, n, w, n, n, n, n ],
            [ n, n, w, w, w, w, w ],
            [ n, n, n, w, w, w, w ]
        ]),
        n: new Sprite([
            [ n, n, w, w, w, w, w ],
            [ n, n, w, w, w, w, w ],
            [ n, n, w, n, n, n, n ],
            [ n, n, w, n, n, n, n ],
            [ n, n, w, w, w, w, w ],
            [ n, n, n, w, w, w, w ]
        ]),
        o: new Sprite([
            [ n, n, n, w, w, w, n ],
            [ n, n, w, w, w, w, w ],
            [ n, n, w, n, n, n, w ],
            [ n, n, w, n, n, n, w ],
            [ n, n, w, n, n, n, w ],
            [ n, n, w, w, w, w, w ],
            [ n, n, n, w, w, w, n ]
        ]),
        p: new Sprite([
            [ n, n, w, w, w, w, w, w, w ],
            [ n, n, w, w, w, w, w, w, w ],
            [ n, n, w, n, n, n, w, n, n ],
            [ n, n, w, n, n, n, w, n, n ],
            [ n, n, w, n, n, n, w, n, n ],
            [ n, n, w, w, w, w, w, n, n ],
            [ n, n, n, w, w, w, n, n, n ]
        ]),
        q: new Sprite([
            [ n, n, n, w, w, w, n, n, n ],
            [ n, n, w, w, w, w, w, n, n ],
            [ n, n, w, n, n, n, w, n, n ],
            [ n, n, w, n, n, n, w, n, n ],
            [ n, n, w, n, n, n, w, n, n ],
            [ n, n, w, w, w, w, w, w, w ],
            [ n, n, w, w, w, w, w, w, w ]
        ]),
        r: new Sprite([
            [ n, n, w, w, w, w, w ],
            [ n, n, w, w, w, w, w ],
            [ n, n, n, w, n, n, n ],
            [ n, n, w, n, n, n, n ],
            [ n, n, w, n, n, n, n ]
        ]),
        s: new Sprite([
            [ n, n, n, w, n, n, n ],
            [ n, n, w, w, w, n, w ],
            [ n, n, w, n, w, n, w ],
            [ n, n, w, n, w, n, w ],
            [ n, n, w, n, w, n, w ],
            [ n, n, w, n, w, w, w ],
            [ n, n, n, n, n, w, n ]
        ]),
        t: new Sprite([
            [ n, n, w, n, n, n, n ],
            [ w, w, w, w, w, w, n ],
            [ w, w, w, w, w, w, w ],
            [ n, n, w, n, n, n, w ],
            [ n, n, n, n, n, n, w ]
        ]),
        u: new Sprite([
            [ n, n, w, w, w, w, w ],
            [ n, n, w, w, w, w, w ],
            [ n, n, n, n, n, n, w ],
            [ n, n, n, n, n, n, w ],
            [ n, n, n, n, n, n, w ],
            [ n, n, w, w, w, w, w ],
            [ n, n, w, w, w, w, n ]
        ]),
        v: new Sprite([
            [ n, n, w, w, w, n, n ],
            [ n, n, w, w, w, w, n ],
            [ n, n, n, n, n, w, w ],
            [ n, n, n, n, n, n, w ],
            [ n, n, n, n, n, w, w ],
            [ n, n, w, w, w, w, n ],
            [ n, n, w, w, w, n, n ]
        ]),
        w: new Sprite([
            [ n, n, w, w, w, w, n ],
            [ n, n, w, w, w, w, w ],
            [ n, n, n, n, n, n, w ],
            [ n, n, n, n, n, w, n ],
            [ n, n, n, n, n, n, w ],
            [ n, n, w, w, w, w, w ],
            [ n, n, w, w, w, w, n ]
        ]),
        x: new Sprite([
            [ n, n, w, n, n, n, w ],
            [ n, n, w, w, n, w, w ],
            [ n, n, n, w, w, w, n ],
            [ n, n, n, n, w, n, n ],
            [ n, n, n, w, w, w, n ],
            [ n, n, w, w, n, w, w ],
            [ n, n, w, n, n, n, w ]
        ]),
        y: new Sprite([
            [ n, n, w, w, w, w, n, n, n ],
            [ n, n, w, w, w, w, w, n, w ],
            [ n, n, n, n, n, n, w, n, w ],
            [ n, n, n, n, n, n, w, n, w ],
            [ n, n, n, n, n, n, w, n, w ],
            [ n, n, w, w, w, w, w, w, w ],
            [ n, n, w, w, w, w, w, w, n ]
        ]),
        z: new Sprite([
            [ n, n, w, n, n, n, w ],
            [ n, n, w, n, n, w, w ],
            [ n, n, w, n, w, w, w ],
            [ n, n, w, n, w, n, w ],
            [ n, n, w, w, w, n, w ],
            [ n, n, w, w, n, n, w ],
            [ n, n, w, n, n, n, w ]
        ]),
        ' ': new Sprite([
            [ n, n, n, n, n, n, n ],
            [ n, n, n, n, n, n, n ],
            [ n, n, n, n, n, n, n ],
            [ n, n, n, n, n, n, n ],
            [ n, n, n, n, n, n, n ]
        ]),
        '0': new Sprite([
            [ n, w, w, w, w, w, n ],
            [ w, w, w, w, w, w, w ],
            [ w, n, n, n, n, n, w ],
            [ w, n, n, n, n, n, w ],
            [ w, w, w, w, w, w, w ],
            [ n, w, w, w, w, w, n ]
        ]),
        '1': new Sprite([
            [ n, n, n, n, n, n, w ],
            [ n, w, n, n, n, n, w ],
            [ w, w, w, w, w, w, w ],
            [ w, w, w, w, w, w, w ],
            [ n, n, n, n, n, n, w ],
            [ n, n, n, n, n, n, w ]
        ]),
        '2': new Sprite([
            [ n, w, n, n, n, w, w ],
            [ w, w, n, n, w, w, w ],
            [ w, n, n, w, w, n, w ],
            [ w, n, n, w, n, n, w ],
            [ w, n, w, w, n, n, w ],
            [ w, w, w, n, n, n, w ],
            [ n, w, n, n, n, n, w ]
        ]),
        '3': new Sprite([
            [ n, w, n, n, n, w, n ],
            [ w, w, n, n, n, w, w ],
            [ w, n, n, n, n, n, w ],
            [ w, n, n, w, n, n, w ],
            [ w, n, n, w, n, n, w ],
            [ w, w, w, w, w, w, w ],
            [ n, w, w, n, w, w, n ]
        ]),
        '4': new Sprite([
            [ n, n, n, w, w, n, n ],
            [ n, n, w, w, w, n, n ],
            [ n, w, w, n, w, n, n ],
            [ w, w, n, n, w, n, n ],
            [ w, w, w, w, w, w, w ],
            [ w, w, w, w, w, w, w ],
            [ n, n, n, n, w, n, n ]
        ]),
        '5': new Sprite([
            [ w, w, w, n, n, w, n ],
            [ w, w, w, n, n, w, w ],
            [ w, n, w, n, n, n, w ],
            [ w, n, w, n, n, n, w ],
            [ w, n, w, n, n, n, w ],
            [ w, n, w, w, w, w, w ],
            [ n, n, n, w, w, w, n ]

        ]),
        '6': new Sprite([
            [ n, w, w, w, w, w, n ],
            [ w, w, w, w, w, w, w ],
            [ w, n, n, w, n, n, w ],
            [ w, n, n, w, n, n, w ],
            [ w, n, n, w, n, n, w ],
            [ w, w, n, w, w, w, w ],
            [ n, w, n, n, w, w, n ]
        ]),
        '7': new Sprite([
            [ w, n, n, n, n, n, n ],
            [ w, n, n, n, n, n, n ],
            [ w, n, n, w, w, w, w ],
            [ w, n, w, w, w, w, w ],
            [ w, w, w, n, n, n, n ],
            [ w, w, n, n, n, n, n ],
            [ w, n, n, n, n, n, n ]
        ]),
        '8': new Sprite([
            [ n, w, w, n, w, w, n ],
            [ w, w, w, w, w, w, w ],
            [ w, n, n, w, n, n, w ],
            [ w, n, n, w, n, n, w ],
            [ w, n, n, w, n, n, w ],
            [ w, w, w, w, w, w, w ],
            [ n, w, w, n, w, w, n ]
        ]),
        '9': new Sprite([
            [ n, w, w, n, n, n, n ],
            [ w, w, w, w, n, n, n ],
            [ w, n, n, w, n, n, w ],
            [ w, n, n, w, n, n, w ],
            [ w, n, n, w, n, w, w ],
            [ w, w, w, w, w, w, n ],
            [ n, w, w, w, w, n, n ]
        ]),
        '!': new Sprite([
            [ n, n, n, n, n, n, w ],
            [ n, n, n, n, w, n, w ],
            [ n, n, n, w, w, n, n ],
            [ n, n, w, w, n, n, n ],
            [ n, w, w, w, n, n, n ],
            [ w, w, w, n, n, n, n ],
            [ w, w, w, n, n, n, n ]
        ]),
        '.': new Sprite([
            [ n, n, n, n, n, w, w ],
            [ n, n, n, n, n, w, w ],
            [ n, n, n, n, n, n, n ],
            [ n, n, n, n, n, n, n ]
        ]),
        ',': new Sprite([
            [ n, n, n, n, n, n, n, w ],
            [ n, n, n, n, n, w, w, w ],
            [ n, n, n, n, n, w, w, n ]
        ]),
        '?': new Sprite([
            [ n, w, n, n, n, n, n ],
            [ w, w, n, n, n, n, n ],
            [ w, n, n, w, n, w, w ],
            [ w, n, w, w, n, w, w ],
            [ w, w, w, n, n, n, n ],
            [ n, w, n, n, n, n, n ]
        ]),
        '$': new Sprite([
            [ n, n, w, n, n ],
            [ n, w, w, w, n ],
            [ w, n, w, n, w ],
            [ n, w, w, n, n ],
            [ n, n, w, n, n ],
            [ n, n, w, w, n ],
            [ w, n, w, n, w ],
            [ n, w, w, w, n ],
            [ n, n, w, n, n ]
        ]).invertY().rotateRight(),
        '-': new Sprite([
            [ n, n, n, n ],
            [ n, n, n, n ],
            [ n, n, n, n ],
            [ w, w, w, w ]
        ]).invertY().rotateRight()
    };
});

SM.DefineModule('pxlr/fonts/elian', function (require) {
    var Sprite = require('models/sprite');

    var w = "white";
    var n = null;
    var lowerCaseOffset = { x: 0, y: 2 };

    var font = {
        meta: {
            width: 3,
            height: 3,
            lineHeight: 7,
            letterSpacing: 1
        },
        A: new Sprite([
            [w, w],
            [n, w],
            [n, w]
        ]).invertY().rotateRight().setPermanentOffset(lowerCaseOffset),
        B: new Sprite([
            [w, w],
            [n, w],
            [w, w]
        ]).invertY().rotateRight().setPermanentOffset(lowerCaseOffset),
        C: new Sprite([
            [n, w],
            [n, w],
            [w, w]
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
            [w, w],
            [w, n],
            [w, n]
        ]).invertY().rotateRight().setPermanentOffset(lowerCaseOffset),
        H: new Sprite([
            [w, w],
            [w, n],
            [w, w]
        ]).invertY().rotateRight().setPermanentOffset(lowerCaseOffset),
        I: new Sprite([
            [w, n],
            [w, n],
            [w, w]
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
        ]).invertY().rotateRight().setPermanentOffset({x: 0, y: 1}),
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
        ]).invertY().rotateRight().setPermanentOffset({x: 0, y: 1}),
        R: new Sprite([
            [w, n],
            [w, n],
            [w, n],
            [w, n],
            [w, w]
        ]).invertY().rotateRight(),


        S: new Sprite([
            [n, w],
            [n, n],
            [w, w],
            [n, w],
            [n, w],
            [n, w],
            [n, w]
        ]).invertY().rotateRight(),
        T: new Sprite([
            [n, w, w],
            [n, n, w],
            [w, n, w],
            [n, n, w],
            [n, w, w]
        ]).invertY().rotateRight().setPermanentOffset({x: 0, y: 1}),
        U: new Sprite([
            [n, w],
            [n, n],
            [n, w],
            [n, w],
            [n, w],
            [n, w],
            [w, w]
        ]).invertY().rotateRight().setPermanentOffset({x: 0, y: -2}),

        V: new Sprite([
            [n, w, n],
            [n, n, n],
            [w, w, w],
            [w, n, w],
            [n, n, w],
            [n, n, w],
            [n, n, w]
        ]).invertY().rotateRight(),
        W: new Sprite([
            [n, w, n],
            [n, n, n],
            [w, w, w],
            [w, n, w],
            [w, w, w],
            [n, n, w],
            [n, n, w]
        ]).invertY().rotateRight(),
        X: new Sprite([
            [n, n, w],
            [n, n, n],
            [n, n, w],
            [n, n, w],
            [n, n, w],
            [w, n, w],
            [w, w, w]
        ]).invertY().rotateRight().setPermanentOffset({x: 0, y: -2}),

        Y: new Sprite([
            [w, n],
            [n, n],
            [w, w],
            [w, n],
            [w, n],
            [w, n],
            [w, n]
        ]).invertY().rotateRight(),
        Z: new Sprite([
            [w, w, n],
            [w, n, n],
            [w, n, w],
            [w, n, n],
            [w, w, n]
        ]).invertY().rotateRight().setPermanentOffset({x: 0, y: 1}),
        ' ': new Sprite([
            [n, n],
            [n, n],
            [n, n]
        ]),
        '.': new Sprite([
            [n, n],
            [n, n],
            [w, n]
        ]).invertY().rotateRight().setPermanentOffset(lowerCaseOffset),
        ',': new Sprite([
            [n, n],
            [n, n],
            [w, n],
            [w, n]
        ]).invertY().rotateRight().setPermanentOffset(lowerCaseOffset),
        "'": new Sprite([
            [w],
            [w]
        ]).invertY().rotateRight().setPermanentOffset({x: 0, y: 1}),
        '-': new Sprite([
            [n, n],
            [w, w],
            [n, n]
        ]).invertY().rotateRight().setPermanentOffset(lowerCaseOffset)
    };

    var toLower = function (index) { return 'abcdefghijklmnopqrstuvwxyz'[ index ]; };
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach(function (capital, index) {
        font[ toLower(index) ] = font[ capital ];
    });

    return font;
});

SM.DefineModule('pxlr/fonts/phoenix', function (require) {
    var Sprite = require('models/sprite');

    var w = "white";
    var n = null;

    return {
        meta: {
            width: 15,
            height: 15,
            lineHeight: 16,
            letterSpacing: -1
        },
        P: new Sprite([
            [ n, n, n, w, w, w, w, w, w, w, w, w, n, n ],
            [ n, n, n, n, n, w, w, w, n, n, w, w, w, n ],
            [ n, n, n, n, n, w, w, n, n, n, n, w, w, w ],
            [ n, n, n, n, w, w, n, n, n, n, n, n, w, w ],
            [ n, n, n, n, w, w, n, n, n, n, n, n, w, w ],
            [ n, n, n, n, w, w, n, n, n, n, n, n, w, w ],
            [ n, n, n, n, w, w, w, n, n, n, n, w, w, w ],
            [ n, n, n, w, w, w, w, w, n, n, w, w, w, n ],
            [ n, n, n, w, w, n, w, w, w, w, w, w, n, n ],
            [ n, n, n, w, w, n, n, n, n, n, n, n, n, n ],
            [ n, n, n, w, w, n, n, n, n, n, n, n, n, n ],
            [ n, n, w, w, n, n, n, n, n, n, n, n, n, n ],
            [ n, n, w, w, n, n, n, n, n, n, n, n, n, n ],
            [ n, n, w, w, n, n, n, n, n, n, n, n, n, n ],
            [ w, w, w, w, w, w, n, n, n, n, n, n, n, n ]
        ]).invertY().rotateRight(),
        H: new Sprite([
            [ n, n, n, w, w, w, w, w, w, n, n, w, w, w, w, w, w ],
            [ n, n, n, n, n, w, w, n, n, n, n, n, n, w, w, n, n ],
            [ n, n, n, n, n, w, w, n, n, n, n, n, n, w, w, n, n ],
            [ n, n, n, n, w, w, n, n, n, n, n, n, w, w, n, n, n ],
            [ n, n, n, n, w, w, n, n, n, n, n, n, w, w, n, n, n ],
            [ n, n, n, n, w, w, n, n, n, n, n, n, w, w, n, n, n ],
            [ n, n, n, n, w, w, n, n, n, n, n, n, w, w, n, n, n ],
            [ n, n, n, w, w, w, w, w, w, w, w, w, w, n, n, n, n ],
            [ n, n, n, w, w, n, n, n, n, n, n, w, w, n, n, n, n ],
            [ n, n, n, w, w, n, n, n, n, n, n, w, w, n, n, n, n ],
            [ n, n, n, w, w, n, n, n, n, n, n, w, w, n, n, n, n ],
            [ n, n, w, w, n, n, n, n, n, n, w, w, n, n, n, n, n ],
            [ n, n, w, w, n, n, n, n, n, n, w, w, n, n, n, n, n ],
            [ n, n, w, w, n, n, n, n, n, n, w, w, n, n, n, n, n ],
            [ w, w, w, w, w, w, n, n, w, w, w, w, w, w, n, n, n ]
        ]).invertY().rotateRight(),
        O: new Sprite([
            [ n, n, n, n, n, w, w, w, w, w, n, n ],
            [ n, n, n, n, w, w, w, n, w, w, w, n ],
            [ n, n, n, w, w, w, n, n, n, w, w, n ],
            [ n, n, n, w, w, n, n, n, n, w, w, w ],
            [ n, n, w, w, n, n, n, n, n, n, w, w ],
            [ n, n, w, w, n, n, n, n, n, n, w, w ],
            [ n, w, w, n, n, n, n, n, n, n, w, w ],
            [ n, w, w, n, n, n, n, n, n, n, w, w ],
            [ n, w, w, n, n, n, n, n, n, w, w, n ],
            [ w, w, n, n, n, n, n, n, n, w, w, n ],
            [ w, w, n, n, n, n, n, n, n, w, w, n ],
            [ w, w, n, n, n, n, n, n, w, w, n, n ],
            [ n, w, w, n, n, n, n, w, w, n, n, n ],
            [ n, n, w, w, n, n, w, w, n, n, n, n ],
            [ n, n, n, w, w, w, w, n, n, n, n, n ]
        ]).invertY().rotateRight(),
        E: new Sprite([
            [ n, n, n, w, w, w, w, w, w, w, w, w, w, w ],
            [ n, n, n, n, n, w, w, n, n, n, n, n, n, w ],
            [ n, n, n, n, n, w, w, n, n, n, n, n, n, n ],
            [ n, n, n, n, w, w, n, n, n, n, n, n, n, n ],
            [ n, n, n, n, w, w, n, n, n, n, n, n, n, n ],
            [ n, n, n, n, w, w, n, n, n, n, n, n, n, n ],
            [ n, n, n, n, w, w, n, n, n, n, w, n, n, n ],
            [ n, n, n, w, w, w, w, w, w, w, w, n, n, n ],
            [ n, n, n, w, w, n, n, n, n, n, w, n, n, n ],
            [ n, n, n, w, w, n, n, n, n, n, n, n, n, n ],
            [ n, n, n, w, w, n, n, n, n, n, n, n, n, n ],
            [ n, n, w, w, n, n, n, n, n, n, n, n, n, n ],
            [ n, n, w, w, n, n, n, n, n, n, n, n, n, n ],
            [ n, n, w, w, n, n, n, n, n, n, n, w, n, n ],
            [ w, w, w, w, w, w, w, w, w, w, w, w, n, n ]
        ]).invertY().rotateRight(),
        N: new Sprite([
            [ n, n, n, w, w, w, w, n, n, n, n, w, w, w, w, w, w ],
            [ n, n, n, n, n, w, w, n, n, n, n, n, n, w, w, n, n ],
            [ n, n, n, n, n, w, w, w, n, n, n, n, n, w, w, n, n ],
            [ n, n, n, n, w, w, w, w, n, n, n, n, w, w, n, n, n ],
            [ n, n, n, n, w, w, n, w, w, n, n, n, w, w, n, n, n ],
            [ n, n, n, n, w, w, n, w, w, n, n, n, w, w, n, n, n ],
            [ n, n, n, n, w, w, n, w, w, n, n, n, w, w, n, n, n ],
            [ n, n, n, w, w, n, n, n, w, w, n, w, w, n, n, n, n ],
            [ n, n, n, w, w, n, n, n, w, w, n, w, w, n, n, n, n ],
            [ n, n, n, w, w, n, n, n, w, w, n, w, w, n, n, n, n ],
            [ n, n, n, w, w, n, n, n, n, w, w, w, w, n, n, n, n ],
            [ n, n, w, w, n, n, n, n, n, w, w, w, n, n, n, n, n ],
            [ n, n, w, w, n, n, n, n, n, n, w, w, n, n, n, n, n ],
            [ n, n, w, w, n, n, n, n, n, n, w, w, n, n, n, n, n ],
            [ w, w, w, w, w, w, n, n, n, n, w, w, w, w, n, n, n ]
        ]).invertY().rotateRight(),
        I: new Sprite([
            [ n, n, n, w, w, w, w, w, w ],
            [ n, n, n, n, n, w, w, n, n ],
            [ n, n, n, n, n, w, w, n, n ],
            [ n, n, n, n, w, w, n, n, n ],
            [ n, n, n, n, w, w, n, n, n ],
            [ n, n, n, n, w, w, n, n, n ],
            [ n, n, n, n, w, w, n, n, n ],
            [ n, n, n, w, w, n, n, n, n ],
            [ n, n, n, w, w, n, n, n, n ],
            [ n, n, n, w, w, n, n, n, n ],
            [ n, n, n, w, w, n, n, n, n ],
            [ n, n, w, w, n, n, n, n, n ],
            [ n, n, w, w, n, n, n, n, n ],
            [ n, n, w, w, n, n, n, n, n ],
            [ w, w, w, w, w, w, n, n, n ]
        ]).invertY().rotateRight(),
        X: new Sprite([
            [ n, n, n, w, w, w, w, w, w, n, n, w, w, w, w, w, w ],
            [ n, n, n, n, n, w, w, n, n, n, n, n, n, w, w, n, n ],
            [ n, n, n, n, n, w, w, n, n, n, n, n, w, w, n, n, n ],
            [ n, n, n, n, n, n, w, w, n, n, n, w, w, n, n, n, n ],
            [ n, n, n, n, n, n, w, w, n, n, w, w, n, n, n, n, n ],
            [ n, n, n, n, n, n, n, w, w, w, w, n, n, n, n, n, n ],
            [ n, n, n, n, n, n, n, w, w, w, n, n, n, n, n, n, n ],
            [ n, n, n, n, n, n, n, w, w, w, n, n, n, n, n, n, n ],
            [ n, n, n, n, n, n, n, w, w, w, n, n, n, n, n, n, n ],
            [ n, n, n, n, n, n, w, w, w, w, n, n, n, n, n, n, n ],
            [ n, n, n, n, n, w, w, n, n, w, w, n, n, n, n, n, n ],
            [ n, n, n, n, w, w, n, n, n, w, w, n, n, n, n, n, n ],
            [ n, n, n, w, w, n, n, n, n, n, w, w, n, n, n, n, n ],
            [ n, n, w, w, n, n, n, n, n, n, w, w, n, n, n, n, n ],
            [ w, w, w, w, w, w, n, n, w, w, w, w, w, w, n, n, n ]
        ]).invertY().rotateRight()
    };
});
/* end:pxlr-fonts */
}());

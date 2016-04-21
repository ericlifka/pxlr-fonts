DefineModule('main', function (require) {
    var CanvasRenderer = require('pxlr/gl/canvas');

    var fonts = {
        'arcade': {
            sprites: require('pxlr/fonts/arcade'),
            lines: [
                '-- Pixel Arcade Font --',
                'abcdefghijklmnopqrstuvwxyz',
                'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
                '1234567890<>?.,!-+',
                'Sample Sentence!',
                'YEAH FONTS!!!?'
            ]
        },
        'arcade-small': {
            sprites: require('pxlr/fonts/arcade-small'),
            lines: [
                '-- Arcade Small Font --',
                'abcdefghijklmnopqrstuvwxyz',
                'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
                '1234567890<>?.,!-+',
                'Minimal fonts are fun!',
                'Yay, blocky little letters.'
            ]
        },
        'phoenix': {
            sprites: require('pxlr/fonts/phoenix'),
            lines: [
                'PHOENIX'
            ]
        },
        'elian': {
            sprites: require('pxlr/fonts/elian'),
            lines: [
                '-- Elian Script --',
                'abcdefghijklmnopqrstuvwxyz',
                'Its fun to confuse your friends with elian.',
                'They wont know what you said.',
                'But they might call you weird.'
            ]
        }
    };

    function changeFont(fontName) {
        var font = fonts[ fontName ];

        return function () {
            renderFont(font);
        };
    }

    document.getElementById('arcade').addEventListener('click', changeFont('arcade'));
    document.getElementById('arcade-small').addEventListener('click', changeFont('arcade-small'));
    document.getElementById('phoenix').addEventListener('click', changeFont('phoenix'));
    document.getElementById('elian').addEventListener('click', changeFont('elian'));

    var renderer = new CanvasRenderer({ width: 200, height: 150 });
    renderer.setFillColor("#FFFFFF");

    function renderFont(font) {
        var frame = renderer.newRenderFrame();
        frame.clear();

        var offset = 0;
        //"-- Arcade Small --".split('').forEach(function (letter) {
        //    var letterSprite = font[ letter ];
        //
        //    letterSprite.applyColor("#000000");
        //    letterSprite.renderToFrame(frame, offset, 0);
        //    offset += letterSprite.width + 1;
        //});
        offset = 0;
        "abcdefghijklmnopqrstuvwxyz".split('').forEach(function (letter) {
            var letterSprite = font[ letter ];

            letterSprite.applyColor("#000000");
            letterSprite.renderToFrame(frame, offset, 10);
            offset += letterSprite.width + 1;
        });
        offset = 0;
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('').forEach(function (letter) {
            var letterSprite = font[ letter ];

            letterSprite.applyColor("#000000");
            letterSprite.renderToFrame(frame, offset, 20);
            offset += letterSprite.width + 1;
        });
        offset = 0;
        //"0123456789.,!?<>-:$+%".split('').forEach(function (letter) {
        //    var letterSprite = font[ letter ];
        //
        //    letterSprite.applyColor("#000000");
        //    letterSprite.renderToFrame(frame, offset, 30);
        //    offset += letterSprite.width + 1;
        //});
        offset = 0;
        "This is a sample sentence. So is this.".split('').forEach(function (letter) {
            var letterSprite = font[ letter ];

            letterSprite.applyColor("#000000");
            letterSprite.renderToFrame(frame, offset, 40);
            offset += letterSprite.width + 1;
        });

        renderer.renderFrame();
    }

    changeFont('arcade-small')();
});

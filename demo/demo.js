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

        var lineHeight = font.sprites.meta.lineHeight;
        var lineOffset = 5;
        var horizontalOffset = 5;
        font.lines.forEach(function (line) {
            line.split('').forEach(function (letter) {
                var letterSprite = font.sprites[ letter ];
                if (letterSprite) {
                    letterSprite.applyColor("#000");
                    letterSprite.renderToFrame(frame, horizontalOffset, lineOffset);
                    horizontalOffset += letterSprite.width + 1;
                }
            });
            horizontalOffset = 5;
            lineOffset += lineHeight;
        });

        renderer.renderFrame();
    }

    changeFont('arcade-small')();
});

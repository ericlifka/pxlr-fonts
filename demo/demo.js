DefineModule('main', function (require) {
    var CanvasRenderer = require('pxlr/gl/canvas');
    //var font = require('pxlr/fonts/arcade-small');
    var font = require('pxlr/fonts/elian');

    function changeFont(font) {
        return function () {
            console.log(font);
        };
    }

    document.getElementById('arcade').addEventListener('click', changeFont('arcade'));
    document.getElementById('arcade-small').addEventListener('click', changeFont('arcade-small'));
    document.getElementById('phoenix').addEventListener('click', changeFont('phoenix'));
    document.getElementById('elian').addEventListener('click', changeFont('elian'));

    var renderer = new CanvasRenderer({ width: 200, height: 150 });
    renderer.setFillColor("#FFFFFF");

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
});

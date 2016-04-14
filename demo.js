DefineModule('main', function (require) {
    var CanvasRenderer = require('pxlr/gl/canvas');
    var ArcadeSmall = require('pxlr/fonts/arcade-small');

    var renderer = new CanvasRenderer({ width: 200, height: 150 });
    renderer.setFillColor("#FFFFFF");

    var frame = renderer.newRenderFrame();
    frame.clear();

    var offset = 0;
    "-- Arcade Small --".split('').forEach(function (letter) {
        var letterSprite = ArcadeSmall[ letter ];

        letterSprite.applyColor("#000000");
        letterSprite.renderToFrame(frame, offset, 0);
        offset += letterSprite.width + 1;
    });
    offset = 0;
    "abcdefghijklmnopqrstuvwxyz".split('').forEach(function (letter) {
        var letterSprite = ArcadeSmall[ letter ];

        letterSprite.applyColor("#000000");
        letterSprite.renderToFrame(frame, offset, 10);
        offset += letterSprite.width + 1;
    });
    offset = 0;
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('').forEach(function (letter) {
        var letterSprite = ArcadeSmall[ letter ];

        letterSprite.applyColor("#000000");
        letterSprite.renderToFrame(frame, offset, 20);
        offset += letterSprite.width + 1;
    });
    offset = 0;
    "0123456789.,!?<>-:$+%".split('').forEach(function (letter) {
        var letterSprite = ArcadeSmall[ letter ];

        letterSprite.applyColor("#000000");
        letterSprite.renderToFrame(frame, offset, 30);
        offset += letterSprite.width + 1;
    });
    offset = 0;
    "This is a sample sentence. So is this!".split('').forEach(function (letter) {
        var letterSprite = ArcadeSmall[ letter ];

        letterSprite.applyColor("#000000");
        letterSprite.renderToFrame(frame, offset, 40);
        offset += letterSprite.width + 1;
    });

    renderer.renderFrame();
});

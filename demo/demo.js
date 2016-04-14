DefineModule('main', function (require) {
    var CanvasRenderer = require('pxlr/gl/canvas');
    var ArcadeSmall = require('pxlr/fonts/arcade-small');

    var renderer = new CanvasRenderer({ width: 200, height: 150 });
    renderer.setFillColor("#FFFFFF");

    var frame = renderer.newRenderFrame();
    frame.clear();

    ArcadeSmall.A.applyColor("#000000");
    ArcadeSmall.A.renderToFrame(frame, 0, 0);

    renderer.renderFrame();
});

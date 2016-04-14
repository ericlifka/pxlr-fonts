DefineModule('main', function (require) {
    var CanvasRenderer = require('pxlr/gl/canvas');

    var renderer = new CanvasRenderer({ width: 200, height: 150 });
    renderer.setFillColor("#FFFFFF");

    var frame = renderer.newRenderFrame();
    frame.clear();

    renderer.renderFrame();
});

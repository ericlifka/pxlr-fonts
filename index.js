DefineModule('pxlr/fonts', function (require) {
    var arcade = require('pxlr/fonts/arcade');
    var arcadeSmall = require('pxlr/fonts/arcade-small');
    var phoenix = require('pxlr/fonts/phoenix');

    return {
        arcade: arcade,
        arcadeSmall: arcadeSmall,
        phoenix: phoenix
    };
});

/* provide namespace backwards compatibility for v1 */
DefineModule('fonts/arcade', function (require) {
    return require('pxlr/fonts/arcade');
});
DefineModule('fonts/arcade-small', function (require) {
    return require('pxlr/fonts/arcade-small');
});
DefineModule('fonts/phoenix', function (require) {
    return require('pxlr/fonts/phoenix');
});

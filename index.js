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

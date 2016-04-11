System.register(['./sidebar'], function(exports_1) {
    function exportStar_1(m) {
        var exports = {};
        for(var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_1(exports);
    }
    return {
        setters:[
            function (sidebar_1_1) {
                exportStar_1(sidebar_1_1);
            }],
        execute: function() {
        }
    }
});
//# sourceMappingURL=index.js.map
System.register(['angular2/core'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1;
    var Sidebar;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            Sidebar = (function () {
                function Sidebar() {
                    this.name = 'raphael Santos';
                }
                Sidebar = __decorate([
                    core_1.Component({
                        selector: 'sidebar',
                        styles: [require('./sidebar.css')],
                        template: "\n      <nav>\n        <div class=\"logo\">Logo</div>\n        <ul>\n          <li router-active>\n            <a [routerLink]=\" ['Video'] \">Video</a>\n          </li>\n           <li router-active>\n            <a [routerLink]=\" ['Repository'] \">Repository</a>\n          </li>\n          <li router-active>\n            <a [routerLink]=\" ['About'] \">About</a>\n          </li>\n        </ul>\n      </nav>\n"
                    }), 
                    __metadata('design:paramtypes', [])
                ], Sidebar);
                return Sidebar;
            })();
            exports_1("Sidebar", Sidebar);
        }
    }
});
//# sourceMappingURL=sidebar.js.map
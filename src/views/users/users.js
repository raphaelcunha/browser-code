System.register(['angular2/core', 'angular2/http'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1;
    var Video;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            }],
        execute: function() {
            Video = (function () {
                function Video(http) {
                    this.http = http;
                    this.keys = require('assets/keys.json');
                    this.videos = null;
                }
                Video.prototype.ngOnInit = function () {
                    var _this = this;
                    var url = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=angularjs&maxResults=12&key=" + this.keys.youtube;
                    this.http.get(url)
                        .map(function (res) { return res.json(); })
                        .subscribe(function (videos) { return _this.videos = videos.items; }, function (error) { return console.error('Error'); }, function () { return console.log('completado'); });
                };
                Video.prototype.selectVideo = function (id) {
                    var _this = this;
                    console.log(id);
                    var url = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=12&channelId=" + id + "&key=" + this.keys.youtube;
                    this.http.get(url)
                        .map(function (res) { return res.json(); })
                        .subscribe(function (videos) {
                        _this.videos = videos.items;
                        console.log(videos.items);
                    }, function (error) { return console.error('Error:'); }, function () { return console.log('completado'); });
                };
                Video = __decorate([
                    core_1.Component({
                        selector: 'videos',
                        styles: [require('./video.css')],
                        template: require('./video.html')
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof http_1.Http !== 'undefined' && http_1.Http) === 'function' && _a) || Object])
                ], Video);
                return Video;
                var _a;
            })();
            exports_1("Video", Video);
        }
    }
});
//# sourceMappingURL=video.js.map
import {Component} from 'angular2/core';
import {Http} from 'angular2/http';
import { Router, RouterLink, RouteParams} from 'angular2/router';
import { AuthService } from 'src/core/auth';
import { AppHeader } from 'src/views/app/app-header';


@Component({
    selector: 'videosItem',
    styles: [
        require('./videosItem.scss')
    ],
    directives: [AppHeader, RouterLink],
    template: require('./videosItem.html')
})
export class VideosItem {

    key:string = 'AIzaSyA_AliVKxvNDgi13nClTygYedgab8phBLA';
    videos:string = null;
    channel:any = null;
    videoSelected:any = null;
    id:string = null;
    id_video:string = null;
    subHeader = true;
    height = window.innerHeight - 300;

    constructor(public _http:Http, private auth:AuthService, private _params:RouteParams, private _router:Router) {
        this.id = _params.get('id');
        this.id_video = _params.get('id_video');


    }


    ngOnInit() {

        var url = `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${this.id}&key=${this.key}`;
        this._http.get(url)
            .map(res => res.json())
            .subscribe(
                channel => {
                    console.log(channel.items[0].snippet);
                    this.channel = channel.items[0].snippet;
                },
                error => console.error('Error:'),
                () => console.log('completado')
            );

        var url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&order=date&channelId=${this.id}&key=${this.key}`;
        this._http.get(url)
            .map(res => res.json())
            .subscribe(
                videos => {
                    this.videoSelected = videos.items[0];
                    this.videos = videos.items;
                },
                error => console.error('Error:'),
                () => console.log('completado')
            );
    }

    selectVideo(video) {
        this.videoSelected = video;
        this._router.navigate(['/VideosItem', {id: this.id, id_video: this.videoSelected.id.videoId}]);
    }


}

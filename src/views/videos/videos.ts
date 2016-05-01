import {Component} from 'angular2/core';
import {Http} from 'angular2/http';
import { Router, RouterLink, RouteParams} from 'angular2/router';
import { AuthService } from 'src/core/auth';
import { AppHeader } from 'src/views/app/app-header';


@Component({
    selector: 'videos',
    styles: [
        require('./videos.scss')
    ],
    directives: [AppHeader, RouterLink],
    template: require('./videos.html')
})
export class Videos {

    key: string = 'AIzaSyA_AliVKxvNDgi13nClTygYedgab8phBLA';
    videos: string = null;
    language =  null;

    constructor(public http: Http, private auth: AuthService, private _router:Router) {
        this.language = JSON.parse(window.localStorage.getItem('language'));
    }


    ngOnInit(){
        let url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${this.language.github}&maxResults=12&key=${this.key}`;
        this.http.get(url)
            .map(res => res.json())
            .subscribe(
                videos => this.videos = videos.items,
                error => console.error('Error'),
                () => console.log('completado')
            );
    }


    public selectVideo(id) {
        this._router.navigate(['/VideosItem', {id: id, id_video: null}]);
    }


}

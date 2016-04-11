import {Component} from 'angular2/core';
import {Http} from 'angular2/http';


@Component({
    selector: 'videos',
    styles: [
        require('./videos.scss')
    ],
    template: require('./videos.html')
})
export class Videos {

    public key: string = 'AIzaSyA_AliVKxvNDgi13nClTygYedgab8phBLA';
    public videos: string = null;

    constructor(public http: Http) {

    }


    ngOnInit(){
        let url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=angularjs&maxResults=12&key=${this.key}`;
        this.http.get(url)
            .map(res => res.json())
            .subscribe(
                videos => this.videos = videos.items,
                error => console.error('Error'),
                () => console.log('completado')
            );
    }


    public selectVideo(id) {
        console.log(id);
        var url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=12&channelId=${id}&key=${this.key}`;
        this.http.get(url)
            .map(res => res.json())
            .subscribe(
                videos => {
                    this.videos = videos.items;
                    console.log(videos.items);
                },
                error => console.error('Error:'),
                () => console.log('completado')
            );
    }


}

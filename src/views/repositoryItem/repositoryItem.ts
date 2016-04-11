import {Component} from 'angular2/core';
import {Http, Headers} from 'angular2/http';
import { RouteParams } from 'angular2/router';

@Component({
    selector: 'repositoryItem',
    styles: [
        require('./repositoryItem.scss'),
    ],
    template: require('./repositoryItem.html')
})
export class RepositoryItem {

    public ls:any = JSON.parse(localStorage.getItem('firebase:session::browsercode'));
    public accessToken:string = this.ls.github.accessToken;
    public item:Array <any>;
    public readme: string = null;
    public id:string;

    constructor(public http:Http, params:RouteParams) {
        this.id = params.get('id');
    }


    ngOnInit() {
        let headers = new Headers();
        headers.append('Authorization', `token ${this.accessToken}`);
        let url = `https://api.github.com/repos/${this.id}`;
        this.http.get(url, {headers: headers})
            .map(res => res.json())
            .subscribe(
                data => {
                    this.item = data.items;
                    this.getReadme();
                },
                error => console.error('Error'),
                () => console.log('Complete Search')
            );
    }

    getReadme(){
        let headers = new Headers();
        let url = `https://api.github.com/repos/${this.id}/readme`;
        this.http.get(url, {headers: headers})
            .map(res => res.json())
            .subscribe(
                data => {
                    this.getFileReadme(data.download_url);
                },
                error => console.error('Error'),
                () => console.log('Complete Search')
            );
    }


    getFileReadme(url){
        let headers = new Headers();
        this.http.get(url, {headers: headers})
            .subscribe(
                data => {
                    let showdown  = require('showdown');
                    let converter = new showdown.Converter();
                    this.readme   = converter.makeHtml(data._body);
                },
                error => console.error('Error'),
                () => console.log('Complete Search')
            );
    }

}

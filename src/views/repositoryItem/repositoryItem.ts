import {Component, Pipe} from 'angular2/core';
import {Http, Headers} from 'angular2/http';
import { RouteParams, RouterLink } from 'angular2/router';



@Pipe({
    name: 'mapToIterable'
})
export class MapToIterable {
    transform(dict) {
        let a = [];
        for (let key in dict) {
            if (dict.hasOwnProperty(key)) {
                a.push({key: key, val: dict[key]});
            }
        }
        return a;
    }
}


@Component({
    selector: 'repositoryItem',
    styles: [
        require('./repositoryItem.scss'),
    ],
    directives: [RouterLink],
    pipes: [MapToIterable],
    template: require('./repositoryItem.html')
})



export class RepositoryItem {

    public ls:any = JSON.parse(localStorage.getItem('firebase:session::browsercode'));
    public accessToken:string = this.ls.github.accessToken;
    public repository:any = null;
    public readme:string = null;
    public id:string = null;
    public package:string = null;


    constructor(public http:Http, params:RouteParams) {
        this.id = params.get('id');
    }


    ngOnInit() {
        this.getRepository();
        this.getReadme();
        this.getContent();
    }


    getContent() {
        let url = `https://api.github.com/repos/${this.id}/contents/package.json`;
        let headers = new Headers();
        headers.append('Authorization', `token ${this.accessToken}`);
        this.http.get(url, {headers: headers})
            .map(res => res.json())
            .subscribe(
                data => {
                    this.package = JSON.parse(Base64.decode(data.content));
                },
                error => console.error('Error'),
                () => console.log('Complete Search')
            );
    }

    getRepository() {
        let url = `https://api.github.com/repos/${this.id}`;
        let headers = new Headers();
        headers.append('Authorization', `token ${this.accessToken}`);
        this.http.get(url, {headers: headers})
            .map(res => res.json())
            .subscribe(
                data => {
                    this.repository = data;
                },
                error => console.error('Error'),
                () => console.log('Complete Search')
            );
    }

    getReadme() {
        let headers = new Headers();
        let url = `https://api.github.com/repos/${this.id}/readme`;
        this.http.get(url, {headers: headers})
            .map(res => res.json())
            .subscribe(
                data => {
                    let readme = Base64.decode(data.content);
                    let showdown = require('showdown');
                    let converter = new showdown.Converter();
                    this.readme = converter.makeHtml(readme);
                },
                error => console.error('Error'),
                () => console.log('Complete Search')
            );
    }





}

import {Component} from 'angular2/core';
import {Http, Headers} from 'angular2/http';
import { RouterLink, RouteParams} from 'angular2/router';
import { AuthService } from 'src/core/auth';
import { AppHeader } from 'src/views/app/app-header';

@Component({
    selector: 'repository',

    styles: [
        require('./repository.scss')
    ],
    directives: [AppHeader, RouterLink],
    template: require('./repository.html')
})

export class Repository {

    public ls: any = JSON.parse(localStorage.getItem('firebase:session::browsercode'));
    public accessToken: string = this.ls.github.accessToken;
    public items: Array <any>;
    public lang: any =  null;


    constructor(public http: Http, private auth: AuthService , private params: RouteParams) {
        this.lang = JSON.parse(window.localStorage.getItem('language'));

        console.log(this.lang);

        if (this.lang) {
            this.searchGithub(this.lang.github);
        }else{
            this.lang = 'javascript';
            this.searchGithub(this.lang);
        }

    }

    searchGithub(query){
        let url = `https://api.github.com/search/repositories?q=${query}&sort=stars&order=desc&per_page=100`;

        let headers = new Headers();
        headers.append('Authorization', `token ${this.accessToken}`);
        this.http.get(url, {headers: headers})
            .map(res => res.json())
            .subscribe(
                data => {
                    this.items = data.items;
                },
                error => console.error('Error'),
                () => console.log('Complete Search')
            );
    }

}

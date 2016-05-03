import {Component} from 'angular2/core';
import {Http, Headers} from 'angular2/http';
import { RouterLink, RouteParams} from 'angular2/router';
import { AuthService } from 'src/core/auth';
import { AppHeader } from 'src/views/app/app-header';

@Component({
    selector: 'users',
    styles: [
        require('./users.scss')
    ],
    directives: [AppHeader, RouterLink],
    template: require('./users.html')
})

export class Users {

    public ls:any = JSON.parse(localStorage.getItem('firebase:session::browsercode'));
    public accessToken:string = this.ls.github.accessToken;
    public items:string[] = [];
    public q:string = '';
    public lang:string = '';
    public subHeader = true;



    constructor(public http: Http, private auth: AuthService , private params: RouteParams) {
        this.q = params.get('q');
        this.lang = params.get('lang');

        if (this.q != null && this.lang == null) {

            this.searchGithub(this.q + '+', null);

        } else if (this.q == null && this.lang == null){

            this.searchGithub(null, null);

        } else if (this.q == null && this.lang != null){

            this.searchGithub(null, this.lang);

        }else{

            this.searchGithub(this.q, this.lang);

        }
    }

    searchGithub(query, language) {


        let url;
        if (query != null && language == null ) {
            url = `https://api.github.com/search/users?q=${query}followers:>100+sort:followers&order=desc&per_page=100`;
        } else if (query == null && language != null) {
            url = `https://api.github.com/search/users?q=followers:>100+sort:followers+language:${language}&order=desc&per_page=100`;
        } else if (query == null && language == null) {
            url = `https://api.github.com/search/users?q=followers:>100+sort:followers&order=desc&per_page=100`;
        }else{
            url = `https://api.github.com/search/users?q=${query}followers:>100+sort:followers+language:${language}&order=desc&per_page=100`;
        }


        let headers = new Headers();
        headers.append('Authorization', `token ${this.accessToken}`);
        this.http.get(url, {headers: headers})
            .map(res => res.json())
            .subscribe(
                data => {
                    this.getDetails(data.items);
                },
                error => console.error('Error'),
                () => console.log('Complete Search')
            );
    }


    getDetails(users) {


        for (var user of users) {

            let url = `https://api.github.com/users/${user.login}`;
            let headers = new Headers();
            headers.append('Authorization', `token ${this.accessToken}`);
            this.http.get(url, {headers: headers})
                .map(res => res.json())
                .subscribe(
                    data => {
                        this.items.push(data);
                    },
                    error => console.error('Error'),
                    () => console.log('Complete Search')
                );

        }


    }

}

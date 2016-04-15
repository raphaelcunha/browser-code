import {Component} from 'angular2/core';
import {Http, Headers} from 'angular2/http';
import { RouterLink, RouteParams} from 'angular2/router';

@Component({
    selector: 'users',
    styles: [
        require('./users.scss')
    ],
    directives: [RouterLink],
    template: require('./users.html')
})

export class Users {

    public ls:any = JSON.parse(localStorage.getItem('firebase:session::browsercode'));
    public accessToken:string = this.ls.github.accessToken;
    public items:string[] = [];
    public q:string = '';
    public language:string = null;


    constructor(public http:Http, params:RouteParams) {
        this.q = params.get('q');
        if (this.q != null) {
            this.searchGithub(this.q + '+', this.language);
        } else {
            this.language = 'javascript';
            this.searchGithub(null, this.language);

        }
    }

    searchGithub(query, language) {


        let url;
        if (query != null && language == null ) {
            url = `https://api.github.com/search/users?q=${query}followers:>10+sort:followers&order=desc&per_page=100`;
        } else if (query == null && language != null) {
            url = `https://api.github.com/search/users?q=followers:>10+sort:followers+language:${language}&order=desc&per_page=100`;
        } else if (query == null && language == null) {
            url = `https://api.github.com/search/users?q=followers:>10+sort:followers&order=desc&per_page=100`;
        }else{
            url = `https://api.github.com/search/users?q=${query}followers:>10+sort:followers+language:${language}&order=desc&per_page=100`;
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

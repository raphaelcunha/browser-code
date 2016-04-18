import {Component} from 'angular2/core';
import {Http, Headers} from 'angular2/http';
import { RouterLink, RouteParams} from 'angular2/router';

@Component({
    selector: 'userProfile',
    styles: [
        require('./userProfile.scss')
    ],
    directives: [RouterLink],
    template: require('./userProfile.html')
})

export class UserProfile {

    public ls:any = JSON.parse(localStorage.getItem('firebase:session::browsercode'));
    public accessToken:string = this.ls.github.accessToken;
    public item:string = '';
    public user:string = '';
    public repos:string = '';
    public profile:string = '';
    public events:string = '';

    constructor(public http:Http, params:RouteParams) {
        this.user = params.get('user');
        if (this.user != null) {
            this.getProfile(this.user);
            this.getRepositorys(this.user);
            this.getEvents(this.user);
        }

    }

    getProfile(user) {
        let url = `https://api.github.com/users/${user}`;
        let headers = new Headers();
        headers.append('Authorization', `token ${this.accessToken}`);
        this.http.get(url, {headers: headers})
            .map(res => res.json())
            .subscribe(
                data => {
                    console.log(data);
                    this.profile = data;
                },
                error => console.error('Error'),
                () => console.log('Complete Search')
            );
    }


    getRepositorys(user) {
        let url = `https://api.github.com/users/${user}/repos?sort=created&order=asc`;
        let headers = new Headers();
        headers.append('Authorization', `token ${this.accessToken}`);
        this.http.get(url, {headers: headers})
            .map(res => res.json())
            .subscribe(
                data => {
                    console.log(data);
                    this.repos = data;
                },
                error => console.error('Error'),
                () => console.log('Complete Search')
            );
    }


    getEvents(user) {
        let url = `https://api.github.com/users/${user}/events`;
        let headers = new Headers();
        headers.append('Authorization', `token ${this.accessToken}`);
        this.http.get(url, {headers: headers})
            .map(res => res.json())
            .subscribe(
                data => {
                    console.log(data);
                    this.events = data;
                },
                error => console.error('Error'),
                () => console.log('Complete Search')
            );
    }
}



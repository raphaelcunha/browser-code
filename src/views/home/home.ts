import {Component} from 'angular2/core';
import { Injectable, Inject } from 'angular2/core';
import { Router, RouterLink, RouteParams} from 'angular2/router';
import { AuthService } from 'src/core/auth';
import { AppHeader } from 'src/views/app/app-header';
import { AngularFire, FirebaseListObservable } from 'angularfire2';



@Component({
    selector: 'home',

    styles: [
        require('./home.scss')
    ],
    directives: [AppHeader, RouterLink],
    template: require('./home.html')
})

export class Home {

    ls: any = JSON.parse(localStorage.getItem('firebase:session::browsercode'));
    accessToken: string = this.ls.github.accessToken;
    items:FirebaseListObservable<any>;
    language = null;
    subHeader = false;

    constructor(private auth: AuthService, private _af: AngularFire,  private _router:Router) {
        this.items = this._af.list('/languages');
        this.language = window.localStorage.getItem('language');
    }

    setLanguage(item){
        this.language = item;
        window.localStorage.setItem('language', JSON.stringify(item));
        this._router.navigate(['/Videos']);
    }





}

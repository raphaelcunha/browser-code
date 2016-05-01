import {Component} from 'angular2/core';
import { Injectable, Inject } from 'angular2/core';
import { RouterLink, RouteParams} from 'angular2/router';
import { AuthService } from 'src/core/auth';
import { AppHeader } from 'src/views/app/app-header';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';



@Component({
    selector: 'info',

    styles: [
        require('./info.scss')
    ],
    directives: [AppHeader, RouterLink],
    template: require('./info.html')
})

export class Info {

    ls: any = JSON.parse(localStorage.getItem('firebase:session::browsercode'));
    language: any = JSON.parse(localStorage.getItem('firebase:session::browsercode'));
    accessToken: string = this.ls.github.accessToken;
    items:FirebaseObjectObservable<any>;


    constructor(private auth: AuthService, private _af: AngularFire, private _routeParams: RouteParams) {
        let id = this._routeParams.get('id');
        console.log(id);
       // this.items = JSON.stringify(this._af.object('/languages/'+id));
    }

}

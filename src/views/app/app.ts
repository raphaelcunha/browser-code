import { Component } from 'angular2/core';
import { RouteConfig, Router, RouterOutlet, RouteParams } from 'angular2/router';
import { AuthService } from 'src/core/auth';

import { Home } from 'src/views/home';
import { Info } from 'src/views/info';
import { SignIn } from 'src/views/sign-in';
import { Tasks } from 'src/views/tasks';
import { Videos } from 'src/views/videos';
import { VideosItem } from 'src/views/videosItem';
import { Repository } from 'src/views/repository';
import { RepositoryItem } from 'src/views/repositoryItem';
import { Users } from 'src/views/users';
import { UserProfile } from 'src/views/userProfile';
import { AppHeader } from './app-header';


@RouteConfig([
    {path: '/', component: SignIn, as: 'SignIn'},
    {path: '/home', component: Home, as: 'Home'},
    {path: '/info/:id', component: Info, as: 'Info'},
    {path: '/tasks', component: Tasks, as: 'Tasks'},
    {path: '/videos', component: Videos, as: 'Videos'},
    {path: '/video/:id/:id_video', component: VideosItem, as: 'VideosItem'},
    {path: '/repository', component: Repository, as: 'Repository'},
    {path: '/repository/:owner/:repo', component: RepositoryItem, name: 'RepositoryItem'},
    {path: '/users', component: Users, as: 'Users'},
    {path: '/user/:user', component: UserProfile, as: 'UserProfile'},

])

@Component({
    directives: [
        RouterOutlet
    ],
    selector: 'app',
    styles: [
        require('./app.scss')
    ],
    template: `
        <router-outlet></router-outlet>

  `
})

export class App {

    constructor(private auth:AuthService) {
    }

    signOut():void {
        this.auth.signOut();
        window.location.replace('/');
    }
}

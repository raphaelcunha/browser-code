import { Component } from 'angular2/core';
import { RouteConfig, Router, RouterOutlet } from 'angular2/router';
import { AuthService } from 'src/core/auth';
import { SignIn } from 'src/views/sign-in';
import { Tasks } from 'src/views/tasks';
import { Videos } from 'src/views/videos';
import { Repository } from 'src/views/repository';
import { RepositoryItem } from 'src/views/repositoryItem';
import { AppHeader } from './app-header';


@RouteConfig([
  {path: '/', component: SignIn, as: 'SignIn'},
  {path: '/tasks', component: Tasks, as: 'Tasks'},
  {path: '/videos', component: Videos, as: 'Videos'},
  {path: '/repository', component: Repository, as: 'Repository'},
  {path: '/repository/:id', component: RepositoryItem, name: 'RepositoryItem'},

])

@Component({
  directives: [
    AppHeader,
    RouterOutlet
  ],
  selector: 'app',
  styles: [
    require('./app.scss')
  ],
  template: `
    <app-header
      [authenticated]="auth.authenticated"
      (signOut)="signOut()"></app-header>
    
    <main class="main">
      <router-outlet></router-outlet>
    </main>
  `
})

export class App {
  constructor(private auth: AuthService, public router: Router) {}

  signOut(): void {
    this.auth.signOut();
    window.location.replace('/');
  }
}

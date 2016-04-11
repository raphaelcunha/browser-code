import {Component} from 'angular2/core';
import {RouteConfig, Router} from 'angular2/router';

@Component({
    selector: 'sidebar',
    styles: [ require('./sidebar.css') ],
    template: `
      <nav>
        <div class="logo">Logo</div>
        <ul>
          <li router-active>
            <a [routerLink]=" ['Video'] ">Video</a>
          </li>
           <li router-active>
            <a [routerLink]=" ['Repository'] ">Repository</a>
          </li>
          <li router-active>
            <a [routerLink]=" ['About'] ">About</a>
          </li>
        </ul>
      </nav>
`
})
export class Sidebar {
    name = 'raphael Santos';
}

import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from 'angular2/core';
import { RouterLink } from 'angular2/router';


@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-header',
    directives: [RouterLink],
    styles: [
        require('./app-header.scss')
    ],
    template: `
    <header class="header">
      <div class="g-row">
        <div class="g-col">
          <h1 class="header__title">Browser Code</h1>
          <div class="search">
           <i class="octicon octicon-search"></i>
           Search Language
          </div>
          <ul class="header__links">
            <li *ngIf="authenticated"><a class="header__link" [routerLink]=" ['Videos'] ">Video</a></li>
            <li *ngIf="authenticated"><a class="header__link" [routerLink]=" ['Repository'] ">Repository</a></li>
            <li *ngIf="authenticated"><a class="header__link" [routerLink]=" ['Tasks'] ">Tasks</a></li>
            <li *ngIf="authenticated"><a class="header__link border-link" (click)="signOut.emit()" href="#">Sign out</a></li>
            <li><i class="octicon octicon-sign-out"></i></li>
          </ul>
        </div>
      </div>
    </header>
  `
})

export class AppHeader {
    @Input() authenticated:boolean;
    @Output() signOut:EventEmitter<any> = new EventEmitter(false);
}

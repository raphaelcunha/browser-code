import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild } from 'angular2/core';
import { RouteConfig, Router, RouterLink } from 'angular2/router';
import { MODAL_DIRECTIVES, ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';


@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-header',
    directives: [RouterLink, MODAL_DIRECTIVES],
    styles: [
        require('./app-header.scss')
    ],
    template: `
    <header class="header">
      <div class="g-row">
        <div class="g-col">
          <h1 class="header__title">Browser Code</h1>
          <div class="search"  (click)="modal.open()">
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

            <modal (onClose)="closed()" #modal>
                 <form class="form-search" (submit)="modal.close()">
                   <input class="input-search" autofocus  type="text" name="q" [(ngModel)]="q"  placeholder="Search Language" />
                   <button type="submit" class="btn-search"  (click)="modal.close()" ><i class="octicon octicon-search" ></i></button>
                 </form>
            </modal>
        </div>
      </div>
    </header>
  `
})

export class AppHeader {

    constructor(private router:Router) {
    }

    @Input() authenticated:boolean;
    @Output() signOut:EventEmitter<any> = new EventEmitter(false);
    @ViewChild('myModal')
    modal:ModalComponent;

    public q:string = null;

    closed() {
        this.router.navigate(['Repository', {q: this.q}]);
    }


}

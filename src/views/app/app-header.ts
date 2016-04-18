import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild } from 'angular2/core';
import { Router, RouterLink, RouteParams, RouterOutlet } from 'angular2/router';
import { MODAL_DIRECTIVES, ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import {FORM_DIRECTIVES, CORE_DIRECTIVES, FormBuilder, Control, ControlGroup} from 'angular2/common';


@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-header',
    directives: [RouterLink, RouterOutlet, MODAL_DIRECTIVES, FORM_DIRECTIVES],
    styles: [require('./app-header.scss')],
    template: require('./header.html')
})

export class AppHeader {

    @Input() authenticated:boolean;
    @Output() signOut:EventEmitter<any> = new EventEmitter(false);
    @ViewChild('myModal')
    modal:ModalComponent;


    public user:any = JSON.parse(localStorage.getItem('firebase:session::browsercode'));
    public q:string = null;
    public query:string = null;
    public header:boolean = null;
    public form:ControlGroup;


    constructor(private router:Router, params:RouteParams, private fb:FormBuilder) {
        this.query = params.get('lang');
    }


    closed(q) {
        let url = this.removeURLParameter(window.location.href, 'lang');
        window.location.href = url + "?lang=" + q;
    }


    removeURLParameter(url, parameter) {
        //prefer to use l.search if you have a location/link object
        let urlparts = url.split('?');
        if (urlparts.length >= 2) {

            let prefix = encodeURIComponent(parameter) + '=';
            let pars = urlparts[1].split(/[&;]/g);

            //reverse iteration as may be destructive
            for (let i = pars.length; i-- > 0;) {
                //idiom for string.startsWith
                if (pars[i].lastIndexOf(prefix, 0) !== -1) {
                    pars.splice(i, 1);
                }
            }

            url = urlparts[0] + pars.join('&');
            return url;
        } else {
            return url;
        }
    }


}

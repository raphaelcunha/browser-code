import { EventEmitter } from 'angular2/core';
import { Router } from 'angular2/router';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
export declare class AppHeader {
    private router;
    constructor(router: Router);
    authenticated: boolean;
    signOut: EventEmitter<any>;
    modal: ModalComponent;
    q: string;
    closed(): void;
}

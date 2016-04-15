import { EventEmitter } from 'angular2/core';
import { Router } from 'angular2/router';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { SearchService } from 'src/core/search';
export declare class AppHeader {
    private router;
    authenticated: boolean;
    signOut: EventEmitter<any>;
    modal: ModalComponent;
    user: any;
    q: string;
    header: boolean;
    constructor(router: Router, searchService: SearchService);
    closed(): void;
}

import { Router } from 'angular2/router';
import { AuthService } from 'src/core/auth';
export declare class App {
    private auth;
    router: Router;
    constructor(auth: AuthService, router: Router);
    signOut(): void;
}

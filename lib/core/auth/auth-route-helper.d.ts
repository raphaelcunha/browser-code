import { Injector } from 'angular2/core';
import { Router } from 'angular2/router';
import { AuthService } from './auth-service';
export declare class AuthRouteHelper {
    static dependencies(): {
        auth: AuthService;
        router: Router;
    };
    static injector(injector?: Injector): Injector;
    static requireAuth(): boolean;
    static requireUnauth(): boolean;
}

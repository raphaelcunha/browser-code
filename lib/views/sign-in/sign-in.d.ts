import { Router } from 'angular2/router';
import { AuthService } from 'src/core/auth';
export declare class SignIn {
    private auth;
    private router;
    constructor(auth: AuthService, router: Router);
    signInWithGithub(): void;
    private postSignIn();
}

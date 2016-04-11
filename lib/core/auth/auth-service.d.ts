import { FirebaseAuth, FirebaseAuthState } from 'angularfire2';
export declare class AuthService {
    auth$: FirebaseAuth;
    private authState;
    constructor(auth$: FirebaseAuth);
    authenticated: boolean;
    expired: boolean;
    id: string;
    signInWithGithub(): Promise<FirebaseAuthState>;
    signInWithGoogle(): Promise<FirebaseAuthState>;
    signInWithTwitter(): Promise<FirebaseAuthState>;
    signOut(): void;
}

import { Http } from 'angular2/http';
export declare class Repository {
    http: Http;
    ls: any;
    accessToken: string;
    items: Array<any>;
    constructor(http: Http);
    ngOnInit(): void;
    search(query: any): void;
    searchGithub(query: any): void;
}

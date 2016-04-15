import { Http } from 'angular2/http';
import { RouteParams } from 'angular2/router';
export declare class Users {
    http: Http;
    ls: any;
    accessToken: string;
    items: string[];
    q: string;
    language: string;
    constructor(http: Http, params: RouteParams);
    searchGithub(query: any, language: any): void;
    getDetails(users: any): void;
}

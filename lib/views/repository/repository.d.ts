import { Http } from 'angular2/http';
import { RouteParams } from 'angular2/router';
export declare class Repository {
    http: Http;
    ls: any;
    accessToken: string;
    items: Array<any>;
    q: string;
    constructor(http: Http, params: RouteParams);
    ngOnInit(): void;
    searchGithub(query: any): void;
}

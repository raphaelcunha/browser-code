import { Http } from 'angular2/http';
import { RouteParams } from 'angular2/router';
import { SearchService } from 'src/core/search';
export declare class Repository {
    http: Http;
    ls: any;
    accessToken: string;
    items: Array<any>;
    q: string;
    constructor(http: Http, params: RouteParams, searchService: SearchService);
    ngOnInit(): void;
    searchGithub(query: any): void;
}

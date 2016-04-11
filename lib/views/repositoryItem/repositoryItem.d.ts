import { Http } from 'angular2/http';
import { RouteParams } from 'angular2/router';
export declare class RepositoryItem {
    http: Http;
    ls: any;
    accessToken: string;
    item: Array<any>;
    readme: string;
    id: string;
    constructor(http: Http, params: RouteParams);
    ngOnInit(): void;
    getReadme(): void;
    getFileReadme(url: any): void;
}

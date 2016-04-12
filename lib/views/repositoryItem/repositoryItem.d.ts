import { Http } from 'angular2/http';
import { RouteParams } from 'angular2/router';
export declare class MapToIterable {
    transform(dict: Object): Array;
}
export declare class RepositoryItem {
    http: Http;
    ls: any;
    accessToken: string;
    repository: any;
    readme: string;
    id: string;
    package: string;
    constructor(http: Http, params: RouteParams);
    ngOnInit(): void;
    getContent(): void;
    getRepository(): void;
    getReadme(): void;
}

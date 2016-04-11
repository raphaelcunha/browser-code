import { Http } from 'angular2/http';
export declare class Videos {
    http: Http;
    key: string;
    videos: string;
    constructor(http: Http);
    ngOnInit(): void;
    selectVideo(id: any): void;
}

import {Injectable} from 'angular2/core';

@Injectable()
export class SearchService {
    private query;

    constructor() {}

    setValue(val) {
        this.query = val;
    }

    getValue(val) {
        return this.val;
    }
}
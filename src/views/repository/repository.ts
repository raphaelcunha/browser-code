import {Component} from 'angular2/core';
import {Http, Headers} from 'angular2/http';
import { RouterLink} from 'angular2/router';



@Component({
    selector: 'repository',
    styles: [
        require('./repository.scss')
    ],
    directives: [RouterLink],
    template: require('./repository.html')
})
export class Repository {

    public ls: any = JSON.parse(localStorage.getItem('firebase:session::browsercode'));
    public accessToken: string = this.ls.github.accessToken;
    public items: Array <any>;
    public q: string =  null;

    constructor(public http: Http) { }


    ngOnInit(){
       this.searchGithub('angular');
    }

    search(query){
        this.searchGithub(query);
    }

    searchGithub(query){
        let url = `https://api.github.com/search/repositories?q=${query}&sort=stars&order=desc`;
        let headers = new Headers();
        headers.append('Authorization', `token ${this.accessToken}`);
        this.http.get(url, {headers: headers})
            .map(res => res.json())
            .subscribe(
                data => {
                    this.items = data.items;
                },
                error => console.error('Error'),
                () => console.log('Complete Search')
            );
    }

}

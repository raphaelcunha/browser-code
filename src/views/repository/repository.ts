import {Component} from 'angular2/core';
import {Http, Headers} from 'angular2/http';
import { RouterLink, RouteParams} from 'angular2/router';



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

    constructor(public http: Http, params: RouteParams) {
        this.q = params.get('q');
        if (this.q) {
            this.searchGithub(this.q);
        }else{
            this.q = 'javascript';
        }
    }


    ngOnInit(){
       this.searchGithub(this.q);
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

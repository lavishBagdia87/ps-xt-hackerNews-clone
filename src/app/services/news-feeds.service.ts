import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
    providedIn: 'root',
})

export class NewsFeedService {
    constructor( private http: HttpClient) { }
    private url = 'https://hn.algolia.com/api/v1/search?query=news'; 

    getNewsFeeds(page): Observable<any> {
        let currentUrl =this.url;
        if(page>1){
             currentUrl =currentUrl+ "?p="+page;
        }
        return this.http.get<any>(currentUrl);
    }

}
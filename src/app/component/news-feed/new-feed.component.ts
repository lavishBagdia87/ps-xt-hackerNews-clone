import { Component, OnInit } from '@angular/core';
import { NewsFeedService } from '../../services/news-feeds.service';
@Component({
    selector: 'news-feed',
    templateUrl: 'news-feed.component.html'
})

export class NewsFeedComponent implements OnInit {
    newsFeeds: any;
    page:any;
    constructor(private _newsFeedService: NewsFeedService) {
        this.newsFeeds = {};
        this.newsFeeds.hits = [];
        this.page = 1;
    }

    ngOnInit() {
        this.getNewsFeed(this.page);
    }

    getNewsFeed(curentpage) {
        this._newsFeedService.getNewsFeeds(curentpage).subscribe((newsFeeds) => {
            this.newsFeeds = newsFeeds
            console.log(this.newsFeeds.hits[0]);
        });
    }

    getDuration(milisec) {
        if (milisec !== null) {
            var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
            var firstDate = new Date(milisec);
            var secondDate = new Date();

            var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())));
            if (diffDays < oneDay) {
                return " "+diffDays + " hours ago";
            } else if (diffDays < 30 * oneDay) {
                diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay)))
                return " "+diffDays + " days ago";
            } else {
                diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (30 * (oneDay))));
                return " "+diffDays + " months ago";
            }

        }
    }

    getNext(){
        this.page++;
        this.getNewsFeed(this.page);
    }

    upVote(newsFeed){
        newsFeed.vote = true;
    }
    RemoveVote(newsFeed){
        newsFeed.vote = undefined;
    }

    removeFeeds(newsFeed,i){
        this.newsFeeds.hits.splice(i,1);
        let hideFeedList = JSON.parse(localStorage.getItem("hideFeedList"));
        hideFeedList.push(newsFeed);
        localStorage.setItem("hideFeedList",JSON.stringify(hideFeedList));
    }
}
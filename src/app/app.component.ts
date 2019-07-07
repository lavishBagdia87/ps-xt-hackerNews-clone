import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'news-hacker';

  constructor(){
    localStorage.setItem("hideFeedList",JSON.stringify([]));

  }
}

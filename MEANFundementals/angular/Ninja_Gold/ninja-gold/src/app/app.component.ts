import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    allGold: any;
    activity: any;
    constructor(private _httpService: HttpService){}
    ngOnInit() {
        this.getGold();
    }
    getGold() {
        let totalGold = this._httpService.getGold();
        totalGold.subscribe(data => {
            this.allGold = data['gold'];
            this.activity = data['activity'];
        })
    }
    submit(id) {
        let update = this._httpService.submit({id: id});
        update.subscribe(data => {
            this.allGold = data['gold'];
            this.activity = data['activity'];
        })
    }
}

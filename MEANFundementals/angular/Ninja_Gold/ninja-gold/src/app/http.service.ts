import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {
    constructor(private _http: HttpClient) {
        this.getGold();
    }
    getGold() {
        return this._http.get('/ninjagold');
    }
    submit(id) {
        return this._http.put('/ninjagold/', id);
    }
}

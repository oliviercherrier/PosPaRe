import { Injectable, Component } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import {AuthHttp} from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import { MyTypedItem } from '../models/myTypedItem';
import { PopareApiVars } from '../config/popareapi-variables';


@Injectable()
export class DataService {

    private actionUrl: string;

    constructor(private _http: AuthHttp) {
        this.actionUrl = PopareApiVars.POPARE_API_URL + 'api/v1/users';
    }

    public GetAll = (): Observable<MyTypedItem[]> => {
        return this._http.get(this.actionUrl)
            .map((response: Response) => <MyTypedItem[]>response.json())
            .catch(this.handleError);
    }

    public GetSingle = (id: number): Observable<MyTypedItem> => {
        return this._http.get(this.actionUrl + id)
            .map((response: Response) => <MyTypedItem> response.json())
            .catch(this.handleError);
    }

    public Add = (itemName: string): Observable<MyTypedItem> => {
        let toAdd = JSON.stringify({ ItemName: itemName });

        return this._http.post(this.actionUrl, toAdd)
            .map((response: Response) => <MyTypedItem>response.json())
            .catch(this.handleError);
    }

    public Update = (id: number, itemToUpdate: MyTypedItem): Observable<MyTypedItem> => {
        return this._http.put(this.actionUrl + id, JSON.stringify(itemToUpdate))
            .map((response: Response) => <MyTypedItem>response.json())
            .catch(this.handleError);
    }

    public Delete = (id: number): Observable<Response> => {
        return this._http.delete(this.actionUrl + id)
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
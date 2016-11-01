// Here were are using observables, not promises

import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Headers, RequestOptions} from '@angular/http';

import * as _ from 'lodash';

import {Connection} from './connection.model';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ConnectionService {
    
    //private connectionsUrl = './connections.data.json'; // URL to JSON file
    private connectionsUrl = 'app/+connections/connections.data.json'; // URL to JSON file
    //private connectionsUrl = 'app/connections';  // URL to web API
    
    constructor(private http: Http) {}
    
    add(name: string): Observable<Connection> {
        let body = JSON.stringify({name});
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        
        return this.http.post(this.connectionsUrl, body, options)
          .map(this.extractData)
          .catch(this.handleError);
    };
    
    del(name: string): Observable<Connection> {
        let id = JSON.stringify({name});
        let headers = new Headers({'Content-Type': 'application/json'});
        
        return this.http.delete(this.connectionsUrl)
          .map(this.extractData)
          .catch(this.handleError);
    };
    
    get(name: string): Observable<Connection[]> {
        return this.http.get(this.connectionsUrl)
          .map(this.extractData)
          .catch(this.handleError);
    };
    
    getAll(): Observable<Connection[]> {
        return this.http.get(this.connectionsUrl)
          .map(this.extractData)
          .catch(this.handleError);
    };
    
    search(term: string): Observable<Connection[]> {
        return this.http.get(this.connectionsUrl)
          .map(this.searchProcess, term)
          .catch(this.handleError);
    };
    
    update(name: string): Observable<Connection> {
        let body = JSON.stringify({name});
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        
        return this.http.put(this.connectionsUrl, body, options)
          .map(this.extractData)
          .catch(this.handleError);
    }
    
    
    private extractData(res: Response) {
        let body = res.json();
        return body.data || {};
    }
    
    private searchProcess(res: Response, term) {
        // The response object doesn't hold the data in a form the app can use directly.
        // You must parse the response data into a JSON object.
        let body = res.json();
    
        console.log('Term: ' + JSON.stringify(term));
    
        console.log('Unfiltered: ' + JSON.stringify(body.data));
        
        console.log('Filtering...');
        
        let filtered = _.filter(body.data, {'name': term} || {  });
        
        console.log('Filtered: ' + JSON.stringify(filtered));
        
        return filtered;
        
        //return body.data || { };
    }
    
    private handleError(error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
          error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        
        console.error(errMsg); // log to console instead
        
        return Observable.throw(errMsg);
    }
}


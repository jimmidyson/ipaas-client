import {Component} from '@angular/core';

import {Logger} from '../common/service/log';

var log = Logger.get('+connections/library');

@Component({
    selector: 'connections-library',
    styles: [require('./library.scss')],
    templateUrl: './library.html'
})
export class Library {
    
    constructor() {
    }
    
    ngOnInit() {
        log.debug('hello `Connections: Library` component');
    }
    
    
}
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class Notice {
    private subject = new Subject<any>();
    observable = this.subject.asObservable();
    announce(n: any) {
        this.subject.next(n);
    }
}

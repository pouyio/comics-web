import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ResolveService {

  private subject = new Subject<boolean>();

  setState = (state: boolean): void => this.subject.next(state);

  getState = (): Observable<any> => this.subject.asObservable();


}

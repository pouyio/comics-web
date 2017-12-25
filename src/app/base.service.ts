import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { AuthService } from './auth.service';
import { ResolveService } from './resolve.service';

@Injectable()
export class BaseService {

  // protected baseUrl: string = 'http://192.168.1.33:8080';
  protected baseUrl: string = 'https://comic.vicenteortiz.me:8081';

  constructor(protected http: HttpClient, protected auth: AuthService, protected resolver: ResolveService) {}

  protected handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}

import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { AuthService } from './auth.service';
import { ResolveService } from './resolve.service';
import { environment } from '../environments/environment';

@Injectable()
export class BaseService {

  protected baseUrl: String = environment.rest_url;

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
    return of(errMsg);
  }
}

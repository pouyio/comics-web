import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { of } from "rxjs";
import { AuthService } from "./auth.service";
import { ResolveService } from "./resolve.service";
import { environment } from "../environments/environment";

@Injectable()
export class BaseService {
  protected baseUrl: String = environment.rest_url;

  constructor(
    protected http: HttpClient,
    protected auth: AuthService,
    protected resolver: ResolveService
  ) {}

  protected handleError(error: HttpErrorResponse) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error.error instanceof ErrorEvent) {
      errMsg = `${error.status} - ${error.error.message || ""}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return of(errMsg);
  }
}

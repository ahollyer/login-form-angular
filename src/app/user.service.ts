import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  /**
   * Eventually, will send login credentials via HTTP.
   */
  login(credentials: any): Observable<string> {
    if(!credentials) return throwError("Error logging in");
    return of("Success! You logged in.");
  }
}

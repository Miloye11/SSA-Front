import { Injectable } from '@angular/core';

// Dodatni importi
import { Observable } from 'rxjs/Observable';
import { URLSearchParams, Headers, Response, RequestOptions, Http, HttpModule } from '@angular/http';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
import { ILogin } from '../Models/ILogin';

@Injectable()
export class LogedUserService {

  serviceUrl: string = 'http://localhost:53634'; // Konstana putanja do back-end-a

  constructor(public http: HttpClient) { }

  LogedUser() : Observable<ILogin[]>
  {
    return this.http.get<ILogin[]>(this.serviceUrl+'/api/portal/logeduser/getuser');
  }
}

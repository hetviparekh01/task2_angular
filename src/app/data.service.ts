import { HttpClient } from '@angular/common/http';
import { Injectable, Type } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  getapiUrl= "http://localhost:3000/user/getAllUser";
  postapiUrl='http://localhost:3000/user/addUser'
  loginUrl='http://localhost:3000/user/login'
  // httpOptions={headers:this.headers}
  constructor(private http: HttpClient) { }
  fetchData(): Observable<any> {
    return this.http.get<any>(this.getapiUrl)
  }
  addUser(user: any): Observable<any> {
    return this.http.post<any>(this.postapiUrl, user)
  }
  loginUser(userdata:any) :Observable<any> {
    return this.http.post<any>(this.loginUrl,userdata)
  }
}

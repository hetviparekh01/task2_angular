import { HttpClient } from '@angular/common/http';
import { Injectable, Type } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  apiUrl='http://localhost:3000/user/'
  token:string = '';
  // httpOptions={headers:this.headers}
  constructor(private http: HttpClient) { }
  fetchData(): Observable<any> {
    return this.http.get<any>(this.apiUrl+`getAllUser`)
  }
  addUser(user: any): Observable<any> {
    return this.http.post<any>(this.apiUrl+`addUser`, user)
  }
  loginUser(userdata:any) :Observable<any> {
    return this.http.post<any>(this.apiUrl+`login`,userdata)
  }
  signupUser(userdata:any):Observable<any>{
    return this.http.post<any>(this.apiUrl+`signup`,userdata)
  }
  deleteUser(id:string){
    return this.http.delete<any>(this.apiUrl+`deleteUser/?id=${id}`)
  }
}

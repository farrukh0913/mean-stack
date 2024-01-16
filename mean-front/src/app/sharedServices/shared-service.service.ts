import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class sharedService {

  constructor( private http: HttpClient) { }

  SignUp(newUserInfo:any){
   return this.http.post('http://localhost:3000/newUser' , newUserInfo)
  }
  login(UserInfo:any){
   return this.http.post('http://localhost:3000/login' , UserInfo)
  }
  paymentGateway(body: any) {
    return this.http.post('http://localhost:3000/create-subscription', body);
  }
  

}

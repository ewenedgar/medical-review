import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { User } from '../types';
 
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  #http =inject(HttpClient);

  state_signal = signal({
    _id:'',
    fullname:'',
    email:'',
    jwt:''
  });

  isLoggedIn(){
    return this.state_signal().jwt !== '';
  }
 
  signin(user: {email: string, password: string}){
    return this.#http.post<{success:boolean, data: string}>('http://localhost:3000/users/signin', user) 
  }

  signup(user: User){
    return this.#http.post('http://localhost:3000/users/signup', user) 
  }

  constructor() { 
    const state = localStorage.getItem('StateMedicalReview');
    if(state){
      this.state_signal.set(JSON.parse(state));
    }
  }


}

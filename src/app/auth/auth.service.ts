import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authStatus = false;
  authStatusListener = new Subject<boolean>();
  constructor(private router: Router) { }
  loginUser() {
    // this.authStatus = true;
    // this.authStatusListener.next(true);
    this.router.navigateByUrl('/acasa');
  }
  getAuthStatus(){
    return this.authStatus;
  }
  getAuthStatusListener(){
    return this.authStatusListener.asObservable();
  }
  setAuthStatus(bool){
    this.authStatus = bool;
    this.authStatusListener.next(bool);
  }
}

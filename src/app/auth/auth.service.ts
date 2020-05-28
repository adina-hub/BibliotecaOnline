import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  authStatus = false;
  authStatusListener = new Subject<boolean>();
  userType = '';
  userTypeListener = new Subject<string>();
  userId = '';
  userData: {displayName: string} = {displayName: ''};
  userMail: {email: string} = {email: ''};
  userDataListener = new Subject <string>();
  userMailListener = new Subject <string>();

  constructor(private router: Router, private http: HttpClient)
  {}

  loginUser(user) {
    this.http.post<{mesaj: string, token: string, userType: string, userId: string, userMail: string }>
    ('http://localhost:3000/login/', user)
      .subscribe(dateServer => {
        console.log(dateServer.mesaj);
        if (dateServer.token) {
          this.authStatus = true;
          this.authStatusListener.next(true);
          this.userType = dateServer.userType;
          this.userTypeListener.next(dateServer.userType);
          this.userId = dateServer.userId;
          localStorage.setItem('authStatus', String(this.authStatus));
          localStorage.setItem('userType', dateServer.userType);
          localStorage.setItem('userId', dateServer.userId);
        } else {
          alert('Request denied, no token');
        }
        this.router.navigateByUrl('/acasa');
      });
  }

  logoutUser() {
    this.authStatus = false;
    this.authStatusListener.next(false);
    localStorage.removeItem('authStatus');
    this.router.navigateByUrl('/login');
  }

  loginAdmin() {
    this.authStatus = true;
    this.authStatusListener.next(true);
    this.userType = 'admin';
    this.userTypeListener.next('admin');
    localStorage.setItem('authStatus', 'true');
    localStorage.setItem('userType', this.userType);
    this.router.navigateByUrl('/acasaAdmin');
  }

  getAuthStatus() {
    this.authStatus = Boolean(localStorage.getItem('authStatus'));
    return this.authStatus;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getUserType() {
    this.userType = localStorage.getItem('userType');
    return this.userType;
  }

  getUserId(){
    this.userId = localStorage.getItem('userId');
    return this.userId;
  }


  getUserTypeListener() {
    return this.userTypeListener.asObservable();
  }

  setAuthStatus(bool) {
    this.authStatus = bool;
    this.authStatusListener.next(bool);
  }

  registerUser(user) {
    this.http.post<{ message: string }>('http://localhost:3000/adduser/', user).subscribe(serverData => {
      console.log(serverData.message);
    });
    this.router.navigateByUrl('/login');
  }

  getUserData(userIdToSend){
    const userId = {userId: userIdToSend};
    this.http.post<{displayName: string}>('http://localhost:3000/userData/', userId).subscribe(serverData => {
      this.userData.displayName = serverData.displayName;
      this.userDataListener.next(serverData.displayName);
    });
  }

  getUserDataListener(){
    return this.userDataListener.asObservable();
  }

  getUserMail(userIdToSend){
    const userId = {userId: userIdToSend};
    this.http.post<{email: string}>('http://localhost:3000/userMail/', userId).subscribe(serverData => {
      this.userMail.email = serverData.email;
      this.userMailListener.next(serverData.email);
    });
  }

  getUserMailListener(){
    return this.userMailListener.asObservable();
  }



  trimiteMesajRegister(value) {
    alert('Inregistrare completa');
  }

}

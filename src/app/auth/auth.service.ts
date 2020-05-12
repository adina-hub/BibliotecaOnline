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

  constructor(private router: Router, private http: HttpClient) {
  }

  /* loginUser() {
     this.authStatus = true;
     this.authStatusListener.next(true);
     this.userType = 'user';
     this.userTypeListener.next('user');
     localStorage.setItem('authStatus', 'true');
     this.router.navigateByUrl('/acasa');
  }*/
  loginUser(user) {
    this.http.post<{ mesaj: string, token: string, userType: string }>('http://localhost:3000/login/', user).subscribe(dateServer => {
      console.log(dateServer.mesaj);
      if (dateServer.token) {
        this.userType = dateServer.userType;
        this.userTypeListener.next(dateServer.userType);
        this.authStatus = true;
        this.authStatusListener.next(true);
        localStorage.setItem('authStatus', String(this.authStatus));
        localStorage.setItem('userType', dateServer.userType);
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
  }

  trimiteMesajRegister(value) {
    alert('Inregistrare completa');
  }
}


// WHEN THE SERVER IS READY

// loginUser(user){
//   this.http.post<{mesaj: string, token: string}>('adresaServer', user).subscribe(dateServer => {
//     console.log(dateServer.mesaj);
//        if(dateServer.token){
//             this.authStatus = true;
//             this.authStatusListener.next(true);
//             localStorage.setItem('token', dateServer.token);
//        } else {
//              alert("Request denied, no token");
//             }
//     this.router.navigateByUrl('/acasa');
//   });
// }

// logoutUser(){
//   this.authStatus = false;
//   this.authStatusListener.next(false);
//   localStorage.removeItem('token');
//   this.router.navigateByUrl('/login');
// }

// registerUser(user){
//   this.http.post<{message: string}>('adresaServer', user).subscribe(serverData => {
//     console.log(serverData.message);
//   });
// }

// SERVER RELATED

// router.post('adresaServer/register', (req, res, next) => {
//   bcrypt.hash(req.body.password, 10).then(hPass => {
//     const newUser = new User({username: req.body.username, password: hPass});
//     newUser.save().then(() => {
//       res.status(201).json({
//         message: 'User added'
//       });
//     });
//   });
// });  DONE !!!!

// router.post('adresaServer/login', (req, res, next) => {
//   User.findOne({email: req.body.email}).then(foundUser => {
//     bcrypt.compare(req.body.password, foundUser.password).then((result) => {
//         if(result){
//           const token = jwt.sign({
//             id: foundUser._id,
//             displayName: foundUser.displayName,
//             email: foundUser.email,
//             userType: foundUser.userType
//           }, "secretString");
//           res.status(200).json({
//             token: token,
//             userType: foundUser.userType
//           });
//         } else{
//           res.status(401).json({message: 'Credentials Wrong'});
//         }
//     });
//   });
// });

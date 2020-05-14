import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userType: string;
  userTypeSub: Subscription;
  userId: string;
  userData: {displayName: string} = {displayName: ''};
  userDataSub: Subscription;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.userType = this.authService.getUserType();
    this.userTypeSub = this.authService.getUserTypeListener().subscribe(userType => {
      this.userType = userType;
    });
    this.userId = this.authService.getUserId();
    this.authService.getUserData(this.userId);
    this.userDataSub = this.authService.getUserDataListener().subscribe(displayName => {
      this.userData.displayName = displayName;
    });
  }
  logout(){
    this.authService.logoutUser();
  }
}

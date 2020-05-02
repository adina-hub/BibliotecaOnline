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
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.userType = this.authService.getUserType();
    this.userTypeSub = this.authService.getUserTypeListener().subscribe(userType => {
      this.userType = userType;
      console.log(this.userType);
    });
  }
  logout(){
    this.authService.logoutUser();
  }
}

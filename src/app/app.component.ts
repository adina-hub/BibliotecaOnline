import {Component, OnInit} from '@angular/core';
import {AuthService} from './auth/auth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  authStatus = false;
  authStatusListener: Subscription;
  constructor(private authService: AuthService){}

  ngOnInit(): void {
    this.authStatus = this.authService.getAuthStatus();
    this.authStatusListener = this.authService.getAuthStatusListener()
      .subscribe((authStatus) => {
        this.authStatus = authStatus;
      });
  }
}

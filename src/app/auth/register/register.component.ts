import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl(''),
      university: new FormControl(''),
      userType: new FormControl('user'),
      password: new FormControl('')
    });
  }

  register(){
      console.log(this.registerForm.value);
      this.authService.trimiteMesajRegister(this.registerForm.value);
      this.authService.registerUser(this.registerForm.value);
  }

}

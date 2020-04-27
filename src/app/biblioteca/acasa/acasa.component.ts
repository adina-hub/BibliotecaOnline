import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-acasa',
  templateUrl: './acasa.component.html',
  styleUrls: ['./acasa.component.css']
})
export class AcasaComponent implements OnInit {
  authStatus = true;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

}

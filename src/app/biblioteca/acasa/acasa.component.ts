import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {Carte} from '../carte.model';
import {BibliotecaService} from '../biblioteca.service';

@Component({
  selector: 'app-acasa',
  templateUrl: './acasa.component.html',
  styleUrls: ['./acasa.component.css']
})
export class AcasaComponent implements OnInit {
  authStatus = true;
  carti: Carte[];
  categorii: {nume: string}[];
  constructor(private authService: AuthService,
              private bibliotecaService: BibliotecaService) { }

  ngOnInit(): void {
    this.carti = this.bibliotecaService.getCarti();
    this.categorii = this.bibliotecaService.getCategorii();
  }

}

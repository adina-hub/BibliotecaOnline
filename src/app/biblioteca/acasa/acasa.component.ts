import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {Carte} from '../carte.model';
import {BibliotecaService} from '../biblioteca.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-acasa',
  templateUrl: './acasa.component.html',
  styleUrls: ['./acasa.component.css']
})
export class AcasaComponent implements OnInit {
  authStatus = true;
  carti: Carte[];
  cartiSub: Subscription;
  categoriiSub: Subscription;
  categorii: {nume: string}[];
  constructor(private authService: AuthService,
              private bibliotecaService: BibliotecaService) { }

  ngOnInit(): void {
    this.bibliotecaService.getCarti();
    this.cartiSub = this.bibliotecaService.getCartiListener().subscribe(carti => {
      this.carti = carti;
    });
    this.bibliotecaService.getCategorii();
    this.categoriiSub = this.bibliotecaService.getCategoriiListener().subscribe(categorii => {
      this.categorii = categorii;
    });
  }

}

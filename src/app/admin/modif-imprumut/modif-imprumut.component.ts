import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Carte} from '../../biblioteca/carte.model';
import {BibliotecaService} from '../../biblioteca/biblioteca.service';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-modif-imprumut',
  templateUrl: './modif-imprumut.component.html',
  styleUrls: ['./modif-imprumut.component.css']
})
export class ModifImprumutComponent implements OnInit {
  rezervare:{email: string, carte: string, data_imp: string, data_ret: string}[] = [];
  rezervareSub: Subscription;
  constructor(private http: HttpClient, private bibliotecaService: BibliotecaService){}

  ngOnInit(): void {
    this.bibliotecaService.getRezervare();
    this.rezervareSub = this.bibliotecaService.getRezervareListener().subscribe(rezervare => {
      this.rezervare = rezervare;
    });
  }


}

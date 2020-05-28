import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Carte} from '../../biblioteca/carte.model';
import {BibliotecaService} from '../../biblioteca/biblioteca.service';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-acasa-admin',
  templateUrl: './acasa-admin.component.html',
  styleUrls: ['./acasa-admin.component.css']
})
export class AcasaAdminComponent implements OnInit {
  mesaje: { subiect: string, mesaj: string }[];
  mesajeSub: Subscription;
  constructor(private http: HttpClient, private bibliotecaService: BibliotecaService){}


  ngOnInit(): void {
    this.bibliotecaService.getMesaje();
    this.mesajeSub = this.bibliotecaService.getMesajeListener().subscribe(mesaje => {
      this.mesaje = mesaje;
    });
  }
}

import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Carte} from '../../biblioteca/carte.model';
import {BibliotecaService} from '../../biblioteca/biblioteca.service';

@Component({
  selector: 'app-acasa-admin',
  templateUrl: './acasa-admin.component.html',
  styleUrls: ['./acasa-admin.component.css']
})
export class AcasaAdminComponent implements OnInit {
  mesaje:{email: string, subiect: string, mesaj: string}[] = [{email: 'ovidiu.florica99@e-uvt.ro', subiect: 'carti', mesaj: 'nu gasesc carte de programare'},{email: 'theodor.varvaroi10@e-uvt.ro', subiect: 'treaba buna', mesaj: 'imi plac cartile de site'},{email: 'ovidiu.florica99@e-uvt.ro', subiect: 'carti', mesaj: 'nu gasesc carte de programare'},{email: 'theodor.varvaroi10@e-uvt.ro', subiect: 'treaba buna', mesaj: 'imi plac cartile de site'},{email: 'ovidiu.florica99@e-uvt.ro', subiect: 'carti', mesaj: 'nu gasesc carte de programare'},{email: 'theodor.varvaroi10@e-uvt.ro', subiect: 'treaba buna', mesaj: 'imi plac cartile de site'},{email: 'ovidiu.florica99@e-uvt.ro', subiect: 'carti', mesaj: 'nu gasesc carte de programare'},{email: 'theodor.varvaroi10@e-uvt.ro', subiect: 'treaba buna', mesaj: 'imi plac cartile de site'}];
  constructor(private http: HttpClient, private bibliotecaService: BibliotecaService){}


  ngOnInit(): void {
    this.bibliotecaService.getMesaje();

  }
}

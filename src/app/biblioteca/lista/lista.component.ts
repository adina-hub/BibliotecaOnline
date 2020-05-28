import { Component, OnInit } from '@angular/core';
import {BibliotecaService} from '../biblioteca.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {
  lista: {email: string, carte: string, data_imp: string, data_ret: string}[] = [];
  listaSub: Subscription;
  constructor(private bibliotecaService: BibliotecaService) { }

  ngOnInit(): void {
    // this.listaCarti = this.bibliotecaService.getListaCarti();
    this.bibliotecaService.getRezervare();
    this.listaSub = this.bibliotecaService.getRezervareListener().subscribe(lista => {
      this.lista = lista;
    });
  }

}

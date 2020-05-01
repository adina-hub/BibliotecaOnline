import { Component, OnInit } from '@angular/core';
import {BibliotecaService} from '../biblioteca.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {
  listaCarti;
  constructor(private bibliotecaService: BibliotecaService) { }

  ngOnInit(): void {
    this.listaCarti = this.bibliotecaService.getListaCarti();
  }

}

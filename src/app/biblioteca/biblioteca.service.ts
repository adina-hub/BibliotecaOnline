import { Injectable } from '@angular/core';
import {Carte} from './carte.model';

@Injectable({
  providedIn: 'root'
})
export class BibliotecaService {
  carti: Carte[];
  categorii: {nume: string}[];
  constructor() { }
  getCarti(){
    this.carti = [
      { isbn: '978-606-33-3606-5',
        titlu: 'Pacienta Tacuta',
        autor: 'Ion Creanga',
        categoria: 'Actiune',
        img: '../../../assets/images/Carti/actiune1.jpeg'
      },
      { isbn: '978-606-33-3606-5',
        titlu: 'Hotul De Carti',
        autor: 'Ion Creanga',
        categoria: 'Actiune',
        img: '../../../assets/images/Carti/actiune2.jpg'
      },
      { isbn: '978-606-33-3606-5',
        titlu: 'Hotul De Papoi',
        autor: 'Koala Bear',
        categoria: 'Comedie',
        img: '../../../assets/images/Carti/actiune2.jpg'
      },
      { isbn: '978-606-33-3606-5',
        titlu: 'Dragon Throne',
        autor: 'Ion Creanga',
        categoria: 'Aventura',
        img: '../../../assets/images/Carti/aventura1.jpg'
      },
      ];
    console.log(this.carti);
    return this.carti;
  }
  getCategorii(){
  this.categorii = [
    {nume: 'Actiune'},
    {nume: 'Aventura'},
    {nume: 'Comedie'}
  ];
  return this.categorii;
  }

}

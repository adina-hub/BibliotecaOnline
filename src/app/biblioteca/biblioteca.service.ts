import { Injectable } from '@angular/core';
import {Carte} from './carte.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BibliotecaService {
  carti: Carte[];
  categorii: {nume: string}[];
  listaCarti: {id: number, titlu: string, dataImprumut: Date, dataRetur: Date};
  constructor(private http: HttpClient) { }
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
        titlu: 'Amintiri din copilarie',
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

  setListaCarti(listaCarti){
    const listaCartiPrimite = listaCarti.map((val, index) => {
      return {
        id: index,
        titlu: val.titlu,
        dataImprumut: val.dataImprumut,
        dataRetur: val.dataRetur
      };
    });
    this.listaCarti = listaCartiPrimite;
  }
  getListaCarti(){
    return this.listaCarti;
  }

  trimiteMesaj(value){
    alert('Mesaj trimis');
  }
}

// WHEN THE SERVER IS DONE

// getCarti(){
//   this.http.get<{carti: Carte[]}>('adresaServer').subscribe(serverResponse => {
//     this.carti = serverResponse.carti;
//     return this.carti;
//   });
// }

// getCategorii(){
//   this.http.get<{categorii: {nume: string}[]}>('adresaServer').subscribe(serverResponse => {
//     this.categorii = serverResponse.categorii;
//     return this.categorii;
//   });
// }

// setListaCarti(listaCarti){
//   const listaCartiPrimite = listaCarti.map((val, index) => {
//     return {
//       id: index,
//       titlu: val.titlu,
//       dataImprumut: val.dataImprumut,
//       dataRetur: val.dataRetur
//     };
//   });
//   this.http.post<{message: string}>('serverURL', listaCartiPrimite).subscribe((serverData) => {
//     console.log(serverData.message);
//   });
// }

// getListaCarti(){
//   this.http.get('serverURL').subscribe((serverData) => {
//     this.listaCarti = serverData.listaCarti;
//     return this.listaCarti;
//   });
// }

// trimiteMesaj(mesaj){
//   alert('Mesaj trimis');
//   this.http.post<{message: string}>('serverURL', mesaj).subscribe((serverData) => {
//     console.log(serverData.message);
//   });
// }

import { Injectable } from '@angular/core';
import {Carte} from './carte.model';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BibliotecaService {
  carti: Carte[];
  cartiListener = new Subject<Carte[]>();
  categorii: {nume: string}[];
  categoriiListener = new Subject<{nume: string}[]>();
  listaCarti: {id: number, titlu: string, dataImprumut: Date, dataRetur: Date};
  constructor(private http: HttpClient) { }
  getCarti(){
    this.http.get<{carti: Carte[]}>('serverUrl/carti').subscribe(serverData => {
      this.carti = serverData.carti;
      this.cartiListener.next([...this.carti]);
    });
  }
  getCartiListener(){
    return this.cartiListener.asObservable();
  }

  getCategorii(){
    this.http.get<{categorii: {nume: string}[]}>('serverUrl/carti').subscribe(serverData => {
      this.categorii = serverData.categorii;
      this.categoriiListener.next([...this.categorii]);
    });
  }
  getCategoriiListener(){
    return this.categoriiListener.asObservable();
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

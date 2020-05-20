import { Injectable } from '@angular/core';
import {Carte} from './carte.model';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BibliotecaService {
  carti: Carte[] = [];
  // images: {categorie: string, src: string}[];
  cartiListener = new Subject<Carte[]>();
  categorii: {nume: string}[] = [];
  categoriiListener = new Subject<{nume: string}[]>();
  listaCarti: { userId: string; titlu: string; dataImprumut: Date; dataRetur: Date }[];
  constructor(private http: HttpClient, private router: Router) { }

  getCarti(){
    this.http.get<{carti: Carte[]}>('http://localhost:3000/getCarti/').subscribe(serverData => {
      this.carti = serverData.carti;
      this.cartiListener.next([...this.carti]);
    });
  }

  getCartiListener(){
    return this.cartiListener.asObservable();
  }

   getCategorii(){
    this.http.get<{categorii: {nume: string}[]}>('http://localhost:3000/getCategorii/').subscribe(serverData => {
      console.log(serverData);
      this.categorii = serverData.categorii;
      this.categoriiListener.next([...this.categorii]);
    });
  }

  getCategoriiListener(){
    return this.categoriiListener.asObservable();
  }


  sendListaCarti(listaCarti){
    this.http.post('serveURL', listaCarti).subscribe(() => {
      this.router.navigateByUrl('/listaMea');
    });
  }
  getListaCarti(){
    this.http.get<{listaCarti: {userId: string, titlu: string, dataImprumut: Date, dataRetur: Date}[]}>('serverURL')
      .subscribe(serverData => {
      this.listaCarti = serverData.listaCarti;
      return this.listaCarti;
    });
  }

  trimiteMesaj(mesaj){
  alert('Mesaj trimis');
  this.http.post<{message: string}>('http://localhost:3000/contactu', mesaj).subscribe((serverData) => {
    console.log(serverData.message);
  });
}
}


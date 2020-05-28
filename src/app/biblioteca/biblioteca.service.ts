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
  mesaje: {subiect: string, mesaj: string}[] = [];
  mesajeListener = new Subject<{subiect: string, mesaj: string}[]>();
  rezervare:{email: string, carte: string, data_imp: string, data_ret: string}[] = [];
  rezervareListener = new Subject<{email: string, carte: string, data_imp: string, data_ret: string}[]>();
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
    this.http.post('http://localhost:3000/addRezervare/', listaCarti).subscribe(() => {
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
  getRezervare(){
    this.http.get<{rezervare:{email: string, carte: string, data_imp: string, data_ret: string}[]}>('http://localhost:3000/getRezervare/').subscribe(serverData => {
      this.rezervare = serverData.rezervare;
      this.rezervareListener.next([...this.rezervare]);
    });

  }
  getRezervareListener(){
    return this.rezervareListener.asObservable();
  }
  getMesaje()
  {
    this.http.get<{mesaje:{subiect: string, mesaj: string}[]}>('http://localhost:3000/getMesaje/').subscribe(serverData => {
      this.mesaje = serverData.mesaje;
      this.mesajeListener.next([...this.mesaje]);
    });
  }

  getMesajeListener(){
    return this.mesajeListener.asObservable();
  }
  adauga(book)
  {
    this.http.post<{ message: string }>('http://localhost:3000/addBook/', book).subscribe(serverData => {
      console.log(serverData.message);
    });
  }
  trimiteMesajAdauga(value) {
    alert('Carte adaugata cu succes');
  }
}


import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {BibliotecaService} from '../biblioteca.service';
import {Carte} from '../carte.model';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-imprumut',
  templateUrl: './imprumut.component.html',
  styleUrls: ['./imprumut.component.css']
})
export class ImprumutComponent implements OnInit {
  categorii: { nume: string }[] = [];
  categoriiSub: Subscription;
  carti: Carte[] = [];
  cartiSub: Subscription;
  imprumutForm: FormGroup;
  carteFormId = -1;
  categorieCurenta: string;
  totalCarti = 1;
  userId: string;
  userMail: {mail: string} = {mail: ''};
  userMailSub: Subscription;
  constructor(private authService: AuthService,
              private bibliotecaService: BibliotecaService,
              private router: Router,
              private http: HttpClient) {
  }

  ngOnInit(): void {
    this.bibliotecaService.getCarti();
    this.userId = this.authService.getUserId();
    this.cartiSub = this.bibliotecaService.getCartiListener().subscribe(carti => {
      this.carti = carti;
    });
    this.bibliotecaService.getCategorii();
    this.categoriiSub = this.bibliotecaService.getCategoriiListener().subscribe(categorii => {
      this.categorii = categorii;
      this.categorieCurenta = this.categorii[0].nume;
      this.imprumutForm = new FormGroup({
        cartiForms: new FormArray([this.initForm()])
      });
    });
    this.authService.getUserMail(this.userId);
    this.userMailSub = this.authService.getUserMailListener().subscribe(userMail => {
      this.userMail.mail = userMail;
    });

  }

  filtrareCarti(categorie: string) {
    const cartiFiltrate = [...this.carti.filter(carte => carte.categoria === categorie)];
    return cartiFiltrate;
  }

  initForm(){
    this.carteFormId += 1;
    return new FormGroup({
      id: new FormControl(this.carteFormId),
      categorie: new FormControl(this.categorii[0]),
      carte: new FormControl(this.filtrareCarti(this.categorieCurenta)[0])
    });
  }

  formData(form){
    return form.get('cartiForms');
  }

  adaugaCarte(){
    this.totalCarti += 1;
    const control = this.imprumutForm.get('cartiForms') as FormArray;
    control.push(this.initForm());
  }
  stergeCarte(carteId) {
    const control = this.imprumutForm.get('cartiForms') as FormArray;
    control.controls.forEach((carteForm: FormGroup) => {
      if (carteForm.controls.id.value >= carteId) {
        carteForm.controls.id.setValue(carteForm.controls.id.value - 1);
        console.log(carteForm.controls.id.value);
      }
    });
    console.log('FROM IMPRUMUT COMPONENT ' + carteId);
    this.carteFormId -= 1;
    this.totalCarti -= 1;
    control.removeAt(carteId);
  }

  finalizareImprumut(){
    const userInputData = this.imprumutForm.value.cartiForms.map(carteForm => {
      return {
        userId: this.userId,
        titlu: carteForm.carte.titlu,
        dataImprumut: new Date(),
        dataRetur: new Date(Date.now() + 12096e5),
        mail: this.userMail.mail
      };
    });

    this.bibliotecaService.sendListaCarti(userInputData);
    this.router.navigateByUrl('/listaMea');
  }


}

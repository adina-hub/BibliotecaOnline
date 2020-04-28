import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {BibliotecaService} from '../biblioteca.service';
import {Carte} from '../carte.model';
import {FormArray, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-imprumut',
  templateUrl: './imprumut.component.html',
  styleUrls: ['./imprumut.component.css']
})
export class ImprumutComponent implements OnInit {
  categorii: { nume: string }[];
  carti: Carte[];
  imprumutForm: FormGroup;
  categorieCurenta: string;
  totalCarti = 1;
  constructor(private authService: AuthService,
              private bibliotecaService: BibliotecaService) {
  }

  ngOnInit(): void {
    this.carti = this.bibliotecaService.getCarti();
    this.categorii = this.bibliotecaService.getCategorii();
    this.categorieCurenta = this.categorii[0].nume;
    this.imprumutForm = new FormGroup({
     cartiForms: new FormArray([this.initForm()])
    });
  }

  filtrareCarti(categorie: string) {
    const cartiFiltrate = [...this.carti.filter(carte => carte.categoria === categorie)];
    return cartiFiltrate;
  }

  initForm(){
    return new FormGroup({
      categorie: new FormControl(this.categorii[0]),
      titlu: new FormControl(this.filtrareCarti(this.categorieCurenta)[0])
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
}

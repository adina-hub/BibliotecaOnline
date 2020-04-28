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
  categorieCurenta: string;
  carti: Carte[];
  imprumutForm: FormGroup;
  constructor(private authService: AuthService,
              private bibliotecaService: BibliotecaService) {
  }

  ngOnInit(): void {
    this.carti = this.bibliotecaService.getCarti();
    this.categorii = this.bibliotecaService.getCategorii();
    this.categorieCurenta = this.categorii[0].nume;
    this.imprumutForm = new FormGroup({
      categorie: new FormControl(this.categorii[0]),
      titlu: new FormControl(this.filtrareCarti(this.categorieCurenta)[0])
    });
    this.onChanges();
  }

  filtrareCarti(categorie: string) {
    const cartiFiltrate = [...this.carti.filter(carte => carte.categoria === categorie)];
    return cartiFiltrate;
  }
  onChanges(): void {
    this.imprumutForm.controls.categorie.valueChanges.subscribe(val => {
      this.categorieCurenta = val.nume;
      const index = this.categorii.findIndex(categorie => categorie.nume === this.categorieCurenta);
      this.imprumutForm = new FormGroup({
        categorie: new FormControl(this.categorii[index]),
        titlu: new FormControl(this.filtrareCarti(this.categorieCurenta)[0])
      });
    });
  }
}

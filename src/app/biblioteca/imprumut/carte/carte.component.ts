import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-carte',
  templateUrl: './carte.component.html',
  styleUrls: ['./carte.component.css']
})
export class CarteComponent implements OnInit {
  @Input() carteForm;
  @Input() carti;
  @Input() categorii;
  @Input() categorieCurenta;
  @Input() totalCarti;
  constructor() { }
  ngOnInit(): void {
    this.onChanges();
  }
  onChanges(): void {
    this.carteForm.controls.categorie.valueChanges.subscribe(val => {
      this.categorieCurenta = val.nume;
      const index = this.categorii.findIndex(categorie => categorie.nume === this.categorieCurenta);
      this.carteForm = new FormGroup({
        categorie: new FormControl(this.categorii[index]),
        titlu: new FormControl(this.filtrareCarti(this.categorieCurenta)[0])
      });
    });
  }
  filtrareCarti(categorie: string) {
    const cartiFiltrate = [...this.carti.filter(carte => carte.categoria === categorie)];
    return cartiFiltrate;
  }

}

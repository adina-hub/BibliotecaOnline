import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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
  @Output() stergeCarteId = new EventEmitter();
  constructor() { }
  ngOnInit(): void {
    this.onChanges();
  }
  onChanges(): void {
    this.carteForm.controls.categorie.valueChanges.subscribe(val => {
      this.categorieCurenta = val.nume;
      this.carteForm.controls.carte.setValue(this.filtrareCarti(this.categorieCurenta)[0]);
    });
  }
  filtrareCarti(categorie: string) {
    const cartiFiltrate = [...this.carti.filter(carte => carte.categoria === categorie)];
    return cartiFiltrate;
  }
  stergeCarte(id: number){
      this.stergeCarteId.emit(id);
  }
}

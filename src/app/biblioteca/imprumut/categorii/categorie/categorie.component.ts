import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css']
})
export class CategorieComponent implements OnInit {
  @Input() categorie;
  constructor() { }

  ngOnInit(): void {
    console.log(this.categorie.controls.nume);
  }

}

import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-categorii',
  templateUrl: './categorii.component.html',
  styleUrls: ['./categorii.component.css']
})
export class CategoriiComponent implements OnInit {
  @Input() categorii;
  constructor() { }

  ngOnInit(): void {
    console.log(this.categorii.controls.categorii.controls);
  }
  getCategorii(){
    return this.categorii.controls.categorii.controls;
  }

}

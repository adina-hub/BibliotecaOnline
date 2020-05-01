import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {BibliotecaService} from '../biblioteca.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  constructor(private bibliotecaService: BibliotecaService) { }

  ngOnInit(): void {
    this.contactForm = new FormGroup({
      subiect: new FormControl(''),
      mesaj: new FormControl('')
    });
  }
  trimite(){
    this.bibliotecaService.trimiteMesaj(this.contactForm.value);
    this.contactForm.reset();
  }


}

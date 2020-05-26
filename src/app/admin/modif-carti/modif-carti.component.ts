import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AuthService} from "../../auth/auth.service";
import {Router} from "@angular/router";
import {BibliotecaService} from "../../biblioteca/biblioteca.service";

@Component({
  selector: 'app-modif-carti',
  templateUrl: './modif-carti.component.html',
  styleUrls: ['./modif-carti.component.css']
})
export class ModifCartiComponent implements OnInit {
  bookForm: FormGroup;
  constructor(private bookService: BibliotecaService, private router:Router) { }

  ngOnInit(): void {
    this.bookForm = new FormGroup({
      isbn: new FormControl(''),
      titlu: new FormControl(''),
      autor: new FormControl(''),
      categoria: new FormControl('')
    });

  }

  addBook() {
    console.log(this.bookForm.value);
    this.bookService.trimiteMesajAdauga(this.bookForm.value);
    this.bookService.adauga(this.bookForm.value);
  }
}


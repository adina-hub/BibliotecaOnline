import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  displayMessage(input: string, nume: string, subiect: string){
    console.log('Nume: ' + nume + ' Subiect: ' + subiect + ' Mesaj: ' + input);
  }


}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HeaderComponent } from './header/header.component';
import { AcasaComponent } from './biblioteca/acasa/acasa.component';
import { ImprumutComponent } from './biblioteca/imprumut/imprumut.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CarteComponent } from './biblioteca/imprumut/carte/carte.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    AcasaComponent,
    ImprumutComponent,
    CarteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

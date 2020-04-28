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
import { CategorieComponent } from './biblioteca/imprumut/categorii/categorie/categorie.component';
import { CategoriiComponent } from './biblioteca/imprumut/categorii/categorii.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    AcasaComponent,
    ImprumutComponent,
    CategorieComponent,
    CategoriiComponent
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

import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ClientesModule } from './clientes/clientes.module';
import { HeaderModule } from './header/header/header.module';

import { RouterModule, Routes } from '@angular/router';
import { DirectivaComponent } from './directiva/directiva.component';
import { DirectivaModule } from './directiva/directiva.module';
import { ClientesComponent } from './clientes/clientes.component';
import {HttpClientModule} from '@angular/common/http';
import { FormComponent } from './clientes/form.component';
import localeES from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { ClientesService } from './clientes/clientes.service';

registerLocaleData(localeES, 'es');

const routes: Routes= [
  {path: '', redirectTo: '/clientes', pathMatch:'full'},
  {path: 'directivas', component:DirectivaComponent},
  {path: 'clientes', component:ClientesComponent},
  {path: 'clientes/form', component: FormComponent},
  {path: 'clientes/form/:id', component: FormComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    DirectivaComponent,
    
  ],
  imports: [
    BrowserModule,
    ClientesModule,
    HeaderModule,
    DirectivaModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
  ],
  //locale_id para cambiarr el idioma poder mostrar la fecha en español en la vista
  //el es es el localeES que hemos insertado arriba.
  providers: [ClientesService, {provide: LOCALE_ID, useValue: 'es'}],
  bootstrap: [AppComponent]
})
export class AppModule { }

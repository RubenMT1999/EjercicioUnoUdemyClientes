import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ClientesModule } from './clientes/clientes.module';
import { HeaderModule } from './header/header/header.module';

import { RouterModule, Routes } from '@angular/router';
import { DirectivaComponent } from './directiva/directiva.component';
import { DirectivaModule } from './directiva/directiva.module';
import { ClientesComponent } from './clientes/clientes.component';

const routes: Routes= [
  {path: '', redirectTo: '/clientes', pathMatch:'full'},
  {path: 'directivas', component:DirectivaComponent},
  {path: 'clientes', component:ClientesComponent}
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
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

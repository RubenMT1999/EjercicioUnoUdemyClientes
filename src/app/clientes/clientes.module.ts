import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import { ClientesComponent } from './clientes.component';


@NgModule({
  declarations: [
    ClientesComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports:[ClientesComponent]
})
export class ClientesModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import { ClientesComponent } from './clientes.component';
import { FormComponent } from './form.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ClientesComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
  ],
  exports:[ClientesComponent]
})
export class ClientesModule { }

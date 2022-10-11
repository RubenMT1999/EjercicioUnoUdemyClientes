import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './clientes.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { 

  routes: Routes = [
    {path: '',component: ClientesComponent },
    {path: '**', redirectTo: ''}
    
  ];

}

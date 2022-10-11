import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './clientes/clientes.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

   routes: Routes = [
    {path: '',
     loadChildren: () => import('./clientes/clientes.module').then(m => m.ClientesModule)
    }
  ];
 }

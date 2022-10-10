
import { Injectable } from '@angular/core';
import { clientes } from './clientes.json';
import { Cliente } from './cliente';
import {Observable,of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor() { }

  getClientes(): Observable<Cliente[]>{
    
    return of(clientes);

  }



}

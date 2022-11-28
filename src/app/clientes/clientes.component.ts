import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Cliente } from './cliente';
import { ClientesService } from './clientes.service';
import { clientes } from './clientes.json';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styles: []
})
export class ClientesComponent implements OnInit {

  clientes !: Cliente[];
  
  constructor(private clienteService: ClientesService) { }

  ngOnInit(): void {

    this.clienteService.getClientes().subscribe(
      (clientes) => {this.clientes = clientes}
    );
  }


  delete(cliente: Cliente): void{
    //esto es del sweetalert
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar al cliente ${cliente.nombre} ${cliente.apellido}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        this.clienteService.delete(cliente.id).subscribe(
          response => {
            //que no muestre el cliente que acabamos de eliminar
            this.clientes = this.clientes.filter(cli => cli !== cliente)
            Swal.fire('Cliente Eliminado!',
                      `Cliente ${cliente.nombre} eliminado con éxito.`,
                      'success')
          }
        )
        
      }
    })
  }




}

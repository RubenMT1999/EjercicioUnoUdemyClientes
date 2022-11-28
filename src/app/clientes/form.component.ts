import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClientesService } from './clientes.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  public cliente: Cliente = new Cliente();
  public titulo: String = "Crear Cliente";

  public errores: String[] | undefined;

  constructor(private clienteService: ClientesService,
              private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarCliente();
  }


  cargarCliente(): void{
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if(id){
        this.clienteService.getCliente(id).subscribe(cliente =>{
          this.cliente = cliente
        })
      }
    })
  }



   create(): void{
    this.clienteService.create(this.cliente).subscribe(cliente => {
        this.router.navigate(['/clientes'])
        Swal.fire('Nuevo Cliente', 'Cliente '+ cliente.nombre + ' creado con éxito','success')
      },
      //para obtener el error del backend del 400 bad request
      err => {
        this.errores = err.error.errors as String[];
      }
      
    );
  }


  
  update():void{
    //devolvemos en el backed un tipo map que contiene el cliente, accedemos a la propiedad cliente.
    this.clienteService.update(this.cliente)
    .subscribe(json => {
      this.router.navigate(['/clientes'])
      Swal.fire('Cliente Actualizado',`Cliente ${json.cliente.nombre} actualizado con éxito!`,'success')
    },
    //para obtener el error del backend del 400 bad request
    err => {
      this.errores = err.error.errors as String[];
    })
  }


 



}

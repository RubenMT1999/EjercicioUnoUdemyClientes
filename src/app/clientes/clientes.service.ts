
import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import {catchError, map, Observable, tap, throwError} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { clientes } from './clientes.json';
import { formatDate} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {


  private urlEndPoint:string = 'http://localhost:8080/api/clientes';

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient, private router: Router) { }

  getClientes(): Observable<Cliente[]>{
    //return of(clientes);

     return this.http.get(this.urlEndPoint).pipe(
      //tap sirve para ejecutar algo sin modificar los datos
      tap(response => {
        let clientes = response as Cliente[];
        clientes.forEach( cliente => {
          console.log(cliente.nombre);
        })
      }),
      map(res => {
        let clientes = res as Cliente[];

        //este es el return para el map de arriba.
        //devuelve la lista Cliente[] pero con el uppercase ya activo
        return clientes.map(cliente => {
          cliente.nombre = cliente.nombre.toUpperCase();
          // esto se hace asi aqui o en la vista: cliente.createAt = formatDate(cliente.createAt, 'fullDate','es');
          //este es el return para el map de abajo. Va a meter cada cliente
          // en la lista de Clientes pero con el nombre uppercase.
          return cliente;
        })

      }),
      //importante el orden de los tap. aqui trabajamos sobre el tipo Cliente[]
      //pues anteriormente hicimos el casteo.
      tap(response => {
          response.forEach( cliente => {
          console.log(cliente.nombre);
        })
      })
     );
     
    /* return this.http.get<Cliente[]>(this.urlEndPoint); */

  }


  create(cliente:Cliente) : Observable<Cliente>{
    //le pasamos la url, el body y el header. el tipo de return se 
    //puede hacer asi con el map o como en el update con el any
    return this.http.post(this.urlEndPoint,cliente,{headers: this.httpHeaders}).pipe(
      map((response: any) => response.cliente as Cliente),
      catchError(e => {

        //este status 400  es de la validacion del backend del bad request
        if(e.status==400){
          return throwError(() => e);
        }

        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje,e.error.error,'error');
        return throwError(() => e);
      })
    )
  }


  getCliente(id:number): Observable<Cliente>{
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/clientes']);
        Swal.fire(e.error.mensaje,e.error.error,'error');
        return throwError(() => e);
      })
    );
  }


  update(cliente:Cliente): Observable<any>{
    //hay que pasarle el parametro cliente, que es el que va a actualizar
    return this.http.put<any>(`${this.urlEndPoint}/${cliente.id}`, cliente, {headers: this.httpHeaders}).pipe(
      catchError(e => {

        if(e.status==400){
          return throwError(() => e);
        }

        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje,e.error.error,'error');
        return throwError(() => e);
      })
    );
  }


  delete(id: number): Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje,e.error.error,'error');
        return throwError(() => e);
      })
    )
  }


}

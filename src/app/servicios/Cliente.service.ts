import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Cliente } from '../utilitarios/modelos/Cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient) { }

  baseUrl = "https://epico.gob.ec/vehiculo/public/api/";

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  insertCliente(cliente: Cliente): Observable<Respuesta> {
    return this.http.post<Respuesta>(this.baseUrl+"cliente/", cliente, this.httpOptions);
  }

}

export interface Respuesta{
  codigo: string;
  mensaje: string;
  data: string;
  rows:number;
  // pages:number;
  // records:number;
  // page:number;
}

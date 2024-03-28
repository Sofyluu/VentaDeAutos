import { Injectable } from '@angular/core';
import { Vehiculo } from '../utilitarios/modelos/Vehiculo';
import { Observable, map } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {

  constructor(private http: HttpClient) { }

  baseUrl = "https://epico.gob.ec/vehiculo/public/api/";

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  //TODOS LOS VEHICULOS => GET vehiculos/
  //INSERT => POST vehiculo/
  //UPDATE => PUT vehiculo/:codigo
  //DELETE => DELETE vehiculo/:codigo
  //CONSULTA => GET vehiculo/:codigo

  getVehiculos(filtro?:string, rows?:number, page?:number):Observable<Respuesta>{
    let body = new HttpParams();
    body = filtro ? body.set('filtro', filtro) : body;
    body = rows ? body.set('rows', rows) : body;
    body = page ? body.set('page', page) : body;

    return this.http.get<Respuesta>(this.baseUrl+"vehiculos/", {params: body});

  }

  insertVehiculo(vehiculo: Vehiculo): Observable<Respuesta> {
    return this.http.post<Respuesta>(this.baseUrl+"vehiculo/", vehiculo, this.httpOptions);
  }

  getVehiculo(codigo:string){
    return this.http.get<Respuesta>(this.baseUrl+"vehiculo/"+codigo)
  }

  actualizarVehiculo(vehiculo: Vehiculo, codigo:string){
    return this.http.put<Respuesta>(this.baseUrl+"vehiculo/"+codigo, vehiculo, this.httpOptions)
  }

  eliminarVehiculo(codigo: string){
    return this.http.delete<Respuesta>(this.baseUrl+"vehiculo/"+codigo);
  }

  // addVehiculo(vehiculo: Vehiculo){
  //   this.listaVehiculos.push(vehiculo);
  // }

  private listaVehiculos: Array<Vehiculo> = [
    { "codigo": "A0001", "marca": "CHEVROLET", "modelo": "ONIX-5", "kilometraje": 50000, "precio": 17000, "foto": "https://www.chevrolet.com.ar/content/dam/chevrolet/mercosur/argentina/espanol/index/cars/2020-onix-plus-premier/01-images/colorizer/julio-23/3-summit-white.png?imwidth=960", "anio": 2024, "calificacion": 3 },
    { "codigo": "A0002", "marca": "KIA", "modelo": "BIO-3", "kilometraje": 50000, "precio": 17000, "foto": "https://di-uploads-pod17.dealerinspire.com/executivekia/uploads/2023/04/Sportage.png", "anio": 2024, "calificacion": 5 },
    { "codigo": "A0003", "marca": "CHERY", "modelo": "ARRIZO-5", "kilometraje": 50000, "precio": 17000, "foto": "https://automaxmotors.com.ec/wp-content/uploads/2021/10/chery-arrizo-5-768x551.png", "anio": 2024, "calificacion": 2 },
    { "codigo": "A0004", "marca": "TOYOTA", "modelo": "AGYA", "kilometraje": 50000, "precio": 17000, "foto": "https://www.toyota.com.ec//admin/sites/default/files/2023-08/toyota-agya-color-rojo.png", "anio": 2024, "calificacion": 5 },
    { "codigo": "A0005", "marca": "HIUNDAI", "modelo": "ONIX", "kilometraje": 50000, "precio": 17000, "foto": "https://www.hyundai.cl/content/uploads/ne-de-giw5ycz7zhh211-c5g-52910gi210-ext-frame-0000-1.png", "anio": 2024, "calificacion": 1 },
    { "codigo": "A0006", "marca": "HIUNDAI", "modelo": "ONIX", "kilometraje": 50000, "precio": 17000, "foto": "https://www.hyundai.cl/content/uploads/ne-de-giw5ycz7zhh211-c5g-52910gi210-ext-frame-0000-1.png", "anio": 2024, "calificacion": 1 },

  ];

}

export interface Respuesta{
  codigo: string;
  mensaje: string;
  data: Array<Vehiculo>|Vehiculo|any;
  rows:number;
  pages:number;
  records:number;
  page:number;
}

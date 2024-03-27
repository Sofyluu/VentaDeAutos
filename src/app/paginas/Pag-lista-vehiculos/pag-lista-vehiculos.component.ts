import { Component, Input, OnInit } from '@angular/core';
import { VehiculoService } from '../../servicios/Vehiculo.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Vehiculo } from '../../utilitarios/modelos/Vehiculo';
import Swal from 'sweetalert2';

@Component({
  selector: 'pag-lista-vehiculos',
  templateUrl: './pag-lista-vehiculos.component.html',
  styleUrl: './pag-lista-vehiculos.component.css'
})
export class PagListaVehiculosComponent implements OnInit {

  constructor(private vehiculoService: VehiculoService) { }

  public mostrarImagen = false;
  public listaVehiculos:Array<Vehiculo> = [];

  // private _filtro: string = "";
  public rows:number = 10;
  public page: number = 1;
  public pages:number = 0;
  public filtro:string = "";

  // get filtro(){
  //   return this._filtro
  // }

  // set filtro(filtro:string){
  //   this._filtro = filtro;
  //   // this.consultaVehiculos();
  // }

  @Input() valor:string = '';



  ngOnInit() {
    // this.consultaVehiculos();
    console.log('ingreso a ejecutarse')
    this.consultarVehiculo();
  }

  consultarVehiculo(){
    this.vehiculoService.getVehiculos(this.filtro, this.rows, this.page).subscribe(respuesta => {
      if(respuesta.codigo == '1'){
        this.listaVehiculos = respuesta.data;
        this.pages = respuesta.pages;
        this.paginar(respuesta.pages);
      }
    });
  }

  mostrar(){
    this.mostrarImagen = !this.mostrarImagen
  }

  // consultaVehiculos(){
  //   this.vehiculoService.getVehiculos(this.filtro).subscribe( data => {
  //     this.listaVehiculos = data;
  //   });
  // }

  recepcion(dato:number){
    console.log('Dato: ', dato)
  }

  cambiarPagina(pagina:number){
    this.page = pagina;
    this.consultarVehiculo()
  }

  listaPaginas:Array<number> = [];
  paginar(pages:number){
    this.listaPaginas = [];
    for(let i=1;i<=pages ;i++){
      this.listaPaginas.push(i)
    }
  }

  siguiente(){
    if(this.page < this.pages){
      this.page++;
      this.consultarVehiculo();
    }
  }

  atras(){
    if(this.page > 1){
      this.page--;
      this.consultarVehiculo();
    }
  }

  eliminar(codigo:string){
    // alert('Estas seguro que deseas eliminar este registro')
    Swal.fire({
      title: "Estas seguro que deseas eliminar este registro",
      showCancelButton: true,
      confirmButtonText: "Si",
      cancelButtonText: "No",
      icon: "question"
    }).then( (res)=>{
      if(res.isConfirmed){
        this.vehiculoService.eliminarVehiculo(codigo).subscribe(data =>{
          if(data.codigo == '1'){
            this.consultarVehiculo();
            Swal.fire({
              title:"Mensaje",
              text:"Vehiculo eliminado con exito",
              icon: "success",
            })
          }
        });
      }
    });
  }
}

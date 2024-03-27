import { Component, OnInit } from '@angular/core';
import { Vehiculo } from '../../utilitarios/modelos/Vehiculo';
import { VehiculoService } from '../../servicios/Vehiculo.service';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { validadorCalificacion, validadorCodigo } from '../../utilitarios/validadaciones/VehiculoValidacion';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-PagVehiculoRegistro',
  templateUrl: './PagVehiculoRegistro.component.html',
  styleUrls: ['./PagVehiculoRegistro.component.css']
})
export class PagVehiculoRegistroComponent implements OnInit {


  formulario: FormGroup;

  constructor(
    private vehiculoServicio: VehiculoService,
    private formBuilder: FormBuilder,
  ) {
    this.formulario = this.formBuilder.group({
      "codigo": ['', [Validators.required, validadorCodigo()]],
      "marca": ['', [Validators.required]],
      "modelo": ['', [Validators.required]],
      "anio":['', [Validators.required]],
      "kilometraje":['', [Validators.required]],
      "precio":['', [Validators.required]],
      "calificacion": ['', [Validators.required, validadorCalificacion()]],
      "foto": ['',],
    });
  }

  ngOnInit() {
  }

  guardar(){

    if(this.formulario.valid){
      this.vehiculoServicio.insertVehiculo({...this.formulario.value}).subscribe(
        respuesta => {
          if (respuesta.codigo == '1'){
          Swal.fire({
            title:"Mensaje",
            text:"GRABADO CON EXITO",
            icon: "success",
          })
            this.formulario.reset();
          } else{
            Swal.fire({
              icon: "error",
              title: "ERROR EN GRABADO"+respuesta.mensaje,
              text: "Something went wrong!",
              footer: '<a href="#">Why do I have this issue?</a>'
            });
          }
        },
        error =>
        {
        if(error.message == 'Http failure response for https://epico.gob.ec/vehiculo/public/api/vehiculo/: 400 Bad Request'){
          Swal.fire({
          icon: "error",
          title: "ERROR",
          text: "El codigo ingresado ya existe",
        });
        } else{
          Swal.fire({
          icon: "error",
          title: "Error en la solicitud: " + error.message,
          text: "Something went wrong!",
          footer: '<a href="#">Why do I have this issue?</a>'
        });
        }

      }
      );
    } else{
      Swal.fire({
      icon: "error",
      title: "ERROR",
      text: "FALTAN CAMPOS POR LLENAR",
    });
    }

  }

}



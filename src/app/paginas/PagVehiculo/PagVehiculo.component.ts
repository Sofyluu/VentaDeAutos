import { Component, OnInit } from '@angular/core';
import { Vehiculo } from '../../utilitarios/modelos/Vehiculo';
import { ActivatedRoute } from '@angular/router';
import { VehiculoService } from '../../servicios/Vehiculo.service';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { validadorCodigo } from '../../utilitarios/validadaciones/VehiculoValidacion';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-PagVehiculo',
  templateUrl: './PagVehiculo.component.html',
  styleUrls: ['./PagVehiculo.component.css']
})
export class PagVehiculoComponent implements OnInit {



  vehiculo?:Vehiculo;
  formulario: FormGroup;


  constructor(
    private activatedRoute: ActivatedRoute,
    private vehiculoService: VehiculoService,
    private formBuilder: FormBuilder,
  ) {
    this.formulario = this.formBuilder.group({
      "codigo": ['', [Validators.required, validadorCodigo()]],
      "marca": ['', [Validators.required]],
      "modelo": ['', [Validators.required]],
      "anio":['', [Validators.required]],
      "kilometraje":[],
      "precio": [],
      "calificacion": ['', [Validators.required]],
    });
    this.formulario.controls['codigo'].disable();
  }


  ngOnInit() {
    this.activatedRoute.params.subscribe( params => {
      this.vehiculoService.getVehiculo(params['codigo']).subscribe( data => {

        if(data.codigo == '1'){
          this.vehiculo = data.data;
          this.formulario.controls['codigo'].setValue(this.vehiculo?.codigo);
          this.formulario.controls['marca'].setValue(this.vehiculo?.marca);
          this.formulario.controls['modelo'].setValue(this.vehiculo?.modelo);
          this.formulario.controls['anio'].setValue(this.vehiculo?.anio);
          this.formulario.controls['calificacion'].setValue(this.vehiculo?.calificacion);
          this.formulario.controls['precio'].setValue(this.vehiculo?.precio);
          this.formulario.controls['kilometraje'].setValue(this.vehiculo?.kilometraje);

        }else{
          Swal.fire({
          icon: "error",
          title: "ERROR",
          text: "No se pudo cargar la informacion",
        });

        }


      })
      // this.vehiculo = this.vehiculoService.getVehiculo(params['codigo']);
    });
  }


  guardar(){
    if(this.formulario.valid){
      this.vehiculoService.actualizarVehiculo({...this.formulario.value}, this.formulario.controls['codigo'].value).subscribe(data =>{
        if(data.codigo == '1'){
          Swal.fire({
            title:"Mensaje",
            text:"Vehiculo actualizado con exito",
            icon: "success",
          })
        }
      });
    }else{
      Swal.fire({
      icon: "error",
      title: "Mensaje",
      text: "Faltan campos por llenar",
    });
    }

  }

  imprimir(){
    console.log('Formulario: ', this.formulario);
    let password = this.formulario.get('password');
    let nuevosValidadores = [Validators.required, Validators.email];
    if(password){
      password.setValidators(nuevosValidadores);
      password.updateValueAndValidity();
    }
  }

}

// export function passwordMatchValidator(){
//   return (control: FormGroup): ValidationErrors | null => {
//     const passwordControl = control.get('password');
//     const confirmPasswordControl = control.get('passwordConfirm');
//     if(!passwordControl || !confirmPasswordControl){
//       return null
//     }

//     if(passwordControl.value  !== confirmPasswordControl.value){
//       return {'passwordMismatch': true}
//     }

//     //si los validadores son iguales, la validacion pasa
//     return null
//   }
// }

// export function validarCedula():ValidatorFn{
//   return (control: AbstractControl): ValidationErrors | null => {
//     const value: string = control.value;

//     if(!value){
//       //si no hay valor la validacion pasa
//       return null
//     }

//     //patron para verificar si la cedula tiene 10 digitos y otros criterios segurn sea necesario
//     const cedulaPattern = /^\d{10}$/;

//     if(!cedulaPattern.test(value)){
//       return { 'cedulaInvalida': true };
//     }

//     return null
//   }

// }

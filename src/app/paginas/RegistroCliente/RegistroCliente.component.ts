import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClienteService } from '../../servicios/Cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-RegistroCliente',
  templateUrl: './RegistroCliente.component.html',
  styleUrls: ['./RegistroCliente.component.css']
})
export class RegistroClienteComponent implements OnInit {

  formulario: FormGroup;
  mostrarCamposAdicionales: boolean = false;

  constructor(
    private clienteService: ClienteService,
    private formBuilder: FormBuilder,
  ) {
    this.formulario = this.formBuilder.group({
      "nombre": ['', [Validators.required]],
      "apellido": ['', [Validators.required]],
      "email": ['',],
      "telefono": ['',],
    });
  }

  ngOnInit() {
  }

  toggleCamposAdicionales(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target !== null && typeof target.checked === 'boolean') {
      this.mostrarCamposAdicionales = target.checked;
    }
  }


  guardar(){
    // if(this.formulario.valid){
    //   alert('enviado'),
    //   console.log(this.formulario.value)
    // } else{
    //   alert('no'),
    //   console.log(this.formulario.value)

    // }

    if(this.formulario.valid){
      this.clienteService.insertCliente({...this.formulario.value}).subscribe(
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
        error => {
        Swal.fire({
          icon: "error",
          title: "Error en la solicitud: " + error.message,
          text: "Something went wrong!",
          footer: '<a href="#">Why do I have this issue?</a>'
        });
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

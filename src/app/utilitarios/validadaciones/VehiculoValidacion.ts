import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function validadorCodigo(): ValidatorFn{
  return (control: AbstractControl):ValidationErrors|null =>{
    const codigoV = /^A\d{4}$/;
    let value = control.value;
    if(codigoV.test(value)){
      return null;
    }
    return {'codigoValidate': true}
  }
}

export function validadorCalificacion(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const codigoC = /^[1-5]$/;
    let value = control.value;
    if (codigoC.test(value)) {
      return null;
    }
    return { 'codigoValidate': true };
  };
}





import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }

  static ConfirmedValidator(controlName:string, matchingControlName:string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if(matchingControl.errors && !matchingControl.errors.mustMatch) {
        return;
      }

      if(control.value !== matchingControl.value) {
        return matchingControl.setErrors({mustMatch: true});
      }
      else {
        return matchingControl.setErrors(null);
      }
    }
  }
}

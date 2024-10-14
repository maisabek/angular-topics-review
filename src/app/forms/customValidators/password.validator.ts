
import {ValidatorFn, FormGroup, AbstractControl} from '@angular/forms';

export function validatePassword(formGroup: FormGroup) {
    // لو عايزة اعمل على عنصر واحد
    // formGroup.controls.password.setErrors({wrongPassword:true})
    const password = formGroup.controls.password;
    const confirmPassword = formGroup.controls.confirmPassword;
    if (password.dirty && confirmPassword.dirty && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({wrongPassword: true});
    }
    return null;
 }

export function validatePass(control1: string, control2: string): ValidatorFn {
    return (formGroup: FormGroup) => {
    console.log('in password validator', formGroup);
    const password = formGroup.controls[control1];
    const confirmPassword = formGroup.controls[control2];
    if (password.dirty && confirmPassword.dirty && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({wrongPassword: true});
    }
    return null;
 };
 }



export function validatePass1(control1: string, control2: string): ValidatorFn {
  return (formGroup: AbstractControl): {[key: string]: any} | null => {
    console.log('in password validator', formGroup);
    const password = formGroup.get(control1);
    const confirmPassword = formGroup.get(control2);
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ wrongPassword: true });
      return { wrongPassword: true };
    }
    return null;
  };
}


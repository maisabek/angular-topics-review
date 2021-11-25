import { AbstractControl, ValidatorFn } from '@angular/forms';

// AbstractControl
// دا الكلاس الاساسى اللى طالع منة الفورم جروب والفورم كنترول والفورم اراى
export function validateName(control: AbstractControl) {
console.log('AbstractControl', control);
// مش عايز يدخل رقم
if (control.value.match(/[0-9]/g)){
    return {invalidName: true}
}
return null;
}

// ValidatorFn ==> فنكشن بترجع فنكشن
export function validate(nameRegex: RegExp): ValidatorFn {
    // المفروض يرجع اللى موجود فى الفنكشن دى
    // validateName()
return (control: AbstractControl) => {
    console.log('AbstractControl', control);
    // مش عايز يدخل رقم
    if (control.value.match(nameRegex)){
        return {invalidName: true}
    }
    return null
    }
}


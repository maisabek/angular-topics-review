import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import { validateName, validate } from './customValidators/name.validator';
import { validatePassword, validatePass } from './customValidators/password.validator';
import {usernameValidator} from './customValidators/async.validator';
@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent implements OnInit {
     // ______________________
    // FormBuilder
   // بدل ما اعمل
  // formGroup
  constructor(private fb: FormBuilder){
    this.initformControls();
    this.createForm();
  // بدل ما اعمل فورم جروب وفورم كنترول
    this.buildForm = this.fb.group({
    // '' ===> initial value
    fname: ['', [Validators.required, Validators.minLength(3)]],
    // min(3) لازم يدخل رقم 3 او اكتر مينفعش اقل
    lname: ['', [Validators.min(3)]],
    // pattern('.*com$') ===> لازم ينتهى بكلمة com فى الاخر
    email: ['', [Validators.email, Validators.pattern('.*com$')]],
    address: this.fb.group({
     dob: [],
     st: []
    })
  });
  // لو عايزة يدخل ارقام بس فى التكست فيلد حروف لا
    this.buildForm.valueChanges.subscribe(data => {
    if (isNaN(data.lname)) {
      this.buildForm.patchValue({
        lname: data.lname.replace(/[a-zA-z]/g, '')
      })
    } })
  }
  get Fname() {
    // بترجع كل حاجة عن ال
    // fname
    // هل هو فاليد ولا لا
    // touched ولا
    return this.buildForm.get('fname');
  }
  get Lname() {
    return this.buildForm.get('lname');
  }
  get email() {
    return this.buildForm.get('email');
  }
  name: any;
  buildForm: FormGroup;
  control = new FormControl();
  // FormGroup
  protofileForm = new FormGroup({
    fname: new FormControl('',[Validators.required,Validators.email]),
    lname: new FormControl(),
    address: new FormGroup({
      dob: new FormControl(),

      st: new FormControl()
    })
  });

  ngOnInit() {
    console.log(`form ${this.control}`);
    // valueChanges من نوع اوبزرفبول وبتراقب التغير اللى هيحصل
    this.control.valueChanges.subscribe(data => {
      console.log('data', data);
    });
    setTimeout(() => {
      // controlname هيحط الفليو جوة ال
      this.control.setValue('change color');
    }, 3000);
  }
  onsubmit() {
    console.log(this.protofileForm.get('fname'));
    }
  updateValue() {
     // setValue()لازم اعدلهم كلهم
    // patchValue()مش لازم كلهم
    this.protofileForm.patchValue({
      fname: 'mm',
      lname: 'kj',
      address: {
        dob: 'j'
      }
    })
  }
  submit() {
   console.log(this.buildForm.get('fname'));
   // ? ==> تايب اسكربت بتعمل اتشك ضد ال null value
  //  this.email?.disable()
    // لما يعمل صب ميت يعمل ديس ابل للايميل
  }

  // طريقة تانية لكتابة الكود وهنا مش محتاجة اعمل الفنكشن
  // get
  // عشان ال فاليدشن
  myform: FormGroup;
  fname: FormControl;
  lname: FormControl;
  password: FormControl;
  confirmPassword: FormControl;
  initformControls() {
     this.fname = new FormControl('', [Validators.required, validateName, validate(/[0-9]/g)]);
     this.lname = new FormControl('', {validators: [],
                                    asyncValidators: [usernameValidator()],
                                    updateOn: 'blur' // يعمل اتشك لما يعمل فوكس اوت
                                   });
     this.password = new FormControl('');
     this.confirmPassword = new FormControl('');
  }
  createForm() {
    this.myform = new FormGroup({
      fname: this.fname,
      lname: this.lname,
      pass: new FormGroup({
      password: this.password,
      confirmPassword: this.confirmPassword
      },validatePass('password', 'confirmPassword'))
    })
  }

}


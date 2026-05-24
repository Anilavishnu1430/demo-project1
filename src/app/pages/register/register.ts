import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  registerForm : FormGroup

  //Dependency Injection
  constructor (private fb:FormBuilder){
    this.registerForm=this.fb.group({
      username:["",[Validators.required,Validators.pattern('[a-zA-Z]*')]],
      email:["",[Validators.required,Validators.email]],
      password:["",[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
    })
  }

  register(){
    if(this.registerForm.valid){
      console.log(this.registerForm);
      alert("Register form submitted..")
    }
    else{
      alert("Invalid Form")
    }
  }
}

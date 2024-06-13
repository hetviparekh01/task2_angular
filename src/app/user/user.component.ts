import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  userForm:FormGroup;
  constructor (private formBuilder:FormBuilder){
    this.userForm=this.formBuilder.group({
      userId:['',Validators.required],
      username:['',Validators.required],
      email:['',Validators.required],
      addresses: this.formBuilder.array([this.createAddress()])
    })
  }
  get addressList() :FormArray{
    return this.userForm.get('addresses') as FormArray
  }
  createAddress() {
    return this.formBuilder.group({
      street: ['', Validators.compose([Validators.required])], 
      city: [null, Validators.compose([Validators.required])], 
      state: [null, Validators.compose([Validators.required])],
      zipCode: [null, Validators.compose([Validators.required, Validators.pattern(/^\d{10}$/)])]
    });
  }
  addAddress() {
    this.addressList.push(this.createAddress());
  }
  removeAddress(i:number) {
    this.addressList.removeAt(i);
  }
  submitForm(){
    if(this.userForm.valid){
      console.log(this.userForm.value);
    }else{
      alert("Error in filling the form!!")
    }
  }
  


}

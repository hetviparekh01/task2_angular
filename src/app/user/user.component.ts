import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
      addresses:this.formBuilder.array([])
    })
  }


  


}

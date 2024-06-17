import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent {

loginForm: FormGroup;

constructor(private formBuilder: FormBuilder,private dataservice:DataService){
  this.loginForm=this.formBuilder.group({
    userId:['',Validators.compose([Validators.required,Validators.pattern(/^\d{4}$/)])],
    password:['', Validators.compose([Validators.required])]
  })
}

userLogin(){
  this.dataservice.loginUser({
    userId:this.loginForm.value.userId,
    password:this.loginForm.value.password
  }).subscribe((response:any)=>{
    console.log("res",response);
    localStorage.setItem("accessToken",response.content.AccessToken)
  })
}

onSubmit() {
  if(this.loginForm.valid){
    console.log(this.loginForm.value);
    this.userLogin()
  }else{
    console.log(this.loginForm.errors);
  }
  }
}

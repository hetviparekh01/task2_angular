import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(private formBuilder: FormBuilder,private dataservice:DataService,private router:Router){
    this.signupForm=this.formBuilder.group({
      userId:['',Validators.compose([Validators.required,Validators.pattern(/^\d{4}$/)])],
      password:['', Validators.compose([Validators.required])]
    })
  }
  
  userSignup(){
    this.dataservice.signupUser({
      userId:this.signupForm.value.userId,
      password:this.signupForm.value.password
    }).subscribe((response:any)=>{
      if(response.status){
        // console.log("res",response);
        this.router.navigate(['login'])
      }else{
        // console.log(response);
        alert(response.content)
      }
    },
    (error)=>{
      alert(error.statusText)
      // console.log(error);
    })
  }
  
  onSubmit() {
    if(this.signupForm.valid){
      // console.log("In usre signup submit function");
      // console.log(this.signupForm.value); 
      this.userSignup()
     
    }else{
      // console.log(this.signupForm.errors);
      alert(this.signupForm.errors)
    }
    }
}

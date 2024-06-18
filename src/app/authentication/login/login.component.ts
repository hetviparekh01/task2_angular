import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private dataservice: DataService, private router: Router) {
    this.loginForm = this.formBuilder.group({
      userId: ['', Validators.compose([Validators.required, Validators.pattern(/^\d{4}$/)])],
      password: ['', Validators.compose([Validators.required])]
    })
  }

  userLogin() {
    this.dataservice.loginUser({
      userId: this.loginForm.value.userId,
      password: this.loginForm.value.password
    }).subscribe((response: any) => {
      if (response.status) {
        // console.log("res", response);
        localStorage.setItem("accessToken", response.content.AccessToken)
        // console.log(localStorage.getItem('accessToken'));
        this.router.navigate(['user'])
      } else {
        alert(response.content)
        // console.log(response.content);
      }
    },
      (err) => {
        alert(err.statusText)
        // console.log(err);
      })
  }

  onSubmit() {
    if (this.loginForm.valid) {
      // console.log(this.loginForm.value);
      this.userLogin()

    } else {
      // console.log(this.loginForm.errors);
    }
  }
}

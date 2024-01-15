import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { sharedService } from '../sharedServices/shared-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder, private sharedService: sharedService) {
    this.loginForm = this.formBuilder.group({
      userName: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }


  onSubmit() {
    if (this.loginForm.valid) {
      this.sharedService.login(this.loginForm.value).subscribe((res) => {
        console.log('res: ', res);
        Router
        this.router.navigate(['/home/homePage'])
      })
    }
  }
}

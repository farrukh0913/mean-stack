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
  errorMessage:string=''

  constructor(private router: Router, private formBuilder: FormBuilder, private sharedService: sharedService) {
    this.loginForm = this.formBuilder.group({
      userName: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }


  onSubmit() {
    if (this.loginForm.valid) {
      this.sharedService.login(this.loginForm.value).subscribe(
        (res: any) => {
          console.log('Success response: ', res);
          this.router.navigate(['/home/homePage']);
        },
        (error: any) => {
          console.error('Error response: ', error);
          this.errorMessage = error.error.message
    
        }
      );
      this.loginForm.reset()

      
    }
  }
}

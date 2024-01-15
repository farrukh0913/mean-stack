import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { sharedService } from '../sharedServices/shared-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder , private sharedService:sharedService) {
    this.loginForm = this.formBuilder.group({
      userName: ['', [Validators.required]],
      password: ['', Validators.required],
    });
   }

  
  onSubmit() {
    if (this.loginForm.valid) {
      this.sharedService.login(this.loginForm.value).subscribe((res)=>{
        console.log('res: ', res);

      })
    }
  }
}

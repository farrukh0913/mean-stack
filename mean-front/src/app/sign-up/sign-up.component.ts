import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { sharedService } from '../sharedServices/shared-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  registrationForm: FormGroup;
  usedEmail:boolean = false;

  constructor(private router: Router, private formBuilder: FormBuilder, private sharedService: sharedService) {
    this.registrationForm = this.formBuilder.group({
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  onSubmit() {
    if (this.registrationForm.valid) {
      this.sharedService.SignUp(this.registrationForm.value).subscribe(
        (res: any) => {
          console.log('Success response: ', res);
          this.router.navigate(['/login']);
        },
        (error: any) => {
          console.error('Error response: ', error);
          if(error.error.error === "User with this email already exists"){
            this.usedEmail = true
            console.log('this.usedEmail: ', this.usedEmail);
          }
          // Handle the error here (e.g., display an error message to the user)
        }
      );
      
      console.log('this.registrationForm.value: ', this.registrationForm.value);

    }
  }
}

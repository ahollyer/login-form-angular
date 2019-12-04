import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  showLoginSuccess: boolean = false;

  constructor( private fb: FormBuilder,
               private userService: UserService ) { }

  ngOnInit() { }

  loginForm = this.fb.group({
    /*
    NOTE: Angular's built-in email validator is based on the WHATWG spec:
    https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address

    If problems are reported, a more permissive validator may be necessary. See
    https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
    */
    email: ['', [ Validators.required, Validators.email ]],
    password: ['', [ Validators.required, Validators.minLength(8) ]],
  })

  /** Getter for easy access to form fields in the template */
  get f() {
    return this.loginForm.controls;
  }


  /** Sends login credentials to user service */
  onSubmit(): void {
    if(!this.loginForm.valid) return;

    this.userService.login(this.loginForm.value).subscribe(
      res => {
        console.log("Got response", res)
        // TODO: Handle login success
        this.showLoginSuccess = true;
      },
      err => {
        // TODO: Handle error
        console.error("Got error", err)
      }
    )
  }

}

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginFormComponent } from './login-form.component';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginFormComponent ],
      imports: [ ReactiveFormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*********************************************************************
              Tests to make sure form initializes correctly
  **********************************************************************/
  it('should create the login form', () => {
    expect(component).toBeTruthy();
  });

  it('should indicate invalid form on init', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('should indicate invalid email on form init', () => {
    let email = component.loginForm.controls['email'];
    expect(email.valid).toBeFalsy();
  });

  it('should indicate invalid password on form init', () => {
    let password = component.loginForm.controls['password'];
    expect(password.valid).toBeFalsy();
  });

  /*********************************************************************
                        Tests for email validation
  **********************************************************************/
  it('should throw a required validation error if no email provided', () => {
    let errors = {};
    let email = component.loginForm.controls['email'];
    errors = email.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('should throw an email validation error for sdfkjwi', () => {
    let errors = {};
    let email = component.loginForm.controls['email'];
    email.setValue('sdfkjwi')
    errors = email.errors || {};
    expect(errors['email']).toBeTruthy();
  });

  it('should throw an email validation error for @gmail.com', () => {
    let errors = {};
    let email = component.loginForm.controls['email'];
    email.setValue('@gmail.com')
    errors = email.errors || {};
    expect(errors['email']).toBeTruthy();
  });

  it('should throw an email validation error for bob@', () => {
    let errors = {};
    let email = component.loginForm.controls['email'];
    email.setValue('bob@')
    errors = email.errors || {};
    expect(errors['email']).toBeTruthy();
  });

  it('should throw an email validation error for bob@gmail.', () => {
    let errors = {};
    let email = component.loginForm.controls['email'];
    email.setValue('bob@gmail.')
    errors = email.errors || {};
    expect(errors['email']).toBeTruthy();
  });

  it('should NOT throw an email validation error for bob@gmail.com', () => {
    let errors = {};
    let email = component.loginForm.controls['email'];
    email.setValue('bob@gmail.com')
    errors = email.errors || {};
    expect(errors['email']).toBeFalsy();
  });

  it('should NOT throw an email validation error for janeDoe1@x.io', () => {
    let errors = {};
    let email = component.loginForm.controls['email'];
    email.setValue('janeDoe1@x.io')
    errors = email.errors || {};
    expect(errors['email']).toBeFalsy();
  });

  /*********************************************************************
                      Tests for password validation
  **********************************************************************/
  it('should throw a required validation error if no password provided', () => {
    let errors = {};
    let password = component.loginForm.controls['password'];
    errors = password.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('should throw a minlength validation error for pass123', () => {
    let errors = {};
    let password = component.loginForm.controls['password'];
    password.setValue('pass123')
    errors = password.errors || {};
    expect(errors['minlength']).toBeTruthy();
  });

  it('should NOT throw a minlength validation error for P@ss1234', () => {
    let errors = {};
    let password = component.loginForm.controls['password'];
    password.setValue('P@ss1234')
    errors = password.errors || {};
    expect(errors['minlength']).toBeFalsy();
  });

  /*********************************************************************
              Tests to make sure the form submits correctly
  **********************************************************************/
  it('should prevent user from submitting invalid form', () => {
    // Set invalid form values
    expect(component.loginForm.valid).toBeFalsy();
    component.loginForm.controls['email'].setValue("NOTEMAIL");
    component.loginForm.controls['password'].setValue("123");
    expect(component.loginForm.valid).toBeFalsy();

    // Click the login button
    fixture.detectChanges();
    spyOn(component, 'onSubmit')
    let btn = fixture.debugElement.query(By.css('button')).nativeElement;
    btn.click()
    expect(component.onSubmit).toHaveBeenCalledTimes(0);
  });


  it('should let user submit valid form', () => {
    // Set valid form values
    expect(component.loginForm.valid).toBeFalsy();
    component.loginForm.controls['email'].setValue("test@test.com");
    component.loginForm.controls['password'].setValue("123456789");
    expect(component.loginForm.valid).toBeTruthy();

    // Click the login button
    fixture.detectChanges();
    spyOn(component, 'onSubmit')
    let btn = fixture.debugElement.query(By.css('button')).nativeElement;
    btn.click()
    expect(component.onSubmit).toHaveBeenCalledTimes(1);
  });

  it('Should show success message upon login', () => {
    expect(component.loginForm.valid).toBeFalsy();
    component.loginForm.controls['email'].setValue("test@test.com");
    component.loginForm.controls['password'].setValue("123456789");
    expect(component.loginForm.valid).toBeTruthy();

    // Trigger the login function
    component.onSubmit();

    // Make sure success message shows
    fixture.detectChanges();
    let msg = fixture.debugElement.query(By.css('.success')).nativeElement;
    expect(msg.textContent).toContain("Success");
  });
});

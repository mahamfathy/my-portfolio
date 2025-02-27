import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ValidationService } from '../shared/services/validation.service';
import { SharedModule } from '../shared/shared.module';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    SharedModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.sass',
})
export class RegisterComponent implements OnInit {
  private title!: string;
  form!: FormGroup;

  get userNameRequiredError(): boolean {
    return this.form.get('userName')!.hasError('required');
  }
  constructor(private formBuilder: FormBuilder) {}
  ngOnInit(): void {
    this.initFormModels();
  }
  private initFormModels(): void {
    this.form = this.formBuilder.group(
      {
        userName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
        mobile: ['', Validators.required],
      },
      { validators: ValidationService.mustMatch('password', 'confirmPassword') }
    );
    // this.form = new FormGroup(
    //   {
    //     userName: this.userName,
    //     email: new FormControl<string>({ value: '', disabled: false }),
    //     password: new FormControl('', {
    //       validators: [Validators.required, Validators.minLength(8)],
    //     }),
    //     mobile: new FormControl('', Validators.required),
    //     confirmPassword: new FormControl('', {
    //       validators: [Validators.required, Validators.minLength(8)],
    //     }),
    //   },
    //   { validators: ValidationService.mustMatch('password', 'confirmPassword') }
    // );
  }
  reset(): void {
    this.title = 'maha';
    this.form.get('userName')!.reset({ value: this.title, disabled: false });
  }
}

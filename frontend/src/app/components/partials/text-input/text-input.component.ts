import { Component, input } from '@angular/core';
import { AbstractControl, FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputContainerComponent } from '../input-container/input-container.component';
import { InputValidationComponent } from '../input-validation/input-validation.component';

@Component({
  selector: 'text-input',
  imports: [InputContainerComponent, InputValidationComponent, ReactiveFormsModule],
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.css'
})
export class TextInputComponent {
  control = input.required<AbstractControl>();
  showErrorsWhen = input<boolean>(true);
  label = input.required<string>();
  type = input<'text' | 'password' | 'email'>('text');

  get formControl() {
    return this.control() as FormControl;
  }
}

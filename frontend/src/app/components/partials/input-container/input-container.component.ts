import { NgStyle } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'input-container',
  imports: [NgStyle],
  templateUrl: './input-container.component.html',
  styleUrl: './input-container.component.css'
})
export class InputContainerComponent {
  label = input<string>();
  bgColor = input<string>('white');
}

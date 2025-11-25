import { NgStyle } from '@angular/common';
import { Component, input, output } from '@angular/core';


@Component({
  selector: 'default-button',
  imports: [NgStyle],
  templateUrl: './default-button.component.html',
  styleUrl: './default-button.component.css'
})
export class DefaultButtonComponent {
  type = input<'submit' | 'button'>('submit');
  text = input<string>('submit');
  bgColor = input<string>('#e72929');
  color = input<string>('white');
  fontSizeRem = input<number>(1.3);
  widthRem = input<number>(12);
  onClick = output<void>();

}

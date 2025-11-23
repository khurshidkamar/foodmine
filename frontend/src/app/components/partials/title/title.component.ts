import { NgStyle } from '@angular/common';
import { Component, input } from '@angular/core';


@Component({
  selector: 'app-title',
  imports: [NgStyle],
  templateUrl: './title.component.html',
  styleUrl: './title.component.css'
})
export class TitleComponent {
  title = input<string>();
  margin = input<string>('1 rem 0 1rem 0.2rem');
  fontSize = input<string>('1.7rem');

}

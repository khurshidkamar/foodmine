import { Component, input } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent {
  visible = input<boolean>(false);
  notFoundMessage = input<string>('Nothing Found!');
  resetLinkText = input<string>('Reset');
  resetLinkRoute = input<string>('/');
}

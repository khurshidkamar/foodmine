import { Component, input } from '@angular/core';
import { Order } from '../../../shared/models/order';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'order-items-list',
  imports: [RouterModule, CommonModule],
  templateUrl: './order-items-list.component.html',
  styleUrl: './order-items-list.component.css'
})
export class OrderItemsListComponent {

  order = input.required<Order>();

}

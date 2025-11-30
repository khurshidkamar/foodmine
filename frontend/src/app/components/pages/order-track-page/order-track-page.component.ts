import { Component } from '@angular/core';
import { Order } from '../../../shared/models/order';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../../services/order.service';
import { OrderItemsListComponent } from '../../partials/order-items-list/order-items-list.component';
import { CommonModule } from '@angular/common';
import { TitleComponent } from '../../partials/title/title.component';
import { MapComponent } from '../../partials/map/map.component';

@Component({
  selector: 'app-order-track-page',
  imports: [OrderItemsListComponent, CommonModule, TitleComponent, MapComponent],
  templateUrl: './order-track-page.component.html',
  styleUrl: './order-track-page.component.css'
})

export class OrderTrackPageComponent {
  order!: Order;
  constructor(activatedRoute: ActivatedRoute,
    orderService: OrderService) {
    const params = activatedRoute.snapshot.params;
    if (!params.orderId) return;
    orderService.trackOrderById(params.orderId).subscribe(order => {
      this.order = order;
    })
  }

}

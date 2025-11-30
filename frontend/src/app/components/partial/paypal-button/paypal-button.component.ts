import { Component, ElementRef, input, OnInit, viewChild } from '@angular/core';
import { Order } from '../../../shared/models/order';
import { OrderService } from '../../../services/order.service';
import { CartService } from '../../../services/cart.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

//window.paypal
declare var paypal: any;
@Component({
  selector: 'paypal-button',
  imports: [],
  templateUrl: './paypal-button.component.html',
  styleUrl: './paypal-button.component.css'
})
export class PaypalButtonComponent implements OnInit {

  order = input.required<Order>();
  paypalElement = viewChild.required<ElementRef>('paypal');
  constructor(
    private orderService: OrderService,
    private cartService: CartService,
    private router: Router,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    const self = this;
    paypal
      .Buttons({
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  currency_code: 'CAD',
                  value: self.order().totalPrice,
                },
              },
            ],
          });
        },
        onApprove: async (data: any, actions: any) => {
          const payment = await actions.order.capture();
          this.order().paymentId = payment.id;
          self.orderService.pay(this.order()).subscribe(
            {
              next: (orderId) => {
                this.cartService.clearCart();
                this.router.navigateByUrl('/track/' + orderId);
                this.toastrService.success(
                  'Payment Saved Successfully',
                  'Success'
                );
              },
              error: (error) => {
                this.toastrService.error('Payment Save Failed', 'Error');
              }
            }
          );
        },

        onError: (err: any) => {
          this.toastrService.error('Payment Failed', 'Error');
          console.log(err);
        },
      })
      .render(this.paypalElement().nativeElement);

  }

}

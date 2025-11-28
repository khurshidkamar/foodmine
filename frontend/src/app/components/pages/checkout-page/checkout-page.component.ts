import { Component, OnInit } from '@angular/core';
import { Order } from '../../../shared/models/order';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartService } from '../../../services/cart.service';
import { UserService } from '../../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { TitleComponent } from '../../partials/title/title.component';
import { TextInputComponent } from '../../partials/text-input/text-input.component';
import { OrderItemsListComponent } from '../../partials/order-items-list/order-items-list.component';
import { MapComponent } from '../../partials/map/map.component';

@Component({
  selector: 'app-checkout-page',
  imports: [TitleComponent, ReactiveFormsModule, TextInputComponent, OrderItemsListComponent, MapComponent],
  templateUrl: './checkout-page.component.html',
  styleUrl: './checkout-page.component.css'
})
export class CheckoutPageComponent implements OnInit {
  order: Order = new Order();
  checkoutForm!: FormGroup;
  constructor(cartService: CartService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastrService: ToastrService) {
    const cart = cartService.getCart();
    this.order.items = cart.items;
    this.order.totalPrice = cart.totalPrice;
  }

  ngOnInit() {
    let { name, address } = this.userService.currentUser;
    this.checkoutForm = this.formBuilder.group({
      name: [name, Validators.required],
      address: [address, Validators.required]
    });
  }
  get fc() {
    return this.checkoutForm.controls;
  }

  createOrder() {
    if (this.checkoutForm.invalid) {
      this.toastrService.warning('Please fill the inputs', 'Invalid inputs');
      return;
    }

    this.order.name = this.fc.name.value;
    this.order.address = this.fc.address.value;

    console.log(this.order);
  }
}

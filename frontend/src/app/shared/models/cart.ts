import { CartItem } from "./cartitems";
export class Cart {
    items: CartItem[] = []; //new cart
    totalPrice: number = 0;
    totalCount: number = 0;
}
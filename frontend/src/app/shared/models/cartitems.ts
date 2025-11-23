import { Food } from "./foods";

export class CartItem {

    constructor(public food: Food) {
        this.price = this.food.price;
    }
    price: number;
    quantity: number = 1;

}
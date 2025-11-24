import { Component, OnInit } from '@angular/core';
import { Food } from '../../../shared/models/foods';
import { FoodService } from '../../../services/food.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SearchComponent } from '../../partials/search/search.component';
import { TagsComponent } from '../../partials/tags/tags.component';
import { NotFoundComponent } from "../../partials/not-found/not-found.component";
import { Observable } from 'rxjs';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, RatingModule, FormsModule, CommonModule, SearchComponent, TagsComponent, NotFoundComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  foods: Food[] = [];
  constructor(private foodService: FoodService, activatedRoute: ActivatedRoute) {
    let foodsObservable: Observable<Food[]>
    activatedRoute.params.subscribe((params) => {
      if (params.searchTerm)
        foodsObservable = this.foodService.getAllFoodsBySearchTerm(params.searchTerm);
      else if (params.tag)
        foodsObservable = this.foodService.getAllFoodByTag(params.tag);
      else
        foodsObservable = foodService.getAll();
      foodsObservable.subscribe((serverFoods) => {
        this.foods = serverFoods;
      })
    })

  }
  ngOnInit(): void {

  }
}

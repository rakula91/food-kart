import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item-listing',
  templateUrl: './item-listing.component.html',
  styleUrls: ['./item-listing.component.scss']
})
export class ItemListingComponent implements OnInit {

  public favourites: Array<any> = [];
  public categories: Array<any> = [];
  public recipes: Array<any> = [];
  public filteredItems: Array<any> = [];
  public totalCartItems: Array<any> = [];

  constructor(private dashboardService: DashboardService,
    private router: Router) { }

  ngOnInit() {
    this.totalCartItems = this.dashboardService.getCartItems();
    this.dashboardService.getDashboardListing('food.php', '').subscribe(
      data => {
        this.filteredItems = data.recipes;
        this.recipes = data.recipes;
        this.categories = data.categories;
        this.processData();
      },
      error => { }
    );
  }

  processData() {
    this.recipes.forEach(item => {
      let cartItem = this.totalCartItems.find(x => {
        return x.name == item.name;
      });
      item.count = cartItem ? cartItem.count : 0;
      if (item.isFavourite) this.favourites.push(item);
    });
  }

  filter(category) {
    this.filteredItems = [];
    this.recipes.forEach(item => {
      if (item.category == category) this.filteredItems.push(item);
    });
  }

  viewDetails(item) {
    this.dashboardService.saveItem(item);
    this.router.navigate(['dashboard/details']);
  }

  addToCart(item) {
    let cartItem = this.totalCartItems.find(x => {
      return x.name == item.name;
    })
    if (cartItem) {
      cartItem.count++;
    } else {
      item.count = 1;
      this.totalCartItems.push(item);
    }
    this.dashboardService.updateCartItems(this.totalCartItems);
  }

}

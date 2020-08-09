import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';

@Component({
    selector: 'app-item-details',
    templateUrl: './item-details.component.html',
    styleUrls: ['./item-details.component.scss']
})
export class ItemDetailsComponent implements OnInit {
    public item: any;
    public totalCartItems: Array<any> = [];

    constructor(private dashboardService: DashboardService) { }

    ngOnInit() {
        this.totalCartItems = this.dashboardService.getCartItems();
        this.item = this.dashboardService.getItem();
    }

    removeFromCart() {
        if (this.item.count > 0) {
            this.item.count--;
            let cartItem = this.totalCartItems.find(x => {
                return x.name == this.item.name;
            });
            cartItem.count--;
            this.dashboardService.updateCartItems(this.totalCartItems);
        }
    }

    addToCart() {
        let cartItem = this.totalCartItems.find(x => {
            return x.name == this.item.name;
        })
        if (cartItem) {
            cartItem.count++;
        } else {
            this.item.count = 1;
            this.totalCartItems.push(this.item);
        }
        this.dashboardService.updateCartItems(this.totalCartItems);
    }

}

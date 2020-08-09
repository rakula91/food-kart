import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ItemListingComponent } from './item-listing/item-listing.component';
import { ItemDetailsComponent } from './item-details/item-details.component';

const routes: Routes = [
    { path: '', redirectTo: 'all' },
    { path: 'all', component: ItemListingComponent },
    { path: 'details', component: ItemDetailsComponent }
];

@NgModule({
    declarations: [ItemListingComponent, ItemDetailsComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ]
})
export class DashboardModule { }

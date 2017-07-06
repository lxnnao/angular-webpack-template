import { Component, Input } from '@angular/core';

@Component({
    selector: 'coredata-category-sales',
    templateUrl: './sales.component.html'
})

export class CoreDataCategorySalesComponent {
    @Input('salesVO') salesVO: any;
};

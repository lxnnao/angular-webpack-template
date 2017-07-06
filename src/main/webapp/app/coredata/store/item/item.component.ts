import { Component, Input } from '@angular/core';
@Component({
    selector: 'coredata-store-item',
    templateUrl: './item.component.html'
})
export class CoreDataStoreItemComponent {
    @Input('itemList') itemList;
};

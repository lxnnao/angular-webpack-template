import { Component, Input } from '@angular/core';

@Component({
    selector: 'coredata-category-online',
    templateUrl: './online.component.html'
})

export class CoreDataCategoryOnlineComponent {
    @Input('onlineVO') onlineVO: any = {};
};

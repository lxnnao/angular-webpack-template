import { Component, Input } from '@angular/core';

@Component({
    selector: 'coredata-category-return',
    templateUrl: './return.component.html'
})

export class CoreDataCategoryReturnComponent {
    @Input('returnOverallVO') returnOverallVO: any = {};
};

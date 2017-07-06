import { Component, Input } from '@angular/core';

@Component({
    selector: 'coredata-category-newold',
    templateUrl: './newold.component.html'
})

export class CoreDataCategoryNewoldComponent {
    @Input('newoldSPUVO') newoldSPUVO:any = {};
    @Input('newoldPVVO') newoldPVVO:any = {};
    @Input('newoldAccountVO') newoldAccountVO:any = {};
};

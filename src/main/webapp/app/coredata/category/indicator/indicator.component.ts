import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'coredata-category-indicator',
    templateUrl: './indicator.component.html'
})

export class CoreDataCategoryIndicatorComponent {

    @Input('timeItem') timeItem: any = {};
    // 流水指标
    @Input('indicator') indicator: number = 0;
    @Input('itemList') itemList: Array<any> = [];
    // @Output('indicatorChange') indicatorChangeEvent = new EventEmitter<any>();
};

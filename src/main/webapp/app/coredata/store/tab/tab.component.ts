import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'coredata-store-tab',
    templateUrl: './tab.component.html'
})

export class CoreDataStoreTabComponent {

    @Input('timeItem') timeItem: any = {};
    // 流水指标
    @Input('indicator') indicator: number = 0;
    @Input('itemList') itemList: Array<any> = [];
    
};

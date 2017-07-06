import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'coredata-hotgoods-tab',
    templateUrl: './tab.component.html'
})

export class CoreDataHotGoodsTabComponent {
    @Input('itemList') itemList: Array<any> = [];

};

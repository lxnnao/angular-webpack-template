import { Component, Input, Output, EventEmitter } from '@angular/core';
@Component({
    selector: 'bottom-tab',
    templateUrl: './bottom-tab.component.html'
})
export class BottomTabComponent {
    @Input('tabs') itemList: Array<any> = [];
    @Input('model') model: any;
    @Output('modelChange') modelChange = new EventEmitter<any>();

    // tab切换时触发
    tabChange(item) {
        if (this.model.value !== item.value) {
            this.model = item;
            this.modelChange.emit(item);
        }
    }
};

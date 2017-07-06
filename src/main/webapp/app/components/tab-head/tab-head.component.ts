import { Component, Input, Output, EventEmitter } from '@angular/core'

@Component({
    selector: 'tab-head',
    templateUrl: './tab-head.component.html'
})

export class TabHeadComponent {
    @Input('tabs') itemList: Array<any> = [];
    @Input('model') model: any;
    @Output('modelChange') modelChange = new EventEmitter<any>();

    ngOnInit() {
        if (!this.model && this.itemList.length) {
            this.model = this.itemList[0] && this.itemList[0].value;
        }
    }

    // tab切换时触发
    tabChange(item) {
        if (this.model != item.value) {
            this.model = item.value;
            this.modelChange.emit(item.value);
        }
    }
}

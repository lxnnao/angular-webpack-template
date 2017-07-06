import { Component, Input } from '@angular/core';
@Component({
    selector: 'data-box',
    templateUrl: './data-box.component.html'
})
export class DataBoxComponent {
    @Input('itemList') itemList;
    @Input('header') header;
};

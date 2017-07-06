import { Component, Input } from '@angular/core';
@Component({
    selector: 'data-box-simple',
    templateUrl: './data-box-simple.component.html'
})
export class DataBoxSimpleComponent {
    @Input('itemList') itemList;
};

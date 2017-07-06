import { Component, Input } from '@angular/core';
@Component({
    selector: 'coredata-kpi-tab',
    templateUrl: './tab.component.html'
})
export class CoreDataKpiTabComponent {
    @Input('itemList') itemList;
};

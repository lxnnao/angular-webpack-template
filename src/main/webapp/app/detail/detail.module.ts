import { NgModule } from '@angular/core';
import { SharkModule } from '@ntesmail/shark-angular2';
import { RouterModule } from '@angular/router';
/***********components***************/
import { DetailComponent } from './detail.component';

const routes = [
    { path: '', component: DetailComponent },
];

@NgModule({
    imports: [
        SharkModule, RouterModule.forChild(routes)
    ],
    declarations: [DetailComponent]
})
export class DetailModule { }

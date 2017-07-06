import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
//components
import { BottomTabComponent } from './bottom-tab/bottom-tab.component';
import { TabHeadComponent } from './tab-head/tab-head.component';
import { LoadingComponent } from './loading/loading.component';


const components = [
    BottomTabComponent,
    TabHeadComponent,
    LoadingComponent
];

@NgModule({
    imports: [
        SharedModule
    ],
    declarations: [...components],
    exports: [...components]
})
export class ComponentsModule { }

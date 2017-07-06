/***********common module***************/
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
/***********common directive***************/
import { EchartsDirective } from './directives/echarts.directive';
/***********common pipe***************/
import { NumericalPipe } from './pipes/numerical.pipe';
import { RatePipe } from './pipes/rate.pipe';
/***********common service***************/
import { Common } from './service/common.service';
import { Ajax } from './service/ajax.service';
import { Notice } from './service/notice.service';


let directives: Array<any> = [EchartsDirective];
let pipes: Array<any> = [NumericalPipe, RatePipe];
let modules: Array<any> = [CommonModule, FormsModule, HttpModule];
let services: Array<any> = [Common, Ajax, Notice];

@NgModule({
    imports: [CommonModule],
    declarations: [...directives, ...pipes],
    providers: [],
    exports: [...modules, ...directives, ...pipes]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: services
        };
    }
}

export { Common, Ajax, Notice };
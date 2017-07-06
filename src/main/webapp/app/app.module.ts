import { APP_BASE_HREF } from '@angular/common';
//NgModules
import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from "@angular/platform-browser";
import { SharedModule } from './shared/shared.module';
import { CoreDataModule } from './coredata/coredata.module';
// TODO: move this to coredata
import { DetailModule } from './detail/detail.module'
//router auth
import { RouterModule } from "@angular/router";
//components
import { AppComponent } from './app.component';

// 定义常量 路由
const appRoutes: any = [
    {
        path: '',
        redirectTo: '/coredata',
        pathMatch: 'full'
    }
];

const components = [
    AppComponent
];

@NgModule({
    imports: [BrowserModule, SharedModule.forRoot(), RouterModule.forRoot(appRoutes, { useHash: true }), CoreDataModule, DetailModule],
    providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
    ],
    declarations: [...components],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(public appRef: ApplicationRef) { }
}
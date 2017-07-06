import { APP_BASE_HREF } from '@angular/common';
//NgModules
import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from "@angular/platform-browser";
import { SharedModule } from './shared/shared.module';
//router auth
import { RouterModule } from "@angular/router";
//components
import { AppComponent } from './app.component';

// 定义常量 路由
const appRoutes: any = [
    {
        path: '',
        redirectTo: '/',
        pathMatch: 'full'
    }
];

const components = [
    AppComponent
];

@NgModule({
    imports: [BrowserModule, SharedModule.forRoot(), RouterModule.forRoot(appRoutes, { useHash: true })],
    providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
    ],
    declarations: [...components],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(public appRef: ApplicationRef) { }
}
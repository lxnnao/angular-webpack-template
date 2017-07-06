import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../components/components.module';
/***********common components***************/
import { DataBoxComponent } from './components/data-box/data-box.component'
import { DataBoxSimpleComponent } from './components/data-box-simple/data-box-simple.component'
/***********components***************/
import { DetailUserComponent } from './user/user.component'
import { DetailCriticalComponent } from './critical/critical.component'
import { DetailFundflowComponent } from './fundflow/fundflow.component'
import { DetailNewuserComponent } from './newuser/newuser.component'

const components = [
    DataBoxComponent, DataBoxSimpleComponent,
    DetailUserComponent, DetailCriticalComponent, DetailFundflowComponent, DetailNewuserComponent
];

const routes = [
    { path: 'detail-user', component: DetailUserComponent },
    { path: 'detail-critical', component: DetailCriticalComponent },
    { path: 'detail-fundflow', component: DetailFundflowComponent },
    { path: 'detail-newuser', component: DetailNewuserComponent },
];

@NgModule({
    imports: [
        SharedModule, RouterModule.forChild(routes), ComponentsModule
    ],
    declarations: [...components]
})
export class DetailModule { }

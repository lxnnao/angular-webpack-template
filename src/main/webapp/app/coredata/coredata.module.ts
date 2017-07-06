import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../components/components.module';
/***********components***************/
// KPI
import { CoreDataComponent } from './coredata.component';
import { CoreDataKpiComponent } from './kpi/kpi.component';
import { CoreDataKpiTabComponent } from './kpi/tab/tab.component';
// 日销售
import { CoreDataSaleComponent } from './sale/sale.component';
// 类目
import { CoreDataCategoryComponent } from './category/category.component';
import { CoreDataCategorySalesComponent } from './category/sales/sales.component';
import { CoreDataCategoryOnlineComponent } from './category/online/online.component';
import { CoreDataCategoryNewoldComponent } from './category/newold/newold.component';
import { CoreDataCategoryIndicatorComponent } from './category/indicator/indicator.component';
import { CoreDataCategoryReturnComponent } from './category/return/return.component';
// 库存
import { CoreDataStoreComponent } from "./store/store.component";
import { CoreDataStoreItemComponent } from "./store/item/item.component";
import { CoreDataStoreTabComponent } from "./store/tab/tab.component";

//爆品
import { CoreDataHotGoodsComponent } from "./hotgoods/hotgoods.component";
import { CoreDataHotGoodsTabComponent } from "./hotgoods/tab/tab.component";

const components = [
    CoreDataComponent,
    CoreDataKpiComponent, CoreDataKpiTabComponent,
    CoreDataSaleComponent,
    CoreDataCategoryComponent, CoreDataCategorySalesComponent, CoreDataCategoryOnlineComponent, CoreDataCategoryNewoldComponent, CoreDataCategoryIndicatorComponent, CoreDataCategoryReturnComponent,
    CoreDataStoreComponent, CoreDataStoreItemComponent, CoreDataStoreTabComponent,
    CoreDataHotGoodsComponent,CoreDataHotGoodsTabComponent
];

const routes = [
    { path: 'coredata', component: CoreDataComponent },
];

@NgModule({
    imports: [
        SharedModule, RouterModule.forChild(routes), ComponentsModule
    ],
    declarations: [...components]
})
export class CoreDataModule { }

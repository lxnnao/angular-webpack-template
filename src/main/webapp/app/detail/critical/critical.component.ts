import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ajax } from '../../shared/shared.module';
import { AjaxUrl } from '../../config';
import { AppHost } from '../../../tool/apphost';

@Component({
    selector: 'detail-critical',
    templateUrl: './critical.component.html'
})

export class DetailCriticalComponent {
    data: any = {};

    constructor(
        private route: ActivatedRoute,
        private ajax: Ajax
    ) { 
        AppHost.ready(() => {
            AppHost.setTitle('关键指标详情');
        });
    }

    ngOnInit() {
        this.route.params.subscribe((o) => {
            var timeType = parseInt(o.timeType)
            this.getData(timeType);
        })
    }

    getData(timeType) {
        this.ajax.postByJson(AjaxUrl.getcriticalDetails, { timeType: timeType || 1 }).then((data) => {
            this.data.accessVO = [
                {
                    title: '访问 UV',
                    count: data.accessVO.accessUV.count,
                    rate: data.accessVO.accessUV.rate,
                    flag: data.accessVO.accessUVFlag
                }, {
                    title: '转化率',
                    countRate: true,
                    count: data.accessVO.changePro.count,
                    rate: data.accessVO.changePro.rate,
                    flag: data.accessVO.changeProFlag
                }
            ];
            this.data.payVOpayVO = [
                {
                    title: '支付用户',
                    count: data.payVO.payUid.count,
                    rate: data.payVO.payUid.rate,
                    flag: data.payVO.payUidFlag
                }, {
                    title: 'ARPU',
                    count: data.payVO.arpu.count,
                    rate: data.payVO.arpu.rate,
                    flag: data.payVO.arpuFlag
                }
            ];
            this.data.orderVO = [
                {
                    title: '订单数',
                    count: data.orderVO.order.count,
                    rate: data.orderVO.order.rate,
                    flag: data.orderVO.orderFlag
                }, {
                    title: '订单 ARPU',
                    count: data.orderVO.orderARPU.count,
                    rate: data.orderVO.orderARPU.rate,
                    flag: data.orderVO.orderARPUFlag
                }
            ];
            this.data.appVO = [
                {
                    title: 'APP 用户占比',
                    countRate: true,
                    count: data.appVO.appUserPro.count,
                    rate: data.appVO.appUserPro.rate,
                    flag: data.appVO.appUserProFlag
                }, {
                    title: 'APP 流水占比',
                    countRate: true,
                    count: data.appVO.appAccountPro.count,
                    rate: data.appVO.appAccountPro.rate,
                    flag: data.appVO.appAccountProFlag
                }
            ];
        });
    }
}
import { Component } from '@angular/core';
import { Ajax } from '../../shared/shared.module';
import { AjaxUrl } from '../../config';
import { ActivatedRoute } from '@angular/router';
import { AppHost } from '../../../tool/apphost';

@Component({
    selector: 'detail-user',
    templateUrl: './user.component.html'
})

export class DetailUserComponent {
    data: any = {};
    constructor(
        private route: ActivatedRoute,
        private ajax: Ajax
    ) {
        AppHost.ready(() => {
            AppHost.setTitle('用户数据详情');
        });
    }

    ngOnInit() {
        this.route.params.subscribe((o) => {
            var timeType = parseInt(o.timeType)
            this.getData(timeType);
        })
    }

    getData(timeType) {
        this.ajax.postByJson(AjaxUrl.getuserDetails, { timeType: timeType || 1 }).then((data) => {
            this.data.monthRegisterAndPayVO = [
                {
                    title: '月新注册用户',
                    count: data.monthRegisterAndPayVO.registerUid.count,
                    rate: data.monthRegisterAndPayVO.registerUid.rate
                }, {
                    title: '月支付人数',
                    count: data.monthRegisterAndPayVO.payUid.count,
                    rate: data.monthRegisterAndPayVO.payUid.rate
                }
            ];
            this.data.activeAndActivationVO = [
                {
                    title: '月活跃用户',
                    count: data.activeAndActivationVO.activeUid.count,
                    rate: data.activeAndActivationVO.activeUid.rate
                }, {
                    title: '月app新增激活数',
                    count: data.activeAndActivationVO.activationUid.count,
                    rate: data.activeAndActivationVO.activationUid.rate
                }
            ];
            this.data.acmlRegisterAndPayVO = [
                {
                    title: '累计注册用户',
                    count: data.acmlRegisterAndPayVO.registerUid.count,
                    rate: data.acmlRegisterAndPayVO.registerUid.rate
                }, {
                    title: '累计支付用户',
                    count: data.acmlRegisterAndPayVO.payUid.count,
                    rate: data.acmlRegisterAndPayVO.payUid.rate
                }
            ];
            this.data.repurchaseVO = [
                {
                    title: '累计复购率',
                    countRate: true,
                    count: data.repurchaseVO.repurchasePro.count,
                    rate: data.repurchaseVO.repurchasePro.rate
                }, {
                    title: '累计5+次占比',
                    countRate: true,
                    count: data.repurchaseVO.repurchase5pPro.count,
                    rate: data.repurchaseVO.repurchase5pPro.rate
                }
            ];
        });
    }
}
import { Component } from '@angular/core';
import { Ajax } from '../../shared/shared.module';
import { AjaxUrl } from '../../config';
import { ActivatedRoute } from '@angular/router';
import { AppHost } from '../../../tool/apphost';

@Component({
    selector: 'detail-newuser',
    templateUrl: './newuser.component.html'
})

export class DetailNewuserComponent {
    data: any = {};
    constructor(
        private route: ActivatedRoute,
        private ajax: Ajax
    ) {
        AppHost.ready(() => {
            AppHost.setTitle('新消详情');
        });
    }

    ngOnInit() {
        this.route.params.subscribe((o) => {
            var timeType = parseInt(o.timeType)
            this.getData(timeType);
        })
    }

    getData(timeType) {
        this.ajax.postByJson(AjaxUrl.getnewuserDetails, { timeType: timeType || 1 }).then((data) => {
            this.data.dayUserVO = [
                {
                    title: '日新消用户',
                    count: data.dayUserVO.newuUid.count,
                    rate: data.dayUserVO.newuUid.rate
                }, {
                    title: '日新消 ARPU',
                    count: data.dayUserVO.newuARPU.count,
                    rate: data.dayUserVO.newuARPU.rate
                }
            ];
            this.data.dayAccountVO = [
                {
                    title: '日新消流水',
                    count: data.dayAccountVO.newuAccount.count,
                    rate: data.dayAccountVO.newuAccount.rate
                }, {
                    title: '日新消流水占比',
                    countRate: true,
                    count: data.dayAccountVO.newuAccountPro.count,
                    rate: data.dayAccountVO.newuAccountPro.rate
                }
            ];
            this.data.monthUserVO = [
                {
                    title: '月新消用户',
                    count: data.monthUserVO.newuUid.count,
                    rate: data.monthUserVO.newuUid.rate
                }, {
                    title: '月新消 ARPU',
                    count: data.monthUserVO.newuARPU.count,
                    rate: data.monthUserVO.newuARPU.rate
                }
            ];
            this.data.monthAccountVO = [
                {
                    title: '月新消流水',
                    count: data.monthAccountVO.newuAccount.count,
                    rate: data.monthAccountVO.newuAccount.rate
                }, {
                    title: '月新消流水占比',
                    countRate: true,
                    count: data.monthAccountVO.newuAccountPro.count,
                    rate: data.monthAccountVO.newuAccountPro.rate
                }
            ];
        });
    }
}
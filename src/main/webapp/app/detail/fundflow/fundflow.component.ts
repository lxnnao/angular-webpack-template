import { Component } from '@angular/core';
import { Ajax } from '../../shared/shared.module';
import { AjaxUrl } from '../../config';
import { ActivatedRoute } from '@angular/router';
import { AppHost } from '../../../tool/apphost';

@Component({
    selector: 'detail-fundflow',
    templateUrl: './fundflow.component.html'
})

export class DetailFundflowComponent {
    data: any = {};

    constructor(
        private route: ActivatedRoute,
        private ajax: Ajax
    ) {
        AppHost.ready(() => {
            AppHost.setTitle('流水指标详情');
        });
    }

    ngOnInit() {
        this.route.params.subscribe((o) => {
            var timeType = parseInt(o.timeType)
            this.getData(timeType);
        })
    }

    getData(timeType) {
        this.ajax.postByJson(AjaxUrl.getfundflowDetails, { timeType: timeType || 1 }).then((data) => {
            this.data.yesterdayVOTotal = {
                title: '昨日全站流水',
                total: data.yesterdayVO.total
            }
            this.data.thisMonthVOTotal = {
                title: '本月全站流水',
                total: data.thisMonthVO.total
            }
            this.data.thisQuarterVOTotal = {
                title: '本季全站流水',
                total: data.thisQuarterVO.total
            }
            this.data.thisYearVOTotal = {
                title: '本年全站流水',
                total: data.thisYearVO.total
            }

            this.data.yesterdayVO = [
                {
                    title: '主站',
                    count: data.yesterdayVO.details.yx.count,
                    rate: data.yesterdayVO.details.yx.rate
                }, {
                    title: '考拉',
                    count: data.yesterdayVO.details.kaola.count,
                    rate: data.yesterdayVO.details.kaola.rate
                }, {
                    title: 'toB',
                    count: data.yesterdayVO.details.tob.count,
                    rate: data.yesterdayVO.details.tob.rate
                }, {
                    title: '天猫/京东',
                    count: data.yesterdayVO.details.tmjd.count,
                    rate: data.yesterdayVO.details.tmjd.rate
                }, 
            ];
            this.data.thisMonthVO = [
                {
                    title: '主站',
                    count: data.thisMonthVO.details.yx.count,
                    rate: data.thisMonthVO.details.yx.rate
                }, {
                    title: '考拉',
                    count: data.thisMonthVO.details.kaola.count,
                    rate: data.thisMonthVO.details.kaola.rate
                }, {
                    title: 'toB',
                    count: data.thisMonthVO.details.tob.count,
                    rate: data.thisMonthVO.details.tob.rate
                }, {
                    title: '天猫/京东',
                    count: data.thisMonthVO.details.tmjd.count,
                    rate: data.thisMonthVO.details.tmjd.rate
                }, 
            ];
            this.data.thisQuarterVO = [
                {
                    title: '主站',
                    count: data.thisQuarterVO.details.yx.count,
                    rate: data.thisQuarterVO.details.yx.rate
                }, {
                    title: '考拉',
                    count: data.thisQuarterVO.details.kaola.count,
                    rate: data.thisQuarterVO.details.kaola.rate
                }, {
                    title: 'toB',
                    count: data.thisQuarterVO.details.tob.count,
                    rate: data.thisQuarterVO.details.tob.rate
                }, {
                    title: '天猫/京东',
                    count: data.thisQuarterVO.details.tmjd.count,
                    rate: data.thisQuarterVO.details.tmjd.rate
                }, {
                    title: '志趣（非严选渠道）',
                    count: data.thisQuarterVO.details.zhiqu.count,
                    rate: data.thisQuarterVO.details.zhiqu.rate
                }, {
                    title: '数码（非严选渠道）',
                    count: data.thisQuarterVO.details.digital.count,
                    rate: data.thisQuarterVO.details.digital.rate
                },
            ];
            this.data.thisYearVO = [
                {
                    title: '主站',
                    count: data.thisYearVO.details.yx.count,
                    rate: data.thisYearVO.details.yx.rate
                }, {
                    title: '考拉',
                    count: data.thisYearVO.details.kaola.count,
                    rate: data.thisYearVO.details.kaola.rate
                }, {
                    title: 'toB',
                    count: data.thisYearVO.details.tob.count,
                    rate: data.thisYearVO.details.tob.rate
                }, {
                    title: '天猫/京东',
                    count: data.thisYearVO.details.tmjd.count,
                    rate: data.thisYearVO.details.tmjd.rate
                }, {
                    title: '志趣（非严选渠道）',
                    count: data.thisYearVO.details.zhiqu.count,
                    rate: data.thisYearVO.details.zhiqu.rate
                }, {
                    title: '数码（非严选渠道）',
                    count: data.thisYearVO.details.digital.count,
                    rate: data.thisYearVO.details.digital.rate
                }, 
            ];
        });
    }
}
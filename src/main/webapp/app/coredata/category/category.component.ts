import { Component, ViewChild } from '@angular/core';
import { Ajax } from '../../shared/shared.module';
import { AjaxUrl } from '../../config';
import { Notice } from '../../shared/shared.module';

@Component({
    selector: 'coredata-category',
    templateUrl: './category.component.html'
})
export class CoreDataCategoryComponent {
    indicator: number = 1;
    indicatorTabs: Array<any> = [
        {
            name: '流水指标',
            value: 1
        },
        {
            name: '转化指标',
            value: 2
        },
        {
            name: '新品指标',
            value: 3
        }
    ];
    subscription: any
    // 选中的时间区域
    timeItem: any = {
        name: '今日',
        value: 1
    };
    // 可选的时间区域
    timeConsts: Array<any> = [
        {
            name: '今日',
            value: 1
        },
        {
            name: '昨日',
            value: 2
        },
        {
            name: '本月',
            value: 3
        }
    ];

    data: any = {};

    constructor(
        private ajax: Ajax,
        private notice: Notice
    ) {
        this.getOverallData(this.timeItem.value);
        this.getTableList();
        this.subscription = this.notice.observable.subscribe(
            n => {
                if (n.type === 'refresh' && n.activeIndex === 2) {
                    this.resetData(true)
                    this.getOverallData(this.timeItem.value);
                    this.getTableList();
                }
            }
        );
    }

    resetData(all:any) {
        if(all) {
            return this.data = {}
        }
        this.data.FundflowList = null;
        this.data.ChangeList = null;
        this.data.NewGoodsList = null;
    }
    // 时间区域发生变化
    timeItemChange(e) {
        if (e && e.value) {
            this.resetData(false);
            this.getOverallData(e.value);
            this.getTableList();
        }
    }

    // 获取类目KPI总况
    getOverallData(timeType) {
        this.ajax.postByJson(AjaxUrl.getCategoryKPIOverall, { timeType: timeType }).then((data) => {
            this.data.overall = data;
        });
    }

    // 指标类型发生变化
    indicatorChange(v) {
        // this.getTableList();
    }

    // 获取类目指标列表
    getTableList() {
        this.getFundflowIndicator();
        this.getChangeIndicator();
        this.getNewGoodsIndicator();
    }

    // 获取流水指标
    getFundflowIndicator() {
        this.ajax.postByJson(AjaxUrl.getCategoryKPIFundflowIndicator, { timeType: this.timeItem.value }).then((data) => {
            this.data.FundflowList = data && data.indicatorVOList;
        });
    }

    // 获取转化指标
    getChangeIndicator() {
        this.ajax.postByJson(AjaxUrl.getCategoryKPIChangeIndicator, { timeType: this.timeItem.value }).then((data) => {
            this.data.ChangeList = data && data.indicatorVOList;
        });
    }

    // 获取新品指标
    getNewGoodsIndicator() {
        this.ajax.postByJson(AjaxUrl.getCategoryKPINewGoodsIndicator, { timeType: this.timeItem.value }).then((data) => {
            this.data.NewGoodsList = data && data.indicatorVOList;
        });
    }

};

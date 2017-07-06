import { Component } from '@angular/core';
import { Ajax } from '../../shared/shared.module';
import { AjaxUrl } from '../../config';
import { Notice } from '../../shared/shared.module';

@Component({
    selector: 'coredata-sale',
    templateUrl: './sale.component.html'
})
export class CoreDataSaleComponent {
    subscription: any
    //数据
    chartOption1: any
    chartOption2: any
    constructor(
        private ajax: Ajax,
        private notice: Notice
    ) {
        this.getData('sales_paysucc_allu_dayaclmaccount_allt-HOUR');
        this.getData('sales_paysucc_allu_account_allt-HOUR');
        this.subscription = this.notice.observable.subscribe(
            n => {
                if (n.type === 'refresh' && n.activeIndex === 1) {
                    this.getData('sales_paysucc_allu_dayaclmaccount_allt-HOUR');
                    this.getData('sales_paysucc_allu_account_allt-HOUR');
                }
            }
        );
    }

    ngOnDestroy() {
        this.subscription && this.subscription.unsubscribe();
    }
    
    getData(countItem) {
        let lastWeekStart = Date.today().addDay(-7);
        let lastWeekEnd = Date.today().addDay(-7);
        lastWeekEnd.setHours(23);
        lastWeekEnd.setMinutes(59);
        lastWeekEnd.setSeconds(59);
        let yesterdayStart = Date.today().addDay(-1);
        let yesterdayEnd = Date.today().addDay(-1);
        yesterdayEnd.setHours(23);
        yesterdayEnd.setMinutes(59);
        yesterdayEnd.setSeconds(59);
        var condition = [{//上周时段流水
            dimens: ['STAT_SITE'],
            dimenIds: [2],
            countItem: `${countItem}`,
            startDate: lastWeekStart.getTime(),
            endDate: lastWeekEnd.getTime(),
            dateSpan: 'HOUR'
        }, {//昨日时段流水
            dimens: ['STAT_SITE'],
            dimenIds: [2],
            countItem: `${countItem}`,
            startDate: yesterdayStart.getTime(),
            endDate: yesterdayEnd.getTime(),
            dateSpan: 'HOUR'
        }, {//今日时段流水
            dimens: ['STAT_SITE'],
            dimenIds: [2],
            countItem: `${countItem}`,
            startDate: Date.today().getTime(),
            endDate: Date.now(),
            dateSpan: 'HOUR'
        }];
        this.ajax.postByJson(AjaxUrl.realtimeAnalysis, { conditions: condition }).then((data) => {
            //x轴
            let dates = [];
            let start = condition[1].startDate;
            let end = condition[1].endDate;
            dates.push('00时');
            do {
                let hour = new Date(start).addHour(1).Format('HH');
                if (hour === '00') {
                    hour = '24';
                }
                dates.push(hour + '时');
                start = new Date(start).addHour(1).getTime();
            } while (start <= end);
            let lastWeekValues = [0, ...data[0].values];
            let yesterdayValues = [0, ...data[1].values];
            let todayValues = [0, ...data[2].values];
            let textcolor = 'rgba(255, 255, 255, 0.85)';
            let lineColors = ['#54656f', '#009688', '#2196f3'];
            var chartOption = {
                title: {
                    text: '',
                    x: 2,
                    y: 2,
                    textStyle: {
                        color: textcolor,
                        fontSize: 12,
                    }
                },
                tooltip: {
                    trigger: 'axis'
                },
                grid: {
                    top: 40,
                    bottom: 40,
                    left: 15,
                    right: 15,
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: dates,
                    axisLine: {
                        lineStyle: {
                            color: textcolor
                        }
                    }
                },
                yAxis: {
                    type: 'value',
                    splitLine: {
                        show: true,
                        lineStyle: {
                            type: 'dashed',
                            color: 'rgba(255, 255, 255, 0.30)'
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            color: textcolor
                        }
                    }
                },
                legend: {
                    data: [{
                        name: '上周',
                        textStyle: {
                            color: lineColors[0]
                        }
                    }, {
                        name: '昨日',
                        textStyle: {
                            color: lineColors[1]
                        }
                    }, {
                        name: '今日',
                        textStyle: {
                            color: lineColors[2]
                        }
                    }],
                    left: 'center',
                    bottom: 10
                },
                series: [{
                    name: '上周',
                    type: 'line',
                    data: lastWeekValues,
                    symbol: 'circle',
                    itemStyle: {
                        normal: {
                            color: lineColors[0]
                        }
                    }
                }, {
                    name: '昨日',
                    type: 'line',
                    data: yesterdayValues,
                    symbol: 'roundRect',
                    itemStyle: {
                        normal: {
                            color: lineColors[1]
                        }
                    }
                }, {
                    name: '今日',
                    type: 'line',
                    data: todayValues,
                    symbol: 'triangle',
                    itemStyle: {
                        normal: {
                            color: lineColors[2]
                        }
                    }
                }]
            };
            if (countItem === 'sales_paysucc_allu_dayaclmaccount_allt-HOUR') {
                chartOption.title.text = '日累计流水环比和同比趋势';
                this.chartOption1 = chartOption;
            }
            else if (countItem === 'sales_paysucc_allu_account_allt-HOUR') {
                chartOption.title.text = '日分段流水环比和同比趋势';
                this.chartOption2 = chartOption;
            }
        });
    }
};

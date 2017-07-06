import { Component, ViewChild, Input } from '@angular/core';
import { Ajax } from '../../shared/shared.module';
import { AppConfig } from '../../config';
import { Notice } from '../../shared/shared.module';
import { AppHost } from '../../../tool/apphost';

@Component({
    selector: 'coredata-kpi',
    templateUrl: './kpi.component.html'
})
export class CoreDataKpiComponent {
    subscription: any
    @ViewChild('broadcast') broadcast;
    storeKey = 'broadcast-status';
    // 选中的时间区域
    timeItem: any = {
        name: '今日',
        value: 1
    };
    // 可选的时间区域
    timeConsts = [{
        name: '今日',
        value: 1
    }, {
        name: '昨日',
        value: 2
    }];
    //跳转列表
    hrefList;
    //数据
    data: any = {};
    constructor(
        private ajax: Ajax,
        private notice: Notice
    ) {
        this.subscription = this.notice.observable.subscribe(
            n => {
                if (n.type === 'refresh' && n.activeIndex === 0) {
                    this.getData();
                }
            }
        );
    }

    ngOnDestroy() {
        this.subscription && this.subscription.unsubscribe();
    }

    ngAfterViewInit() {
        this.setHrefList();
        this.getBroadcastMessage();
        this.getData();
    }

    // 时间区域发生变化
    timeItemChange(e) {
        if (e && e.value) {
            this.setHrefList();
            this.getData();
        }
    }

    ngOnChanges(v) {
        if (v.refresh && v.refresh.currentValue.activeIndex === 0) {
            //点击刷新按钮
            this.getData();
        }
    }

    setHrefList() {
        this.hrefList = {
            tab0: window.location.origin + window.location.pathname + '#/detail-fundflow;timeType=' + this.timeItem.value,
            tab1: window.location.origin + window.location.pathname + '#/detail-critical;timeType=' + this.timeItem.value,
            tab2: window.location.origin + window.location.pathname + '#/detail-newuser;timeType=' + this.timeItem.value,
            tab3: window.location.origin + window.location.pathname + '#/detail-user;timeType=' + this.timeItem.value
        }
    }

    getData() {
        this.ajax.postByJson(AppConfig.contextPath + '/xhr/overallKPI/overall.do', { timeType: this.timeItem.value }).then((data) => {
            this.data.overallVO = [
                {
                    title: '日流水',
                    count: data.overallVO.acmlAccount.count,
                    rate: data.overallVO.acmlAccount.rate
                },{
                    title: '日完成率',
                    countRate: true,
                    count: data.overallVO.rate
                }
            ];
            this.data.fundflowOverallVO = [
                {
                    title: '本月流水',
                    count: data.fundflowOverallVO.thisMonthFundFlow.count,
                    rate: data.fundflowOverallVO.thisMonthFundFlow.rate
                },
                {
                    title: '月阶段完成率',
                    countRate: true,
                    count:data.fundflowOverallVO.phaseCplRate
                }
            ];
            this.data.criticalOverallVO = [
                {
                    title: '支付用户',
                    count: data.criticalOverallVO.payUid.count,
                    rate: data.criticalOverallVO.payUid.rate
                }, {
                    title: '访问UV',
                    count: data.criticalOverallVO.accessUV.count,
                    rate: data.criticalOverallVO.accessUV.rate
                }
            ];
            this.data.newUserOverallVO = [
                {
                    title: '新消用户',
                    count: data.newUserOverallVO.newUid.count,
                    rate: data.newUserOverallVO.newUid.rate
                }, {
                    title: '新消ARPU',
                    count: data.newUserOverallVO.newARPU.count,
                    rate: data.newUserOverallVO.newARPU.rate
                }
            ];
            this.data.userOverallVO = [
                {
                    title: '月支付用户',
                    count: data.userOverallVO.payUid.count,
                    rate: data.userOverallVO.payUid.rate
                }, {
                    title: '月活跃用户',
                    count: data.userOverallVO.activeUid.count,
                    rate: data.userOverallVO.activeUid.rate
                }
            ];
        });
    }

    getBroadcastMessage() {
        this.ajax.postByJson(AppConfig.contextPath + '/xhr/broadcast/todayMessage.do').then((data) => {
            let broadcastContentHtml = this.broadcast.nativeElement.querySelector('.m-broadcast-content-html');
            broadcastContentHtml.innerHTML = data.content;
            if (localStorage.getItem(this.storeKey) !== 'close') {
                this.toggleTabs();
            }
        });
    }

    toggleTabs() {
        var broadcastContent = this.broadcast.nativeElement.querySelector('.m-broadcast-content');
        var broadcastContentHtml = this.broadcast.nativeElement.querySelector('.m-broadcast-content-html');
        var triangle = this.broadcast.nativeElement.querySelector('.triangle');
        if (broadcastContent.getBoundingClientRect().height == 0) {
            broadcastContent.style.height = broadcastContentHtml.getBoundingClientRect().height + 'px';
            triangle.classList.add('triangle-down')
            triangle.classList.remove('triangle-right');
            localStorage.setItem(this.storeKey, 'open');
        }
        else {
            broadcastContent.style.height = 0;
            triangle.classList.add('triangle-right');
            triangle.classList.remove('triangle-down');
            localStorage.setItem(this.storeKey, 'close');
        }
    }
    
    openUrl(url) {
        AppHost.open(url);
    }
};

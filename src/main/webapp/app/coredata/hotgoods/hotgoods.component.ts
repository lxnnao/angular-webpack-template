import {
    Component,
    ViewChild
} from '@angular/core';
import {
    Ajax
} from '../../shared/shared.module';
import {
    AjaxUrl
} from '../../config';
import {
    Notice
} from '../../shared/shared.module';
@Component({
    selector: 'coredata-hotgoods',
    templateUrl: './hotgoods.component.html'
})

export class CoreDataHotGoodsComponent {

    constructor(private ajax: Ajax, private notice: Notice) {
        this.getData()
        this.getTableList()
        this.subscription = this.notice.observable.subscribe(
            n => {
                if (n.type === 'refresh' && n.activeIndex === 4) {
                    this.resetData(true);
                    this.getData();
                    this.getTableList()
                }
            }
        );
    }

    public subscription:any
    public data: any = {}

    public timeItem: any = {
        name: '今日',
        value: 1
    }

    public timeConsts: Array < any > = [{
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
    ]

    // 时间区域发生变化
    public timeItemChange(e) {
        if (e && e.value) {
            this.resetData(false);
            this.getData();
            this.getTableList();
        }
    }

    private getTableList() {
        this.ajax.postByJson(AjaxUrl.getHotgoodsList, {
            timeType: this.timeItem.value
        }).then(
            data => {
                this.data.itemList = data && data.rankItemVOList
            }
        )
    }
    private getData() {
        this.ajax.postByJson(AjaxUrl.getHotgoodsOverall, {
            timeType: this.timeItem.value
        }).then(data => {
            this.data.overallVO = data && data.overallVO
        })
    }

    private resetData(all:any) {
        if(all) {
            return this.data = {}
        }
        this.data.itemList = null;
    }
    
}
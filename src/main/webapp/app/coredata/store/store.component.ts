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
    selector: 'coredata-store',
    templateUrl: './store.component.html'
})
export class CoreDataStoreComponent {

    constructor(private ajax: Ajax, private notice: Notice) {
        this.getData()
        this.getTableList()
        this.subscription = this.notice.observable.subscribe(
            n => {
                if (n.type === 'refresh' && n.activeIndex === 3) {
                    this.resetData(true);
                    this.getData();
                    this.getTableList()
                }
            }
        );
    }

    public subscription: any
    public data: any = {}

    public timeItem: any = {
        name: '今日',
        value: 1
    }

    public indicator: number = 1;

    public timeConsts: Array < any > = [{
        name: '今日',
        value: 1
    }, {
        name: '昨日',
        value: 2
    }, {
        name: '本月',
        value: 3
    }];

    public indicatorTabs: Array<any> = [
        {
            name: '在库',
            value: 1
        },
        {
            name: '采购中',
            value: 2
        },
        {
            name: '库转',
            value: 3
        },
        {
            name: '出入库',
            value: 4
        }
    ];

    // 时间区域发生变化
    public timeItemChange(e) {
        if (e && e.value) {
            this.resetData(false);
            this.getData();
            this.getTableList();
        }
    }
    
    public indicatorChange(v) {
        //this.getTableList();
    }

    private getTableList() {
        this.tableListAjax(AjaxUrl.getStockInstock,"InstockList")
        this.tableListAjax(AjaxUrl.getStockInpuchase,"InpuchaseList")
        this.tableListAjax(AjaxUrl.getStockScroll,"ScrollList")
        this.tableListAjax(AjaxUrl.getStockInout,"InoutList")
    }

    private tableListAjax(url,listName) {
        if (!url) return
        this.ajax.postByJson(url, {
            timeType: this.timeItem.value
        }).then(
            data => {
                this.data[listName] = data && data.stockRandItemVOList
            }
        )
    }

    private getData() {
        this.ajax.postByJson(AjaxUrl.getStockOverall, {
            timeType: this.timeItem.value
        }).then(data => {
            if(this.timeItem.value == 1) {
                //今日平均1订单运费显示昨日，故环比显示为预期e
                data.costElementVO.freightPerOrder.rate = data.costElementVO.freightPerOrder.count?"e":""
            }
            this.data.profitVO = [{
                        title: "财务毛利",
                        data: data.profitVO.grossProfit
                    },
                    {
                        title: "财务毛利率",
                        countRate: true,
                        data: data.profitVO.grossProfitRatio
                    }
                ],
                this.data.costElementVO = [{
                        title: "整体折扣率",
                        countRate: true,
                        data: data.costElementVO.discountPro
                    },
                    {
                        title: "平均1订单运费",
                        data: data.costElementVO.freightPerOrder
                    },
                    {
                        title: "商品成本占比",
                        countRate: true,
                        data: data.costElementVO.goodsCostPro
                    }
                ],
                this.data.atStockVO = [{
                        title: "总在库量",
                        data: data.atStockVO.goodsInStockAmount
                    },
                    {
                        title: "总在库货值",
                        data: data.atStockVO.goodsInStockValue
                    }
                ],
                this.data.initVO = [{
                        title: "总采购中量",
                        data: data.initVO.goodsInPurchaseAmount
                    },
                    {
                        title: "总采购中货值",
                        data: data.initVO.goodsInPurchaseValue
                    }
                ],
                this.data.outinStockVO = [{
                        title: "入库量",
                        data: data.outinStockVO.inAmount
                    },
                    {
                        title: "出库量",
                        data: data.outinStockVO.outAmount
                    }
                ],
                this.data.scrollVO = [{
                        title: "净出库量",
                        data: data.scrollVO.netOutAmount
                    },
                    {
                        title: "可售天数",
                        data: data.scrollVO.remainDays
                    }
                ]
        })
    }

    private resetData(all:any) {
        if(all) {
            return this.data = {}
        }
        this.data.InstockList = null;
        this.data.InpuchaseList = null;
        this.data.ScrollList = null;
        this.data.InoutList = null;
    }
    
}
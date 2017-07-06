import { Directive, ElementRef, Input } from '@angular/core';

/**
 * @author lingqiao
 * @description echarts指令
 */

@Directive({
    selector: '[shark-echarts]',
    exportAs: 'shark-echarts'
})
export class EchartsDirective {
    chartInstance: any;
    @Input('config') config: any;
    @Input('option') option: any;
    constructor(
        private elementRef: ElementRef
    ) { }

    render() {
        //实例化图表对象
        this.chartInstance = Echarts.init(this.elementRef.nativeElement);
        //注册设置的事件
        if (this.config && this.config.events) {
            var events = this.config.events;
            for (var e in events) {
                this.chartInstance.on(e, events[e]);
            }
        }
    }

    ngOnChanges(v) {
        if (!this.chartInstance) {
            this.render();
        }
        if (v.option && v.option.currentValue) {
            //数据变化，刷新图表
            this.chartInstance.clear();
            this.chartInstance.setOption(v.option.currentValue);
        }
    }

    ngOnDestroy() {
        //销毁时调用，处理自定义事件解绑或者移除元素等操作
        this.chartInstance && this.chartInstance.dispose();
    }
}

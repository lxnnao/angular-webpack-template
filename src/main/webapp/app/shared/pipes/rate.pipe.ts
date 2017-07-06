import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'rate' })
export class RatePipe implements PipeTransform {
    thresholdValue = 20;
    transform(value, isCompare) {
        if (typeof value !== 'number') {
            return value;
        }
        else if (value === 0) {
            return '0%';
        }
        else {
            let newVal = new BigNumber(value).mul(100).toFixed(1);
            if (isCompare === true) {
                //同比、环比值
                if (value < 0) {
                    if (Math.abs(newVal) > this.thresholdValue) {
                        return `<font class="compare-down">${newVal}%</font>`;
                    }
                    else {
                        return `${newVal}%`;
                    }
                } else {
                    if (Math.abs(newVal) > this.thresholdValue) {
                        return `<font class="compare-up">+${newVal}%</font>`;
                    }
                    else {
                        return `+${newVal}%`;
                    }
                }
            } else {
                //占比值
                return `${newVal}%`;
            }
        }
    }
};
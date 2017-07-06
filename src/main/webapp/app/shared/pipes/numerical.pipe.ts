import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'numerical' })
export class NumericalPipe implements PipeTransform {
    transform(value) {
        if (typeof value !== 'number' || value === 0) {
            return value;
        }
        else {
            let valueStr = value.toString().split('.');
            let integerLength = valueStr && valueStr[0].length; // 整数部分长度
            let decimalsLength = valueStr && valueStr[1] ? valueStr[1].length : 0 //小数长度
            if (integerLength + decimalsLength > 15 && decimalsLength > 0) {
                //如果位数大于15，截掉超过15位的小数部分
                value = parseFloat(value.toString().substr(0,integerLength>15?integerLength:15))
                valueStr = value.toString().split('.');
            }
            let hasDecimals = valueStr && valueStr.length > 1 ? true : false; // 是否有小数
            if (integerLength > 8) {
                // 小数点左边位数如果大于8位，单位为亿，保留两位小数
                value = new BigNumber(value).div(100000000).toFormat(2);
                value = value + '亿';
            }
            else if (integerLength > 4 && integerLength <= 8) {
                // 小数点左边位数如果大于4位小于等于8位，保留一位小数，单位为万
                value = new BigNumber(value).div(10000).toFormat(1);
                value = value + '万';
            }
            else if (!hasDecimals) {
                //小数点左边位数如果小于等于4位，且无小数部分，取整数（如支付人数、新消用户数）
                value = new BigNumber(value).toFormat(0);
            }
            else {
                //如有小数部分，则保留一位小数
                value = new BigNumber(value).toFormat(1);
            }
            return value;
        }
    }
};
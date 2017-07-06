declare module '*app.module.ngfactory';
declare var ENV: string;
declare var Swiper: any;
declare var BigNumber: any;
declare var Echarts: any;
declare var FastClick: any;
declare var $: any;

interface Date {
    Format(template: string): string;
    addMin(count: number): Date;
    addHour(count: number): Date;
    addDay(count: number): Date;
    addMonth(count: number): Date;
    addYear(count: number): Date;
}
interface DateConstructor {
    year(): Date;
    today(): Date;
    now(): number;
}
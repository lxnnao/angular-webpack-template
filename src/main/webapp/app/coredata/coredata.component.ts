import { Component, ViewChild } from '@angular/core';
import { NgZone } from '@angular/core';
import { Notice } from '../shared/shared.module';
import { AppHost } from '../../tool/apphost';

@Component({
    selector: 'coredata',
    templateUrl: './coredata.component.html'
})
export class CoreDataComponent {
    @ViewChild('element') element;
    @ViewChild('navline') navline;
    isShade = false;
    activeIndex = 0;
    refreshTime = new Date().Format('yyyy-MM-dd HH:mm:ss');
    chartOption: any;
    swiper: any;
    swiperOffset: 0;
    bodyWidth: number;
    tabActived = {
        0: false,
        1: false,
        2: false,
        3: false,
        4: false
    }
    isAppReady = false;
    constructor(
        private notice: Notice,
        private ngZone: NgZone,
    ) {
        this.bodyWidth = document.body.offsetWidth;
        AppHost.ready(() => {
            AppHost.setTitle('核心数据');
            AppHost.setRefreshBtn(() => {
                ngZone.run(() => {
                    this.refreshTime = new Date().Format('yyyy-MM-dd HH:mm:ss');
                    this.notice.announce({
                        type: 'refresh',
                        timestamp: Date.now(),
                        activeIndex: this.activeIndex
                    });
                });
            });
        });
    }

    switchTab(index) {
        this.setActiveIndex(index);
        this.swiper.slideTo(index, 200, false);
    }
    setActiveIndex(index) {
        this.activeIndex = index;
        this.setNavTranslateX(this.activeIndex * 100);
        this.tabActived[index] = true;
    }
    setNavTranslateX(translateXRatio) {
        this.navline.nativeElement.style.transform = `translateX(${translateXRatio}%)`;
    }
    ngAfterViewInit() {
        this.setActiveIndex(this.activeIndex);
        this.swiper = new Swiper(this.element.nativeElement, {
            initialSlide: this.activeIndex,
            onTouchStart: (swp, event) => {
                if (event.changedTouches) {
                    this.swiperOffset = event.changedTouches[0].clientX;
                    this.navline.nativeElement.classList.remove('u-animation');
                }
            },
            onTouchEnd: (swp, event) => {
                this.navline.nativeElement.classList.add('u-animation');
            },
            onSliderMove: (swp, event) => {
                if (event.changedTouches) {
                    let offsetRatio = (event.changedTouches[0].clientX - this.swiperOffset) / this.bodyWidth * 100;
                    let direction = offsetRatio <= 0 ? 'left' : 'right';
                    let translateXRatio = direction === 'left' ? this.activeIndex * 100 + Math.abs(offsetRatio) : this.activeIndex * 100 - Math.abs(offsetRatio);
                    translateXRatio < 0 ? translateXRatio = 0 : translateXRatio;
                    this.setNavTranslateX(translateXRatio);
                }
            },
            onTransitionStart: (swp) => {
                this.setActiveIndex(swp.activeIndex);
            }
        });
    }
};

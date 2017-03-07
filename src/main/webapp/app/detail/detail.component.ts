import { Component, ViewChild } from '@angular/core';
import { SharkToastrService } from '@ntesmail/shark-angular2';

@Component({
    selector: 'detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss']
})
export class DetailComponent {
    constructor(
        private sharkToastrService: SharkToastrService
    ) { }
    //  tree配置
    @ViewChild('tree') treeDirective: any;
    toolTipContent = '<span style="color:#ff0000">no permission</span><br/>please modify permission.ts';
    treeData: any = [{
        node_id: '1',
        node_name: '网易',
        children: [{
            node_id: '1-1',
            node_name: '邮件事业部'
        }, {
            node_id: '1-2',
            node_name: '杭州研究院'
        }, {
            node_id: '1-3',
            node_name: '移动互娱事业部'
        }]
    }];
    preSelectsNodes = ['1-1', '1-3'];
    checkAll() {
        // sync
        // var permission = require('./permission');
        // if (permission.checkAll) {
        //     this.treeDirective.tree.checkAll();
        // }

        // async
        (require as any).ensure([], () => {
            var permission = require('./permission');
            if (permission.checkAll) {
                this.treeDirective.tree.checkAll();
            }
        });
    };
    reverseCheckAll() {
        (require as any).ensure([], () => {
            var permission = require('./permission');
            if (permission.reverseCheckAll) {
                this.treeDirective.tree.reverseCheck();
            }
        });
    };
    checkNo() {
        (require as any).ensure([], () => {
            var permission = require('./permission');
            if (permission.checkNo) {
                this.treeDirective.tree.checkNo();
            }
        });
    };

    //  pager配置
    pagination = {
        page: 5,
        totalPage: 100
    };
    hl = {
        firstpage: 'first',
        prevpage: 'prev',
        nextpage: 'next',
        lastpage: 'last',
        gopage: 'go'
    };

    //  selecter配置
    selecterValue: number = 1001;
    selecterData: any = [
        {
            value: '',
            name: '请选择'
        }, {
            value: 1001,
            name: '一年级'
        }, {
            value: 1002,
            name: '二年级'
        }
    ];
    //  fileupload配置
    file: any;
    onSelected(evt) {
        this.file = evt.data.file.name;
    }
    onUploading(evt) {
        console.log(evt);
    }
    onUploaded(evt) {
        console.log(evt);
        this.sharkToastrService.success('上传成功！');
    }
    onFailed(evt) {
        console.log(evt);
        this.sharkToastrService.error('上传失败！');
    }
    startUpload(uploader) {
        uploader.upload('/xhr/file/upload.do', { userName: 'sweetyx' });
    }
};

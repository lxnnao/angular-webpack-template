// global css
import "./styles/scss/index.scss";
//date
import './tool/date.js';

// bootstrap
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

document.addEventListener('DOMContentLoaded', function () {
    require('fastclick').attach(document.body);
}, false);
enableProdMode();
platformBrowserDynamic().bootstrapModule(AppModule);
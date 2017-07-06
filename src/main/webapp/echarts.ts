/**
 * Export echarts as CommonJS module
 */
module.exports = require('echarts/lib/echarts');

// Import all charts and components
require('echarts/lib/chart/line');

require('echarts/lib/component/graphic');
require('echarts/lib/component/grid');
require('echarts/lib/component/legend');
require('echarts/lib/component/tooltip');
require('echarts/lib/component/axisPointer');
require('echarts/lib/component/title');
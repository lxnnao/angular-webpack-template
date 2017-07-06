const AppConfig = {
    contextPath: '/newvip'
};
const AjaxUrl = {
    // coredata-日销售
    realtimeAnalysis: AppConfig.contextPath + '/xhr/realtimeAnalysis/report.do',
    // coredata-类目总况
    getCategoryKPIOverall: AppConfig.contextPath + '/xhr/categoryKPI/overall.do',
    // coredata-类目-流水指标
    getCategoryKPIFundflowIndicator: AppConfig.contextPath + '/xhr/categoryKPI/fundflowIndicator.do',
    // coredata-类目-转化指标
    getCategoryKPIChangeIndicator: AppConfig.contextPath + '/xhr/categoryKPI/changeIndicator.do',
    // 类目KPI_新品指标
    getCategoryKPINewGoodsIndicator: AppConfig.contextPath + '/xhr/categoryKPI/newGoodsIndicator.do',

    //detail
    // 总KPI_关键指标详情 
    getcriticalDetails: AppConfig.contextPath + '/xhr/overallKPI/criticalDetails.do',
    // 总KPI_用户数据详情
    getuserDetails: AppConfig.contextPath + '/xhr/overallKPI/userDetails.do',
    // 总KPI_新消详情 
    getnewuserDetails: AppConfig.contextPath + '/xhr/overallKPI/newuserDetails.do',
    // 总KPI_流水详情 
    getfundflowDetails: AppConfig.contextPath + '/xhr/overallKPI/fundflowDetails.do',

    //库存
    getStockOverall: AppConfig.contextPath + "/xhr/stock/overall.do",
    getStockInstock: AppConfig.contextPath + "/xhr/stock/instock.do",
    getStockInpuchase: AppConfig.contextPath + "/xhr/stock/inpuchase.do",
    getStockScroll: AppConfig.contextPath + "/xhr/stock/scroll.do",
    getStockInout: AppConfig.contextPath + "/xhr/stock/inout.do",

    //爆品
    getHotgoodsOverall: AppConfig.contextPath + "/xhr/hotgoods/overall.do",
    getHotgoodsList: AppConfig.contextPath + "/xhr/hotgoods/list.do"
};
export { AppConfig, AjaxUrl };
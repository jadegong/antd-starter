/**
 * 默认配置;
 */

interface DefaultSettingsModel {
    title: string,
    pwa: boolean,
    theme: 'light' | 'dark',
    routePermission: boolean, // 是否需要路由权限校验
    packageName: string, // 包名(项目名),主要用于路径
    publicPath: string, // 包访问url前缀，主要用于微应用
    routeMork: boolean,
    apiPrefix: string, // /api
}

const settings: DefaultSettingsModel = {
    title: 'antd-starter',
    pwa: false,
    theme: 'light', // 主要作用于echarts图表主题 dark||light
    routePermission: true, // 是否需要路由权限校验
    packageName: '/ecology/industryPlatConsole', // 包名(项目名),主要用于路径
    publicPath: '/ecology/industryPlatReactConsoleApp', // 包访问url前缀，主要用于微应用
    routeMork: true,
    apiPrefix: '/api', // /api
}
export default settings

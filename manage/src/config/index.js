/**
 * 环境配置封装
 */

const env = import.meta.env.MODE || 'prod'; //获取环境变量
const EnvConfig = {
    dev:{
        baseApi:'/api',
        mockApi:'https://www.fastmock.site/mock/2ceec47ac43e45d52a5a14db8bbc8fca/api'
    },
    test:{
        baseApi: '//test.futurefe.com/api',
        mockApi:'https://www.fastmock.site/mock/2ceec47ac43e45d52a5a14db8bbc8fca/api'
    },
    prod:{
        baseApi:'//futurefe.com/api',
        mockApi:'https://www.fastmock.site/mock/2ceec47ac43e45d52a5a14db8bbc8fca/api'
    }
}
export default{
    env,
    mock:false,
    // 命名空间
    namespace:'manager',
    ...EnvConfig[env]
}
/**
 * 统一把api 集中管理
 */
import request from '../Utils/request'
export default {
    login(params) {
        return request({
            url: '/users/login',
            data: params,
            method: 'post',
            mock: true
        })
    },

    noticeCount(params) {
        return request({
            url: '/leave/count',
            method: 'get',
            data: {},
            //部分接口使用mock
            mock:true
        })
    },
    getMenuList(params) {
        return request({
            url: '/menu/list',
            method: 'get',
           mock: true,
            data: params
        })
    },
    getUserList(params) {
        return request({
            url: '/users/list',
            method: 'get',
           mock: true,
            data: params
        })
    },
    userDel(params){
        return request({
            url:'/users/delete',
            method:'post',
            mock: false,
            data:{params}
        })
    },
    getRoleAllList(){
        return request({
            url:'/roles/allList',
            method:'get',
            data:{},
            mock:true
        })
    },
    getRoleList(){
        return request({
            url:'/role/list',
            method:'get',
            data:{},
            mock:true
        })
    },
    getDeptList(){
        return request({
    url:'/dept/list',
    method:"get",
    data:{},
    mock:true
        })
    },
    userSubmit(params){

        return request({
           url:'users/operate',
           method:"post",
           mock:false,
           data: params
        })
    },
    
    menuSubmit(params){

        return request({
           url:'menu/operate',
           method:"post",
           mock:true,
           data: params
        })
    },

     roleSubmit(params){

        return request({
            url:'roles/operate',
            method:"post",
            mock:true,
            data: params
        })
     },
    roleDel(params){
        return request({
            url:'/roles/operate',
            method:'post',
            mock: true,
            data:params
        })
    },
}

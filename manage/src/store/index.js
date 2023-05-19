/**
 * Vuex状态管理
 */

import { createStore }  from 'vuex'
import mutations from './mutations'
import storage from '../Utils/storage'

const state = {
    userInfo: storage.getItem("UserInfo")||{},//获取用户信息
    userList: storage.getItem('UserList') ||[],
    count: storage.getItem('Count') ||0,
}
export default createStore({
    state,
    mutations
})
/**
 * Mutations 业务层数据提交
 */

import storage from '../Utils/storage'

export default{
    saveUserInfo(state,userInfo){
        state.userInfo = userInfo;
        storage.setItem('UserInfo', userInfo);
    },
    saveMenuList(state,userList){
        state.userList = userList;
        storage.setItem('UserList',userList);
    },
    saveNotice(state,count){
        state.count = count;
        storage.setItem('Count',count);
    }

    
}
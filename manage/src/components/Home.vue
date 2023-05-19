<template>
    <div class="basic-layout">
        <div :class="['nav-side', isCollapse ? 'fold' : 'unfold']">
            <div class="logo">
                <img
                    src="../assets/images/logo.png"
                    alt=""
                />
                <span>Manager</span>
            </div>
            <el-menu
                default-active="2"
                class="nav-menu"
                background-color="#001529"
                text-color="#fff"
                :collapse="isCollapse"
            >
            <tree-menu :userMenu="userMenu"></tree-menu>
                <!-- <TreeMenu></TreeMenu> -->
            </el-menu>
        </div>
        <div :class="['content-right', isCollapse ? 'fold' : 'unfold']">
            <div class="nav-top">
                <div class="nav-left">
                    <el-icon @click="toggle"><fold /></el-icon>
                    <div class="bread">
                        <bread-crumb></bread-crumb>
                    </div>
                </div>
                <div class="user-info">
                    <el-badge
                         :is-dot="true" 
                        class="notice"
                    >
                        <el-icon><bell /></el-icon>
                    </el-badge>
                    <el-dropdown @command="handleCommand">
                        <span class="user-link">
                            {{ userInfo.userName }}
                        </span>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item command="email"> 邮箱: {{ userInfo.userEmail }} </el-dropdown-item>
                                <el-dropdown-item command="loggout">退出</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </div>
            </div>
            <div class="wrapper">
               
                <router-view></router-view>
          
            </div>
        </div>
    </div>
</template>

<script>
import { User, Setting, UserFilled, Menu, Fold, Bell } from '@element-plus/icons-vue'
import TreeMenu from './TreeMenu.vue';
import BreadCrumb from './BreadCrumb.vue'
export  default {
    name: 'Home',
data() {
 
    return {
        isCollapse: false,
        noticeCount: 0,
        userMenu: [],
        userInfo: this.$store.state.userInfo,
    }
},
mounted() {
        this.getNoticeCount(),
        this.getMenuList()
    },
methods: {
    handleCommand(key) {
        if (key == 'email') return;
        this.$store.commit('saveUserInfo', '');
        this.userInfo = null;
        this.$router.push('/login');
    },
    toggle() {
        this.isCollapse = !this.isCollapse
    },
     async getNoticeCount() {
        try {
            const count = await this.$api.noticeCount();
            console.log(count)
            this.$store.commit('saveNotice', count)
        } catch (error) {
            console.log(error)
        }
    },
   async getMenuList() {
        try {
            const { menuList, actionList } =await  this.$api.getMenuList();
            this.$store.commit('saveMenuList', menuList)
            console.log(menuList);
            this.userMenu = menuList;
            console.log(this.userMenu);
        } catch (error) {
            console.log(error)
        }
    },
  
},
components: { 
        TreeMenu ,
        BreadCrumb
    } 
}

//  let userInfo = JSON.parse(window.localStorage.getItem('manager')).UserInfo;
// console.log(userInfo);
// console.log(store.state.userInfo);}
</script>
<style lang="scss">
.basic-layout {
    position: relative;
    .nav-side {
        position: fixed;
        width: 200px;
        height: 100vh;
        background-color: #001529;
        overflow-y: auto;
        //自动出现滚动条
        transition: width 0.5s;
        .logo {
            height: 60px;
            display: flex;
            align-items: center;
            justify-content: space-around;
            flex-direction: column;
            color: #fff;
            img {
                width: 32px;
                height: 32px;
            }
        }

        .nav-menu {
            border: none;
            height: calc(100vh - 70px);
        }
        //合并
        &.fold {
            width: 70px;
        }
        //展开
        &.unfold {
            width: 200px;
        }
    }
    .content-right {
        margin-left: 200px;
        &.fold {
            margin-left: 70px;
        }

        &.unfold {
            margin-left: 200px;
        }

        .nav-top {
            height: 50px;
            line-height: 50px;
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid #ddd;
            padding: 0 20px;
            .nav-left {
                display: flex;
                align-items: center;
            }
            .user-info {
                .notice {
                    line-height: 30px;
                    margin-right: 15px;
                    cursor: pointer;
                }
                .user-link {
                    cursor: pointer;
                }
            }
        }
        .wrapper {
            background: #eef0f3;
            height: calc(100vh - 50px);
            padding: 20px;
            .main-page {
        background: #fff;
        height: 100%;
      }
        }
        .el-dropdown {
            line-height: 50px;
        }
    }
    .el-menu-item-group__title {
        color: #fff;
        font-size: 14px;
        cursor: pointer;
    }
    .el-menu-item-group__title:hover {
        color: rgb(64, 158, 255);
    }
}
</style>

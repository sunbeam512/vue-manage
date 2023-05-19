<template>
    <template v-for="menu in userMenu">
        <el-sub-menu
            v-if="menu.children && menu.children.length > 0 && menu.children[0].menuState == 1"
            :key="menu._id"
            :index="menu.path"
        >
            <template #title>
                <el-icon>
                    <component :is="menu.icon" />
                </el-icon>
                <span>{{ menu.menuName }}</span>
            </template>
            <el-icon>
                    <component :is="menu.icon" />
                </el-icon>
            <tree-menu :userMenu="menu.children" />
        </el-sub-menu>
        <el-menu-item
            v-else-if="menu.menuState == 1"
            :index="menu.path"
            :key="menu.menuName"
            >{{ menu.menuName }}</el-menu-item
        >
    </template>
</template>
<script>
import { User, Setting, UserFilled, Menu, Fold, Bell } from '@element-plus/icons-vue'
export default {
    name: 'tree_menu',
    props: {
        userMenu: {
            type: Array,
            default() {
                return []
            }
        }
    }
}
</script>

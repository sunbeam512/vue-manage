<template>
<div class="user-manager">
    <div class="query-form">
        <el-form ref="form" :inline="true" :model="queryForm" >
            <el-form-item label="菜单名称" prop="menuName">
                <el-input v-model="queryForm.menuName" placeholder="请输入菜单名称"></el-input>
            </el-form-item>
            <el-form-item  label="菜单状态" prop="state">
                <el-select v-model="queryForm.menuState">
                    <el-option :value="0" label="正常" ></el-option>
                    <el-option :value="1" label="停用"></el-option>    
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleQuery">查询</el-button>
                <el-button type="primary" @click="handlereset()">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
    <div class="base-table">
        <div class="action">
            <el-button type="primary"  @click="handleAdd(1)">新增</el-button>
        </div>
      <el-table 
      :data="menuList"
      row-key="_id"
      :tree-props="{ children: 'children'}"
      > 
      <el-table-column width="55"></el-table-column>
    <el-table-column
    v-for="item in columns"
    :key="item.prop"
    :prop="item.prop"
    :label="item.label"
    :width = "item.width"
    :formatter = "item.formatter"
    >
    </el-table-column>
      <!-- <template #header>
        <el-input v-model="search" size="small" placeholder="Type to search" />
      </template> -->
      <el-table-column align="right" width="220">
      <template #default="scope">
        <el-button size="small"
        type="primary"
        @click="handleAdd(2,scope.row)"
          >新增</el-button
        >
        <el-button size="small"
        @click="handleEdit(scope.row)"
          >编辑</el-button
        >
        <el-button
          size="small"
          type="danger"
          @click ="handleDel(scope.row)"
          >删除</el-button
        >
      </template>
    </el-table-column>
      </el-table>
     
    </div>
      
    <el-dialog  v-model="showModal">
     <el-form  
     :model="menuForm" 
     ref="dialogForm"
      :rules="rule" label-width="120px">
        <el-form-item label="父级菜单" prop="parentId" >
          <el-cascader :options="menuList" :props="{checkStrictly: true,value:'_id' ,label:'menuName'}" clearable />
        <span>不选则创建一级菜单</span>
        </el-form-item>
        <el-form-item label="菜单类型" prop="menuType">
           <el-radio-group v-model="menuForm.menuType">
            <!-- 这里的label不是指显示的名称 而是提交后显示的值 -->
            <el-radio  label="1">菜单</el-radio>
            <el-radio  label="2">按钮</el-radio>
           </el-radio-group>
        </el-form-item>
        <el-form-item label="菜单名称" prop="menuName">
            <el-input  v-model="menuForm.menuName"  placeholder="请输入菜单名称"/>
        </el-form-item>
        <el-form-item label="菜单图标" prop="icon" v-show="menuForm.menuType==1">
            <el-input  v-model="menuForm.icon"  placeholder="请输入菜单图标"/>
        </el-form-item>
        <el-form-item label="路由地址" prop="path">
          <el-input  v-model="menuForm.path"  placeholder="请输入路由地址"/>
        </el-form-item>
        <el-form-item label="权限标识" prop="menuCode" v-show="menuForm.menuType==2">
          <el-input  v-model="menuForm.menuCode"  placeholder="请输入权限标识"/>
        </el-form-item>
        <el-form-item label="组件路径" prop="component">
          <el-input  v-model="menuForm.component"  placeholder="请输入组件路径"/>
        </el-form-item>
        <el-form-item label="菜单状态" prop="menuType"  v-show="menuForm.menuType==1">
        <el-radio-group  v-model="menuForm.menuState" >
          <el-radio  label="1">正常</el-radio>
          <el-radio  label="2">停用</el-radio>
        </el-radio-group>
      </el-form-item>
        </el-form>
        <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button  @click="handleSubmit" type="primary" >
          确定
        </el-button>
      </span>
    </template>  
    </el-dialog> 
    
</div>
</template>
<script>
import utils from '../Utils/utils'
import {getCurrentInstance,onMounted,reactive,ref,toRaw} from "vue";
export default{
    name:"menu",
    data(){
       
        return{
          queryForm:{
            queryState:1
          },
          action: '',
       menuList:[],
       menuForm:{

       },
       showModal: false,
       columns:[
        {
           label:'角色名称',
           prop:"roleName",
           width:150
        },
        {
           label:'备注',
           prop:"remark"
           
        },
        {
           label:'权限列表',
           prop:"menuType",
           formatter(role,column,value){
            console.log('role:',role);
            console.log('value:',value);
            console.log('column',column);
            return {
              "1": "菜单",
              "2": "按钮",
            }[value];
        }
         
        },
        {
           label:'权限标识',
           prop:"menuCode",
        },
        {
           label:'路由地址',
           prop:"path",
          
        },
        {
           label:'菜单名称',
           prop:"menuName",
           width:180
        },
        {
           label:'组件路径',
           prop:"component",
         
        },
        {
           label:'菜单状态',
           prop:"menuState",
           formatter(role,column,value){
            return {
              "1": "正常",
              "2": "停用",
            }[value];
        }
      },
        {
           label:'创建时间',
           prop:"createTime",
         
        }

       ],
       rule:{
        menuName:[
          {
            required: true,
            message: '请输入菜单名称',
            trigger:'blur'
          },
          {
            min: 2,
            max: 8,
            message: "长度在2-8个字符",
            trigger: "blur",
          }
        ]
       }
       

        }
    },
    mounted(){
      this.getMenuList();
    },
    methods:{
      //菜单列表初始化
      async getMenuList(){
        let list = await this.$api.getMenuList(this.queryForm);
        console.log('list',list);
        this.menuList = list.menuList;
      },
    
    //表单重置
    handleReset(form){
     this.$refs[form].resetFields();
    },
    //新增菜单
    handleAdd(type,row){
    this.showModal = true;
    this.action = 'add';
    console.log('type',type);
    if(type == 2){
     this.mebuForm.parentId = [...row.parentId,row._id].filter((item)=>item!=null);
console.log('scoped.row',row);
    }

    },
    handleEdit(row){
      this.showModal = true;
      this.action = 'edit';
      console.log(row);
      this.$nextTick(()=>{
      Object.assign(this.menuForm,row);
      })

    },
    async handleDel(_id){
     await this.$api.menuSubmit({_id,action:'delete'});
     this.$message.success('删除成功');
     this.getMenuList();
    },
    handleClose(){
     this.showModal = false;
     this.handleReset('dialogForm');
    },

    handleSubmit(){
     this.$refs.dialogForm.validate(async(valid)=>{
      console.log('valid',valid);
      if(valid){
       let { action,menuForm } = this;
       let params = { ...menuForm,action };
        let res = await this.$api.menuSubmit(params);
       this.handleReset('dialogForm');
       this.showModal = false;
       this.$message.success('操作成功!');
       this.getMenuList();
      }
    })
  }
}
  }
    
        
        
    

</script>
<style lang="scss"> 
.base-table{
    height:100%;
}
</style>
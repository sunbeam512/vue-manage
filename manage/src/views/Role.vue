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
      :data="roleList"
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
        @click="handleEdit(scope.row)"
          >编辑</el-button
        >
        <el-button size="small"  
        @click="handlePermission(scope.row)"     
          >设置权限</el-button
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
     :model="roleForm" 
     ref="dialogForm"
      :rules="rule" 
      label-width="120px">
        <el-form-item label="角色名称" prop="roleName" >
          <el-input v-model="roleForm.roleName" placeholder="请输入角色名称"/>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input 
          type="textarea" 
          :rows="2"
          v-model="roleForm.remark"
          placeholder="请输入备注"
          />
        </el-form-item>
        </el-form>
        <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button  @click="roleSubmit" type="primary" >
          确定
        </el-button>
      </span>
    </template>  
    </el-dialog> 
    <!-- 权限弹框 -->
    <el-dialog  title="权限设置" v-model="showPermisson">
      <el-form
      label-width="100px"
      >
    <el-form-item label="角色名称">
      {{ curRoleName }}
    </el-form-item>
    <el-form-item label="选择权限">
      <el-tree
    ref="permissionTree"
    :data="menuList"
    show-checkbox
    default-expand-all
    node-key="menuList._id"
    :props="defaultProps"
  />
    </el-form-item>
      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button  @click="roleSubmit" type="primary" >
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
    name:"role",
    data(){
       
        return{
          queryForm:{
            menuState:1
          },
          action: '',
       roleList:[],
       roleForm:{

       },
       showModal: false,
       showPermisson: false,
       curRoleName:'',
       columns:[
        {
           label:'角色名称',
           prop:"roleName",
           width:180
        },
        {
           label:'备注',
           prop:"remark"
           
        },
        {
           label:'权限列表',
           prop:"menuType",
         
        },
        {
           label:'创建时间',
           prop:"createTime",
         
        }

       ],
       rule:{
        roleName:[
          {
            required: true,
            message: '请输入角色名称',
            trigger:'blur'
          },
          {
            min: 2,
            max: 8,
            message: "长度在2-8个字符",
            trigger: "blur",
          },
        ]
       },
      defaultProps:{
        children: 'children',
        label: 'menuName'
      },
      menuList: {}


        }
    },
    mounted(){
      this.getRoleList();
      this.getPremission();
    },
    methods:{
      //角色列表初始化
      async getRoleList(){
        let list = await this.$api.getRoleList(this.queryForm);
        console.log('list',list);
        this.roleList = list.list;
      },

      async getPremission(){
        let{menuList} = await this.$api.getMenuList();
    //    this.menuList = menulist;
       this.menuList = menuList;
        console.log('this.data', this.menuList);
      }
    ,
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
     this.$nextTick((row)=>
     this.roleForm = row.list)
      },
    handleDel(row)
{
  this.$api.roleDel(row);
  this.$message.success("删除成功");
    },
    roleSubmit(){
      this.showModal = false;
      this.$refs['dialogForm'].resetFields();
      this.$api.roleSubmit(this.roleForm);
      this.$message.success("提交成功！")
    },
    handleClose(){
      this.showModal = false;
      this.$refs['dialogForm'].resetFields();
    },
    handlePermission(row){
      this.showPermisson = true;
      this.curRoleName = row.roleName;
      let{checkedKeys} = row.permissionList;
      setTimeout(()=>{
        this.$refs.permissionTree.setCheckedKeys(checkedKeys);
      })
    

      console.log('row.permissionList',row.permissionList)
    }
  },
  handlePermissionClose(){
    this.showPermisson = false;
   
  }
  }
    
    

</script>
<style lang="scss"> 
.base-table{
    height:100%;
}
</style>
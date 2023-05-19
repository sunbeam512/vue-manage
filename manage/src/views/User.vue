<template>
<div class="user-manager">
    <div class="query-form">
        <el-form ref="form" :inline="true" :model="user" >
            <el-form-item label="学生ID" prop="userId">
                <el-input v-model="user.userId" placeholder="请输入你的ID"></el-input>
            </el-form-item>
            <el-form-item  label="姓名" prop="userName">
                <el-input v-model="user.userName" placeholder="请输入姓名"></el-input>
            </el-form-item>
            <el-form-item  label="学生状态" prop="state">
                <el-select v-model="user.state">
                    <el-option :value="0" label="所有" ></el-option>
                    <el-option :value="1" label="在校"></el-option>
                    <el-option :value="2" label="请假离校"></el-option>
                    <el-option :value="3" label="实习ing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleQuery">查询</el-button>
                <el-button type="primary" @click="handlereset('form')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
    <div class="base-table">
        <div class="action">
            <el-button type="primary"  @click="handleCreate">新增</el-button>
<el-button type="danger"  @click="handlePatchDel">批量删除</el-button>
        </div>

      <el-table :data="userList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
    <el-table-column
    v-for="item in columns"
    :key="item.prop"
    :prop="item.prop"
    :label="item.label"
    :width = "item.width"
    :formatter = "item.formatter"
    ></el-table-column>
      <!-- <template #header>
        <el-input v-model="search" size="small" placeholder="Type to search" />
      </template> -->
      <el-table-column align="right">
      <template #default="scope">
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
     
  <el-pagination
  class="pagination"
   background 
   layout="prev, pager, next" 
   :total="1000"
   @current-change="handleCurrentChange"
   />

    </div>
    <el-dialog  v-model="showModal"  >
     <el-form  
     :model="userForm" 
     ref="dialogForm"
      :rules="rule" label-width="120px">
        <el-form-item label="用户名" prop="userName" >
   <el-input  v-model="userForm.userName" :disabled =" action =='edit'"  placeholder="请输入用户名"/>
        </el-form-item>
        <el-form-item label="邮箱" prop="userEmail">
            <el-input  v-model="userForm.userEmail"  placeholder="请输入邮箱">
                <template #append>
                       @163.com
                </template>
            </el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
            <el-input  v-model="userForm.mobile"  placeholder="请输入手机号"/>
        </el-form-item>
        <el-form-item label="岗位" prop="job">
            <el-input  v-model="userForm.job"  placeholder="请输入岗位"/>
        </el-form-item>
        <el-form-item label="状态" prop="state">
         <el-select v-model="userForm.state">
   <el-option :value="1" label="在职"></el-option>
   <el-option :value="2" label="离职"></el-option>
   <el-option :value="3" label="试用期"></el-option>
         </el-select>
        </el-form-item>
        <el-form-item label="系统角色" prop="roleList">
            <el-select
             v-model="userForm.roleList" 
             style="width: 100%"
             multiple
             placeholder="请选择用户系统角色">
            <el-option 
            v-for="roles in roleList" 
            :key="roles._id"
             :label="roles.roleName"
             :value="roles._id"
       
            ></el-option>
        </el-select>
    </el-form-item>
    <el-form-item label="部门" prop="deptId">
             <el-cascader 
             v-model="userForm.deptId"
             placeholder="请选择所属部门"
             :options="deptList"
             :props="{ checkStrictly: true, value:'_id', label:'deptName'}"
             
             clearable  
             >
             </el-cascader>
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
    name:"user",
    setup(){
 
        //获得
        const { proxy} = getCurrentInstance();
        //初始化表单对象
        const user = reactive({
            state: 0,
          
        });
        //初始化用户列表数据
        const userList = ref([
        ]);
        const pager = reactive({
            pageNum: 1,
            pageSize: 10
        })
        //选中用户列表对象
        const checkedUserIds = ref([]);
        //弹框显示对象
        const showModal = ref(false)
        //所有角色列表
        const roleList = ref([]);
        //所有部门列表
        const deptList = ref([]);
        //用户新增
        const handleCreate=()=>{
            action.value = 'add';
            showModal.value = true;

        }
        //定义表单校验规则
        const rule = reactive(
            {
                userName:[
                    {
                        required:true,
                        message:"请输入用户名称",
                        trigger:"blur"
                    }
                ],
                userEmail:[
                    {
                        required:true,
                        message:"请输入用户邮箱",
                        trigger:"blur"
                    }
                ],
                mobile:[
                    {
                       
                        message:"请输入手机号",
                        trigger:"blur"
                    },
                    {
                        pattern:/1\d{10}/,
                        message:"请输入正确的手机号格式",
                        trigger:"blur"
                    }
                ],
                deptId:[
                    {
                        required:true,
                        message:"请输入部门",
                        trigger:"blur"
                    }
                ]

            }
        )
        //定义动态表格-格式
        const columns = reactive([
                 {
                    label:"学生ID",
                    prop:"userId"
                 },
                 {
                    label:"姓名",
                    prop:'userName'
                 },
                 {
                    label:'邮箱',
                    prop:"userEmail"
                 },
                 {
                    label:"用户角色",
                    prop:"role",
                    formatter(role,column,value){
                        // console.log('role==',role);
                        // console.log('column==',column);
                        // console.log('value==',value);
                    const   rule = {
                            0:"管理员",
                            1:"学生"
                        }
                        return rule[value]
                    }
                 },
                 {
                    label:"学生状态",
                    prop:"state",
                    formatter(role,column,value){
                        // console.log('role==',role);
                        // console.log('column==',column);
                        // console.log('value==',value);
                    const   rule = {
                            1:"在校",
                            2:"离校",
                            3:"休假",
                            4:"实习"
                        }
                        return rule[value]
                    }

                 },
                //  {
                //     label:"用户状态",
                //     prop:"state"
                //  },
                 {
                    label:"注册时间",
                    prop:"createTime",
                    width: 180,
                    formatter:(row,column,value)=>{
                        return utils.formateDate(new Date(value));
                    }

                    
                 },
                 {
                    label:"最后登录时间",
                    prop:"lastLoginTime",
                    width: 180,
                    // formatter:(row,column,value)=>{
                    //     return utils.formateDate(new Date(value));
                    // }
                 }
                ])
          //定义用户操作行为
          const action = ref('add');
        
     // 初始化接口调用
    onMounted(() => {
      getUserList();
      getDeptList();
      getRoleList();
    
    });
    //查询事件 获取用户列表
    const handleQuery = ()=>{
  getUserList();
    }
    //新增用户Form对象
    const userForm = reactive({

    })
     
    //重置查询表单
    const handlereset = (form)=>{
        proxy.$refs[form].resetFields();
       
    }
  
  // 获取用户列表
  const getUserList = async () => {
      let params = { ...user, ...pager };
      try {
        const { list, page } = await proxy.$api.getUserList(params);
        userList.value = list;
        pager.total = page.total;
      } catch (error) {}
    };

    //分页事件处理
    const handleCurrentChange = (current)=>{
   
        console.log('当前页',current);
        pager.pageNum = current;
        console.log('pager',pager);
        getUserList();
     
    }
    //用户单个删除
    const handleDel = async (row)=>{
     await proxy.$api.userDel({
        userIds:[row.userId],//
    })
    proxy.$message.success('删除成功');
    getUserList();
    }
    //用户批量删除
    const handlePatchDel = async ()=>{
        if(checkedUserIds.value.length == 0){
            proxy.$message.error("请选择要删除的用户");
            return;
        }
      const res =  await proxy.$api.userDel({
            userIds:checkedUserIds.value
        })
        if(res.nModified>0){
        proxy.$message.success('删除成功');
    getUserList();}
    else{
        proxy.$message.error('删除失败');
    }
         
    }

    //表格多选
    const handleSelectionChange = (list)=>{
    console.log('>',list);
    let arr = [];
    list.map((item)=>{
        arr.push(item.userId);
    })
    checkedUserIds.value = arr;
    }

    //获取部门列表
    const  getDeptList = async()=>{
   let list =  await proxy.$api.getDeptList();
   deptList.value = list;
   console.log('deptList.value =',deptList.value);
   console.log('depList',deptList)
   console.log('deptName',deptName);
    }

    //获取角色列表
    const getRoleList = async ()=>{
      let list =   await proxy.$api.getRoleList();
      roleList.value = list;
    }
    
  //用户新增弹窗关闭
  const handleClose = ()=>{
    showModal.value = false;
    handlereset('dialogForm');
  }
  //用户新增弹窗提交
  const handleSubmit = ()=>{
    proxy.$refs.dialogForm.validate( async (valid)=>{
        if(valid) {
            //把响应式对象转换成普通对象
            let params = toRaw(userForm);
            params.userEmail += '@163.com';
            params.action = action.value;
            console.log('userForm',userForm);
         let res = await  proxy.$api.userSubmit(params);
         console.log('res',res);
         if(userForm) {
           
            handleClose();
            proxy.$message.success('用户创建成功');
            // handlereset('dialogForm'); 
            getUserList(); 
            return;
         }
        }
    })
   
  }

  //用户编辑 
  const handleEdit = (row)=>{
    action.value = 'edit'
     showModal.value = true;
     proxy.$nextTick(()=>{
        Object.assign(userForm,row);
     })
   
  }
   console.log(getUserList());
   
                return {
                    user,
                    userList,
                    columns,
                    getUserList,
                    pager,
                    action,
                    checkedUserIds,
                    handlereset,
                    handleCurrentChange,
                    handleQuery,
                    handleDel,
                    handlePatchDel,
                    handleSelectionChange,
                    handleCreate,
                    showModal,
                    userForm,
                    rule,
                    getRoleList,
                    roleList,
                    getDeptList ,
                    deptList,
                    handleSubmit,
                    handleClose ,
                    handleEdit 
                }}
            }
        
    

</script>
<style lang="scss"> 
.base-table{
    height:100%;
}
</style>